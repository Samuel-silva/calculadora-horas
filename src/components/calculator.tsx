import {
  Container
} from "styles/sharedstyles"
import {
  Button,
  ButtonDanger,
  ButtonSuccess
} from "styles/buttons"
import { useEffect, useState } from "react";

export default function Calculator() {
  const [start, setStart] = useState<string[]>(['', ''])
  const [finish, setFinish] = useState<string[]>(['', ''])
  const [interval, setInterval] = useState<string[]>(['', ''])
  const [total, setTotal] = useState<string>('--:--')
  const [isRemoving, setIsRemoving] = useState<boolean>(false)

  const handleStartChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>):void => {
    const newValues = [...start]
    newValues[index] = event.target.value
    setStart(newValues)
  }

  const handleFinishChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>):void => {
    const newValues = [...finish]
    newValues[index] = event.target.value
    setFinish(newValues)
  }

  const addInput = ():void => {
    if (start.length < 5) {
      setStart([...start, ''])
      setFinish([...finish, ''])
      setInterval([...interval, ''])
    }
  }

  const removeInput = ():void => {
    if (start.length > 1) {
      const newStart = [...start]
      const newFinish = [...finish]
      const newCount = [...interval]
      newStart.pop()
      newFinish.pop()
      newCount.pop()
      setStart(newStart)
      setFinish(newFinish)
      setInterval(newCount)
      setIsRemoving(true)
    }
  }

  const handleCalculate = ():void => {
    const startInterval = new Date()
    const finishInterval = new Date()

    const newInterval = start.map((value, index) => {
      const format = value || '00:00';
      startInterval.setHours(+format.substring(0, 2))
      startInterval.setMinutes(+format.substring(3))
      startInterval.setSeconds(0);
      finishInterval.setHours(+finish[index].substring(0, 2))
      finishInterval.setMinutes(+finish[index].substring(3))
      finishInterval.setSeconds(0);

      let diff = (finishInterval.getTime() - startInterval.getTime()) / 1000 / 60;
      if (diff < 0) {
        diff += 24 * 60
      }

      const hours = Math.floor(diff / 60)
      const minutes = diff % 60

      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    })

    setInterval(newInterval)

    const totalMinutes = newInterval.reduce((soma, tempo) => soma + toMinutes(tempo), 0)
    setTotal(toHours(totalMinutes))
  }

  const toMinutes = (timeString: string): number => {
    const [hours, minutes] = timeString.split(':').map(Number)
    return (hours * 60) + minutes;
  }

  const toHours = (minutes: number): string => {
    const hours = Math.floor(minutes / 60)
    const rest = minutes % 60
    return `${String(hours).padStart(2, '0')}:${String(rest).padStart(2, '0')}`
  }

  const disabledAdd = ():boolean => start.length > 4
  const disabledRemove = ():boolean => start.length < 2

  useEffect(() => {
    if (isRemoving) {
      handleCalculate()
      setIsRemoving(false)
    }
  }, [isRemoving])

  return (
    <>
      <Container>
        <p className="text-2xl py-4">Intervalos</p>
        <div className="flex pb-4">
          <div className="flex flex-col">
            {start.map((value, index) => (
              <div key={`label-${index}`} className="flex h-10 items-center">
                <p key={`text-${index}`} className="w-24 text-lg">Intervalo {index + 1}:</p>

                <div className="mx-1">
                  <input
                    className="border border-solid border-gray-500 rounded px-1 w-24"
                    key={`entry-${index}`}
                    onChange={handleStartChange(index)}
                    type="time"
                    value={value}
                  />
                </div>

                <div className="mx-1">
                  <input
                    className="border border-solid border-gray-500 rounded px-1 w-24"
                    key={`finish-${index}`}
                    onChange={handleFinishChange(index)}
                    type="time"
                    value={finish[index]}
                  />
                </div>
                <div className="mx-1">
                  <input
                    className={`px-0.5 w-24 bg-white ${interval[index] ? "visible" : "invisible"}`}
                    disabled
                    key={`count-${index}`}
                    readOnly
                    type="time"
                    value={interval[index]}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-2xl pb-4">Total de horas: {total}</p>
        <Button onClick={handleCalculate}>Calcular</Button>
        <ButtonSuccess disabled={disabledAdd()} className="ml-2" onClick={addInput}>Adicionar intervalo</ButtonSuccess>
        <ButtonDanger disabled={disabledRemove()} className="ml-2" onClick={removeInput}>Remover intervalo</ButtonDanger>
      </Container>
    </>
  );
}
