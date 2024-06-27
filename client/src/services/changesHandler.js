
export const handleChange = (event, newValue, setValue, setChanges) => {
  if (newValue !== null) {
    setValue(newValue)
    setChanges(newValue)
  }
}