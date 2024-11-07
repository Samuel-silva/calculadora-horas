import {
  Container
} from "styles/sharedstyles"
import {
  Button,
  ButtonDanger,
  ButtonSuccess
} from "styles/buttons"
import { useEffect, useState } from "react";
import { useIntervals } from "hooks/useIntervals"
import { useValidation } from "hooks/useValidation"
import { useConversion } from "hooks/useConversion"

export default function Calculator() {
  const [total, setTotal] = useState<string>('--:--')
  const [isRemoving, setIsRemoving] = useState<boolean>(false)

  const { validation, setValidation } = useValidation()
  const { toMinutes, toHours } = useConversion()
  const { start, finish, interval, addInterval, removeInterval, setStart, setFinish, setInterval } = useIntervals(validation, setValidation, setIsRemoving)

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

  const handleCalculate = ():void => {
    const startInterval = new Date()
    const finishInterval = new Date()

    const newInterval = start.map((value, index) => {
      validation[index].emptyStart = !value
      validation[index].emptyFinish = !finish[index]

      if (!value || !finish[index]) {
        return '00:00'
      } else {
        startInterval.setHours(+value.substring(0, 2))
        startInterval.setMinutes(+value.substring(3))
        startInterval.setSeconds(0);
        finishInterval.setHours(+finish[index].substring(0, 2))
        finishInterval.setMinutes(+finish[index].substring(3))
        finishInterval.setSeconds(0)

        if (finishInterval.getTime() >= startInterval.getTime()) {
          let diff = (finishInterval.getTime() - startInterval.getTime()) / 1000 / 60;
          if (diff < 0) {
            diff += 24 * 60
          }

          const hours = Math.floor(diff / 60)
          const minutes = diff % 60
          validation[index].initBiggerFinish = false

          return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
        } else {
          validation[index].initBiggerFinish = true
          return '00:00'
        }
      }
    })

    setInterval(newInterval)

    const totalMinutes = newInterval.reduce((soma, tempo) => soma + toMinutes(tempo), 0)
    setTotal(toHours(totalMinutes))
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
              <div key={`container-${index}`} className="flex flex-col">
                <div key={`label-${index}`} className="flex h-10 items-center">
                  <p key={`text-${index}`} className="w-24 text-lg">Intervalo {index + 1}:</p>

                  <div className="mx-1">
                    <input
                      className={`border border-solid rounded px-1 w-24 ${validation[index].emptyStart ? "border-red-500" : "border-gray-500"}`}
                      key={`entry-${index}`}
                      onChange={handleStartChange(index)}
                      type="time"
                      value={value}
                    />
                  </div>

                  <div className="mx-1">
                    <input
                      className={`border border-solid rounded px-1 w-24 ${validation[index].emptyFinish ? "border-red-500" : "border-gray-500"}`}
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
                <div key={`validation-${index}`} className="h-4">
                  <p
                    className={`pl-24 ml-1 text-xs text-red-600 ${validation[index].initBiggerFinish ? "block" : "hidden"}`}
                    key={`validation-bigger-${index}`}
                  >Hora inicial maior que hora final</p>
                  <p
                    key={`validation-empty-${index}`}
                    className={`pl-24 ml-1 text-xs text-red-600 ${validation[index].emptyStart || validation[index].emptyFinish ? "block" : "hidden"}`}
                  >Preencha o(s) campo(s)</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-2xl pb-4">Total de horas: {total}</p>
        <Button onClick={handleCalculate}>Calcular</Button>
        <ButtonSuccess disabled={disabledAdd()} className="ml-2" onClick={addInterval}>Adicionar intervalo</ButtonSuccess>
        <ButtonDanger disabled={disabledRemove()} className="ml-2" onClick={removeInterval}>Remover intervalo</ButtonDanger>
      </Container>
    </>
  );
}
