import { TextOptions } from "~/interfaces/editor"

export const propertiesToInclude = ["id", "selectable"]

export const defaultTextOptions: TextOptions = {
  underline: false,
  textAlign: "left",
  charSpacing: 0,
  fill: "#000000",
  fontFamily: "Open Sans",
  fontSize: 12,
  lineHeight: 12,
  isGroup: false,
  isMultiple: false,
  styles: [],
  font: {},
  activeStyle: {},
}

export const checkboxBGUrl = "https://ik.imagekit.io/rxld8u68i/background.png?updatedAt=1683116649473"
export const backgroundLayerType = "CHECKBOX_BACKGROUND"
export const deviceUploadType = "DEVICE_UPLOAD"
export const LOCAL_SAMPLE_IMG = "local_sample_img"
export const MAIN_IMG_Bg = "main_img_bg"
export const TEXT_TO_ART = "text_to_art"
export const IMAGE_UPSCALER = "ImageUpscaler"
export const PHOTO_EDITOR = "PhotoEditor"
export const REMOVE_BACKGROUND = "remove_bg"
export const IMAGE_COLORIZER = "ImageColorizer"
export const OBJECT_REMOVER = "ObjectRemover"
export const MODAL_IMG_UPLOAD = "ModalImgUpload"

export const TOOL_NAMES = {
  Image: "Image",
  bgRemover: "Remove Background",
  imagineAi: "Imagine AI",
  imageUpscalar: "Image Upscaler",
  imageColorizer: "Image Colorizer",
  photoEditor: "Photo Editor",
}

export const SAMPLE_IMAGES: any = {
  Image: "",
  bgRemover: "STUDIO_BACKGROUND_REMOVER",
  imagineAi: "",
  imageUpscaler: "UPSCALER",
  imageColorizer: "STUDIO_COLORISER",
  photoEditor: "STUDIO_PHOTO_EDITOR",
}
