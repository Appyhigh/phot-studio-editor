export const applyZoomRatio = (type: string, e: any, editor: any) => {
  const zoomMin = 14
  const zoomMax = 160
  const value = e.target.value
  if (editor) {
    if (value === "") {
      return
    } else {
      let parsedValue = parseFloat(value)

      if (parsedValue < 0) {
        editor.zoom.zoomToRatio(zoomMin / 70)
      } else if (parsedValue > zoomMax) {
        editor.zoom.zoomToRatio(zoomMax / 70)
      } else {
        editor.zoom.zoomToRatio(parsedValue / 70)
      }
    }
  }
}
