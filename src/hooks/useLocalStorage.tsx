function useLocalStorage<T>() {
  const saveToStorage = (key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  const getAllFromStorage = (key?: string): Record<string, T> => {
    const allEntries: Record<string, T> = {}
    if (key && Object.keys(localStorage).includes(key)) {
      allEntries[key] = JSON.parse(localStorage.getItem(key) || 'null')
    } else {
      Object.keys(localStorage).forEach((key) => {
        allEntries[key] = JSON.parse(localStorage.getItem(key) || 'null')
      })
    }
    return allEntries
  }

  return { saveToStorage, getAllFromStorage }
}

export default useLocalStorage
