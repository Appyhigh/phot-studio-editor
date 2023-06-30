import { fabric } from 'fabric'

export const CanvasObjects = {
  text: {
    render: (options:any) => {
      const { text, ...textOptions } = options
      return new fabric.Textbox(text, textOptions)
    },
  },
  image: {
    render: (options:any) => {
      const { url, ...imageOptions } = options
      return new fabric.Image(url, imageOptions)
    },
  },
}
