export const rgbaTohex = (r: number, g: number, b: number, a: number) => {
  var hex =
    "#" +
    (parseInt(`${r}`, 10) | (1 << 8)).toString(16).slice(1) +
    (parseInt(`${g}`, 10) | (1 << 8)).toString(16).slice(1) +
    (parseInt(`${b}`, 10) | (1 << 8)).toString(16).slice(1)
  // setHexColor(hex)
  // setOpacity(`${Math.round(a * 100)}%`)

  return hex
}

export const rgbaTohsva = (r: number, g: number, b: number, a: number) => {
  // Validate input values
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255 || a < 0 || a > 1) {
    throw new Error("Invalid RGBA values. Values must be numbers in the specified range.")
  }

  // Normalize input values
  r = r / 255
  g = g / 255
  b = b / 255
  a = Math.min(1, Math.max(0, a))

  // Find the maximum and minimum values among R, G, and B
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

  // Calculate the hue
  let h
  if (max === min) {
    h = 0 // achromatic (grayscale)
  } else {
    const d = max - min
    h = max === r ? ((g - b) / d + (g < b ? 6 : 0)) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4
    h = Math.floor(h * 60) // round down to the nearest whole number
  }

  // Calculate the saturation
  const s = max === 0 ? 0 : Math.floor(((max - min) / max) * 100) // round down to the nearest whole number

  // Calculate the value/brightness
  const v = Math.floor(max * 100) // round down to the nearest whole number

  return { h, s, v, a }
}

export const rgbaTohsla = (r: number, g: number, b: number, a: number) => {
  // Validate input values
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255 || a < 0 || a > 1) {
    throw new Error("Invalid RGBA values. Values must be numbers in the specified range.")
  }

  // Normalize input values
  r = r / 255
  g = g / 255
  b = b / 255
  a = Math.min(1, Math.max(0, a))

  // Find the maximum and minimum values among R, G, and B
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

  // Calculate the hue
  let h
  if (max === min) {
    h = 0 // achromatic (grayscale)
  } else {
    const d = max - min
    h = max === r ? ((g - b) / d + (g < b ? 6 : 0)) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4
    h = Math.round(h * 60) // round to the nearest whole number
  }

  // Calculate the lightness
  const l = Math.round(((max + min) / 2) * 100) // round to the nearest whole number

  // Calculate the saturation
  const s = max === min ? 0 : Math.round(((max - min) / (1 - Math.abs((2 * l) / 100 - 1))) * 100) // round to the nearest whole number

  return { h, s, l, a }
}
