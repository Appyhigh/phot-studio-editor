import { SLIDER_TYPE } from "./enum"

export const AdjustOptions = [
  {
    name: "Brightness",
    minVal: 0,
    maxVal: 100,
    percentage: true,
    type: SLIDER_TYPE.BRIGHTNESS,
    step: 1,
    defaultValue: 50,
  },
  {
    name: "Contrast",
    minVal: 0,
    maxVal: 100,
    percentage: true,
    type: SLIDER_TYPE.CONTRAST,
    step: 1,
    defaultValue: 50,
  },
  {
    name: "Saturation",
    minVal: 0,
    maxVal: 100,
    percentage: true,
    type: SLIDER_TYPE.SATURATION,
    step: 1,
    defaultValue: 50,
  },
  {
    name: "Highlight",
    minVal: 0,
    maxVal: 100,
    percentage: true,
    type: SLIDER_TYPE.HIGHLIGHT,
    step: 1,
    defaultValue: 0,
  },
  {
    name: "Lowlight",
    minVal: 0,
    maxVal: 100,
    percentage: true,
    type: SLIDER_TYPE.LOWLIGHT,
    step: 1,
    defaultValue: 0,
  },
  { name: "Hue", minVal: 0, maxVal: 100, percentage: true, type: SLIDER_TYPE.HUE, step: 1, defaultValue: 0 },
  {
    name: "Temperature",
    minVal: -100,
    maxVal: 100,
    percentage: true,
    type: SLIDER_TYPE.TEMPERATURE,
    step: 1,
    defaultValue: 0,
  },
  {
    name: "Opacity",
    minVal: 0,
    maxVal: 100,
    percentage: true,
    type: SLIDER_TYPE.OPACITY,
    step: 1,
    defaultValue: 50,
  },
  {
    name: "Vibrance",
    minVal: 0,
    maxVal: 100,
    type: SLIDER_TYPE.VIBRANCE,
    step: 1,
    defaultValue: 50,
  },
  {
    name: "Noise",
    minVal: 0,
    maxVal: 100,
    type: SLIDER_TYPE.NOISE,
    step: 1,
    defaultValue: 50,
  },
  {
    name: "Pixelate",
    minVal: 0,
    maxVal: 100,
    type: SLIDER_TYPE.PIXELATE,
    step: 1,
    defaultValue: 50,
  },
]
