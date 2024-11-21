import { useState } from 'react'

export interface Validation {
  initBiggerFinish: boolean
  emptyStart: boolean
  emptyFinish: boolean
}

export const createDefaultValidation = (): Validation => ({
  initBiggerFinish: false,
  emptyStart: false,
  emptyFinish: false
})

export const useValidation = () => {
  const [validation, setValidation] = useState<Validation[]>([
    createDefaultValidation(),
    createDefaultValidation()
  ])

  return { validation, setValidation }
}
