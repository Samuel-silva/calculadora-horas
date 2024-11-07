export const useConversion = () => {

  const toMinutes = (timeString: string): number => {
    const [hours, minutes] = timeString.split(':').map(Number)
    return (hours * 60) + minutes
  }

  const toHours = (minutes: number): string => {
    const hours = Math.floor(minutes / 60)
    const rest = minutes % 60
    return `${String(hours).padStart(2, '0')}:${String(rest).padStart(2, '0')}`
  }

  return { toMinutes, toHours }
}
