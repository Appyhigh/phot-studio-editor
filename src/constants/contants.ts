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
export const deviceUploadType="DEVICE_UPLOAD"
export const LOCAL_SAMPLE_IMG="local_sample_img"
export const MAIN_IMG_Bg="main_img_bg"