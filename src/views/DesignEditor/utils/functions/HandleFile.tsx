import { AddObjectFunc } from "./AddObjectFunc"
import UpdateBg from "./UpdateBg"
import UpdateImg from "./UpdateImg"
import { getDimensions } from "./getDimensions"

const HandleFile = async (
  imageUrl: string,
  setImageLoading: any,
  setAddImgInfo: any,
  fileInputType: string,
  setImagesCt: any,
  editor: any,
  frame: any,
  mainImgInfo?: any,
  setMainImgInfo?: any,
  setPanelInfo?: any,
  activeOb?: any,
  activeObject?: any
) => {
  setImageLoading(true)

  if (imageUrl) {
    setImageLoading(false)
    setAddImgInfo({ showPreview: true, url: imageUrl })
    if (fileInputType === "add") {
      console.log("ADD IMAGE")
      let latest_ct = 0
      setImagesCt((prev: any) => {
        latest_ct = prev + 1
        return prev + 1
      })
      await getDimensions(imageUrl, (img: any) => {
        AddObjectFunc(imageUrl, editor, img.width, img.height, frame, latest_ct, null, setAddImgInfo)
      })
    } else if (fileInputType === "bgupdate") {
      console.log("BG UPDATE")
      UpdateBg(imageUrl, editor, frame)
    } else {
      console.log("ELSE")
      UpdateImg(imageUrl, editor, mainImgInfo, setMainImgInfo, setPanelInfo, activeOb, activeObject)
    }
    setTimeout(() => {
      close()
    }, 200)
  }

  const fileInfo: any = document.getElementById("inputNextFile")
  if (fileInfo.value) fileInfo.value = ""
}

export default HandleFile
