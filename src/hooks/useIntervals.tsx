import { Dispatch, SetStateAction, useState } from "react"
import { Validation,  createDefaultValidation } from "./useValidation"

export const useIntervals = (
  validation: Validation[],
  setValidation: (newValidation: Validation[]) => void,
  setIsRemoving: Dispatch<SetStateAction<boolean>>) => {

  const [start, setStart] = useState<string[]>(['', ''])
  const [finish, setFinish] = useState<string[]>(['', ''])
  const [interval, setInterval] = useState<string[]>(['', ''])

  const addInterval = (): void => {
    if (start.length < 5) {
      setStart([...start, ''])
      setFinish([...finish, ''])
      setInterval([...interval, ''])
      setValidation([...validation, createDefaultValidation()])
    }
  };

  const removeInterval = ():void => {
    if (start.length > 1) {
      const newStart = [...start]
      const newFinish = [...finish]
      const newCount = [...interval]
      const newValidation = [...validation]
      newStart.pop()
      newFinish.pop()
      newCount.pop()
      newValidation.pop()
      setStart(newStart)
      setFinish(newFinish)
      setInterval(newCount)
      setValidation(newValidation)
      setIsRemoving(true)
    }
  }

  return { start, finish, interval, addInterval, removeInterval, setStart, setFinish, setInterval }
}