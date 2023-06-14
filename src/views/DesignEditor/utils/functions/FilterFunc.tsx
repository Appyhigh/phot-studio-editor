export const IsFilterPresent = (activeObject: any, type: any) => {
  if (activeObject?.filters) {
    let value = false
    let index = -1
    activeObject?.filters?.map((each, idx) => {
      if (activeObject?.filters[idx]?.type === type) {
        value = true
        index = idx
      }
    })
    return index
  } else {
    return -1
  }
}
