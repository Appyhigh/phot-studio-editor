
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

export const IsFilterPresentMetadata = (metadata, type) => {
  if (metadata?.filters) {
    let value = -1;
    metadata?.filters?.map((each, idx) => {
      if (Object.keys(metadata?.filters[idx])[0] === type) {
        value = idx;
      }
    })
    return value;
  }
}
