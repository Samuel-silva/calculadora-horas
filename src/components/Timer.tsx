import { Container } from 'styles/sharedstyles'
import { Button, ButtonDefault } from 'styles/buttons'
import { useCallback, useState } from 'react'
import { useIntervals } from 'hooks/useIntervals'
import { useValidation } from 'hooks/useValidation'
import { useConversion } from 'hooks/useConversion'
import { Input } from 'styles/inputs'
import { DeleteOutline } from '@mui/icons-material'
import moment from 'moment'

export default function Timer() {
  const [total, setTotal] = useState<string>('--:--')
  // const [count, setCount] = useState<string>('--:--')
  const [workingHours, setWorkingHours] = useState<string>('08:00')
  const [isRemoving, setIsRemoving] = useState<boolean>(false)

  const { validation, setValidation } = useValidation()
  const { toMinutes, toHours } = useConversion()
  const {
    start,
    finish,
    addInterval,
    setStart,
    setFinish,
    removeInterval,
    setInterval
  } = useIntervals(1, validation, setValidation, setIsRemoving)

  const disabledAdd = (): boolean => start.length > 4
  const disabledRemove = (): boolean => start.length < 2

  const handleChange =
    (index: number, position: 'start' | 'finish') =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      if (position === 'start') {
        setStart((prev) =>
          prev.map((val, i) => (i === index ? event.target.value : val))
        )
      } else {
        setFinish((prev) =>
          prev.map((val, i) => (i === index ? event.target.value : val))
        )
      }
    }

  // const updateFinish = (index: number, value: string) => {
  //   const newValues = [...finish]
  //   newValues[index] = value
  //   setFinish(newValues)
  // }

  const handleTimer = useCallback((): void => {
    const newInterval = start.map((value, index) => {
      if (!value || !finish[index]) {
        return '00:00'
      } else {
        const startInterval = moment(value, 'HH:mm')
        const finishInterval = moment(finish[index], 'HH:mm')

        if (finishInterval.isBefore(startInterval)) {
          finishInterval.add(1, 'day')
        }
        const diff = finishInterval.diff(startInterval, 'minutes')
        const hours = Math.floor(diff / 60)
        const minutes = diff % 60

        return `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}`
      }
    })

    setInterval(newInterval)

    const totalMinutes = newInterval.reduce(
      (soma, tempo) => soma + toMinutes(tempo),
      0
    )
    setTotal(toHours(totalMinutes))
  }, [start, finish, toMinutes, toHours, setInterval, setTotal])

  // useEffect(() => {
  //   if (isRemoving) {
  //     handleTimer()
  //     setIsRemoving(false)
  //   }
  // }, [isRemoving])

  return (
    <>
      <Container>
        <div className="flex justify-center w-full mt-6 sm:mt-10">
          <div className="flex-col items-center p-4 sm:p-6 shadow-lg rounded-2xl">
            <div className="flex flex-col pb-2 w-1/2">
              <label htmlFor="workingHours" className="text-sm sm:text-lg">
                Carga horária:
              </label>

              <Input
                onChange={(e) => setWorkingHours(e.target.value)}
                type="time"
                name="workingHours"
                value={workingHours}
                max="12:00"
                min="00:00"
              />
            </div>

            <div className="flex pb-2">
              <div className="flex flex-col">
                {start.map((value, index) => (
                  <div key={`container-${index}`} className="flex flex-col">
                    <div key={`label-${index}`} className="flex items-end pb-3">
                      <div className="flex flex-col">
                        <label
                          htmlFor={`entry-${index}`}
                          className="text-sm sm:text-lg"
                        >
                          Entrada
                        </label>

                        <Input
                          key={`entry-${index}`}
                          onChange={handleChange(index, 'start')}
                          type="time"
                          name={`entry-${index}`}
                          value={value}
                        />
                      </div>

                      <div className="flex flex-col pl-3">
                        <label
                          className="text-sm sm:text-lg"
                          htmlFor={`entry-${index}`}
                        >
                          Saída
                        </label>

                        <Input
                          key={`finish-${index}`}
                          onChange={handleChange(index, 'finish')}
                          type="time"
                          value={finish[index]}
                        />
                      </div>

                      <div className="flex items-center h-10 sm:h-14 pl-3">
                        <ButtonDefault
                          disabled={disabledRemove()}
                          key={index}
                          onClick={() => removeInterval(index)}
                        >
                          <DeleteOutline className="text-base sm:text-lg" />
                        </ButtonDefault>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <ButtonDefault
                className="text-lg sm:text-xl"
                disabled={disabledAdd()}
                onClick={addInterval}
              >
                Adicionar
              </ButtonDefault>
            </div>

            <div className="flex mt-4">
              <Button
                className="text-lg sm:text-xl justify-center grow"
                onClick={handleTimer}
              >
                Calcular
              </Button>
            </div>
          </div>
        </div>

        <p className="text-2xl sm:text-3xl md:text-4xl pb-4 text-center pt-4 sm:pt-6">
          Total de horas: {total}
        </p>
      </Container>
    </>
  )
}
