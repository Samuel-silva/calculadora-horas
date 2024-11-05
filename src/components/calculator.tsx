import {
  Container
} from "styles/sharedstyles"
import {
  Button,
  ButtonDanger,
  ButtonSuccess
} from "styles/buttons"
import { useState } from "react";

export default function Calculator() {
  const [entryHoursValues, setEntryHoursValues] = useState<string[]>(['', ''])
  const [leaveHoursValues, setLeaveHoursValues] = useState<string[]>(['', ''])
  const [countHoursValues, setCountHoursValues] = useState<string[]>(['', ''])
  const [totalHoursValues, setTotalHoursValues] = useState<string>('')

  const handleEntryChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValues = [...entryHoursValues]
    newValues[index] = event.target.value
    setEntryHoursValues(newValues)
  }

  const handleLeaveChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValues = [...leaveHoursValues]
    newValues[index] = event.target.value
    setLeaveHoursValues(newValues)
  }

  const addInput = () => {
    if (entryHoursValues.length < 5) {
      setEntryHoursValues([...entryHoursValues, ''])
      setLeaveHoursValues([...leaveHoursValues, ''])
      setCountHoursValues([...countHoursValues, ''])
    }
  }

  const removeInput = () => {
    if (entryHoursValues.length > 1) {
      const newEntry = [...entryHoursValues]
      const newLeave = [...leaveHoursValues]
      const newCount = [...countHoursValues]
      newEntry.pop()
      newLeave.pop()
      newCount.pop()
      setEntryHoursValues(newEntry)
      setLeaveHoursValues(newLeave)
      setCountHoursValues(newCount)
    }
  };

  const handleSubmit = () => {
    const entryDate = new Date()
    const leaveDate = new Date()

    entryHoursValues.forEach((value, index) => {
      entryDate.setHours(+value.substring(0, 2))
      entryDate.setMinutes(+value.substring(3))
      entryDate.setSeconds(0)
      leaveDate.setHours(+leaveHoursValues[index].substring(0, 2))
      leaveDate.setMinutes(+leaveHoursValues[index].substring(3))
      leaveDate.setSeconds(0)

      let diff = (leaveDate.getTime() - entryDate.getTime()) / 1000 / 60;

      if (diff < 0) {
        diff += 24 * 60;
      }

      const hours = Math.floor(diff / 60);
      const minutes = diff % 60;
      setCountHoursValues(prev => {
        const newCountHoursValues = [...prev]
        newCountHoursValues[index] = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
        return newCountHoursValues;
      })
    })

    const totalMinutos = countHoursValues.reduce((soma, tempo) => soma + converterParaMinutos(tempo), 0)
    setTotalHoursValues(converterParaHorasEMinutos(totalMinutos))
  }

  const converterParaMinutos = (tempo: string) => {
    console.log(tempo)
    const [horas, minutos] = tempo.split(':').map(Number);
    return (horas * 60) + minutos;
  }

  const converterParaHorasEMinutos = (minutos: number) => {
    console.log(minutos)
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;
    return `${String(horas).padStart(2, '0')}:${String(minutosRestantes).padStart(2, '0')}`;
  }

  const disabledAdd = () => entryHoursValues.length > 4
  const disabledRemove = () => entryHoursValues.length < 2

  return (
    <>
      <Container>
        <p className="text-2xl py-4">Intervalos</p>
        <div className="flex pb-4">
          <div className="flex flex-col">
            {entryHoursValues.map((value, index) => (
              <div key={`label-${index}`} className="flex h-10 items-center">
                <p key={`text-${index}`} className="w-24 text-lg">Intervalo {index + 1}:</p>

                <div className="mx-1">
                  <input
                    className="border border-solid border-gray-500 rounded px-1 w-24"
                    key={`entry-${index}`}
                    onChange={handleEntryChange(index)}
                    type="time"
                    value={value}
                  />
                </div>

                <div className="mx-1">
                  <input
                    className="border border-solid border-gray-500 rounded px-1 w-24"
                    key={`leave-${index}`}
                    onChange={handleLeaveChange(index)}
                    type="time"
                    value={leaveHoursValues[index]}
                  />
                </div>
                <div className="mx-1">
                  <input
                    className={`px-0.5 w-24 bg-white ${countHoursValues[index] ? "visible" : "invisible"}`}
                    disabled
                    key={`count-${index}`}
                    readOnly
                    type="time"
                    value={countHoursValues[index]}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-2xl pb-4">Total de horas: {totalHoursValues}</p>
        <Button onClick={handleSubmit}>Calcular</Button>
        <ButtonSuccess disabled={disabledAdd()} className="ml-2" onClick={addInput}>Adicionar intervalo</ButtonSuccess>
        <ButtonDanger disabled={disabledRemove()} className="ml-2" onClick={removeInput}>Remover intervalo</ButtonDanger>
      </Container>
    </>
  );
}
