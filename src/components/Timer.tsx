import { Container } from 'styles/sharedstyles'
import { Button, ButtonSuccess } from 'styles/buttons'
import { useState } from 'react'
import { useIntervals } from 'hooks/useIntervals'
import { useValidation } from 'hooks/useValidation'
import { useConversion } from 'hooks/useConversion'
import Add from '@mui/icons-material/AddOutlined'

export default function Timer() {
  const [total, setTotal] = useState<string>('--:--')
  // const [count, setCount] = useState<string>('--:--')
  const [workingHours, setWorkingHours] = useState<string>('08:00')
  const [isRemoving, setIsRemoving] = useState<boolean>(false)

  const { validation, setValidation } = useValidation()
  const { toMinutes, toHours } = useConversion()
  const { start, finish, addInterval, setStart, setFinish } = useIntervals(
    1,
    validation,
    setValidation,
    setIsRemoving
  )

  const handleStartChange =
    (index: number) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const newValues = [...start]
      newValues[index] = event.target.value
      setStart(newValues)
    }

  const handleFinishChange =
    (index: number) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const newValues = [...finish]
      newValues[index] = event.target.value
      setFinish(newValues)
    }

  const updateFinish = (index: number, value: string) => {
    // console.log()
    const newValues = [...finish]
    newValues[index] = value
    setFinish(newValues)
  }

  const handleTimer = (): void => {
    const startInterval = new Date()
    const finishInterval = new Date()

    const newInterval = start.map((value, index) => {
      validation[index].emptyStart = !value && !finish[index]
      // validation[index].emptyFinish = !finish[index] && !!value

      if (!value) {
        return '00:00'
      } else {
        startInterval.setHours(+value.substring(0, 2))
        startInterval.setMinutes(+value.substring(3))
        startInterval.setSeconds(0)

        if (finish[index]) {
          finishInterval.setHours(+finish[index].substring(0, 2))
          finishInterval.setMinutes(+finish[index].substring(3))
          finishInterval.setSeconds(0)
        } else {
          finishInterval.setHours(
            startInterval.getHours() + +workingHours.substring(0, 2)
          )
          finishInterval.setMinutes(
            startInterval.getMinutes() + +workingHours.substring(3)
          )
          finishInterval.setSeconds(0)

          updateFinish(
            index,
            `${finishInterval.getHours().toString().padStart(2, '0')}:${finishInterval.getMinutes().toString().padStart(2, '0')}`
          )
        }

        if (finishInterval.getTime() >= startInterval.getTime()) {
          const now = new Date()
          now.setSeconds(0)

          let diff = (finishInterval.getTime() - now.getTime()) / 1000 / 60

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
    console.log(newInterval)

    const totalMinutes = newInterval.reduce(
      (soma, tempo) => soma + toMinutes(tempo),
      0
    )
    setTotal(toHours(totalMinutes))
  }

  const disabledAdd = (): boolean => start.length > 4
  // const disabledRemove = (): boolean => start.length < 2

  // useEffect(() => {
  //   if (isRemoving) {
  //     handleTimer()
  //     setIsRemoving(false)
  //   }
  // }, [isRemoving])

  return (
    <>
      <Container>
        <div className="flex items-center py-3">
          <p className="text-xl sm:text-2xl py-4">Intervalos</p>
          <ButtonSuccess
            disabled={disabledAdd()}
            className="ml-4"
            onClick={addInterval}
            aria-label="Adicionar intervalo"
          >
            <Add
              className="text-white my-0.5"
              style={{ fontSize: 'clamp(26px, 2vw, 30px)' }}
            />
          </ButtonSuccess>
          {/* <ButtonDanger
            disabled={disabledRemove()}
            className="ml-4"
            onClick={() => removeInterval()}
            aria-label="Remover intervalo"
          >
            <Remove
              className="text-white my-0.5"
              style={{ fontSize: 'clamp(26px, 2vw, 30px)' }}
            />
          </ButtonDanger> */}
        </div>
        <div className="flex pb-4">
          <div className="flex flex-col">
            <div className="flex h-10 items-center mb-4">
              <label htmlFor="workingHours" className="text-sm sm:text-lg">
                Horas trabalhadas por dia:
              </label>
              <div className="mx-0.5 sm:mx-1">
                <input
                  className="border border-solid rounded text-sm sm:text-base px-1 w-20 sm:w-24 border-gray-500"
                  max="12:00"
                  min="00:00"
                  name="workingHours"
                  onChange={(e) => setWorkingHours(e.target.value)}
                  type="time"
                  value={workingHours}
                />
              </div>
            </div>
            {start.map((value, index) => (
              <div key={`container-${index}`} className="flex flex-col">
                <div key={`label-${index}`} className="flex h-10 items-center">
                  <p
                    key={`text-${index}`}
                    className="w-20 sm:w-28 text-sm sm:text-lg"
                  >
                    Intervalo {index + 1}:
                  </p>

                  <div className="mx-0.5 sm:mx-1">
                    <input
                      className={`border border-solid rounded text-sm sm:text-base px-1 w-20 sm:w-24 ${validation[index].emptyStart ? 'border-red-500' : 'border-gray-500'}`}
                      key={`entry-${index}`}
                      onChange={handleStartChange(index)}
                      type="time"
                      value={value}
                    />
                  </div>

                  <div className="mx-0.5 sm:mx-1">
                    <input
                      className={`border border-solid text-sm sm:text-base rounded px-1 w-20 sm:w-24 ${validation[index].emptyFinish ? 'border-red-500' : 'border-gray-500'}`}
                      key={`finish-${index}`}
                      onChange={handleFinishChange(index)}
                      type="time"
                      value={finish[index]}
                    />
                  </div>
                </div>
                <div key={`validation-${index}`} className="h-4">
                  <p
                    className={`pl-20 sm:pl-28 ml-1 text-xs text-red-600 ${validation[index].initBiggerFinish ? 'block' : 'hidden'}`}
                    key={`validation-bigger-${index}`}
                  >
                    Hora inicial maior que hora final
                  </p>
                  <p
                    key={`validation-empty-${index}`}
                    className={`pl-20 sm:pl-28 ml-1 text-xs text-red-600 ${validation[index].emptyStart || validation[index].emptyFinish ? 'block' : 'hidden'}`}
                  >
                    Preencha o campo
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xl sm:text-2xl pb-4">Total de horas: {total}</p>
        <Button onClick={handleTimer} className="text-lg sm:text-xl">
          Calcular
        </Button>
      </Container>
    </>
  )
}
