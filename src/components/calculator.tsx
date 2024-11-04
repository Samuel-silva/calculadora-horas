import {
  Container
} from "components/sharedstyles"
import { useState } from "react";

export default function Calculator() {
  const [entryHoursValues, setEntryHoursValues] = useState<string[]>([''])
  const [leaveHoursValues, setLeaveHoursValues] = useState<string[]>([''])
  const [countHoursValues, setCountHoursValues] = useState<string[]>([''])
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
    setEntryHoursValues([...entryHoursValues, ''])
    setLeaveHoursValues([...leaveHoursValues, ''])
    setCountHoursValues([...countHoursValues, ''])
  }

  const removeInput = () => {
    const newEntry = [...entryHoursValues]
    const newLeave = [...leaveHoursValues]
    const newCount = [...countHoursValues]
    newEntry.pop()
    newLeave.pop()
    newCount.pop()
    setEntryHoursValues(newEntry)
    setLeaveHoursValues(newLeave)
    setCountHoursValues(newCount)
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

  return (
    <>
      <Container>
        <p>Intervalos</p>
        <div className="flex">
          <div className="flex flex-col">
            {entryHoursValues.map((value, index) => (
              <div key={`label-${index}`} className="flex">
                <p key={`text-${index}`}>Intervalo:</p>
                <input
                  key={`entry-${index}`}
                  type="time"
                  value={value}
                  onChange={handleEntryChange(index)}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            {leaveHoursValues.map((value, index) => (
              <input
                key={`leave-${index}`}
                type="time"
                value={value}
                onChange={handleLeaveChange(index)}
              />
            ))}
          </div>
          <div className="flex flex-col">
            {countHoursValues.map((value, index) => (
              <input
                key={`count-${index}`}
                type="time"
                value={value}
                readOnly
              />
            ))}
          </div>
        </div>
        <p>{totalHoursValues}</p>
        <button onClick={addInput}>Adicionar</button>
        <button onClick={removeInput}>Remover</button>
        <button onClick={handleSubmit}>Calcular</button>
      </Container>
    </>
  );
}
