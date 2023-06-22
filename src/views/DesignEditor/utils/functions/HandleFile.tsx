import { AddObjectFromPanel } from "./AddObjectFromPanel"
import { AddObjectFunc } from "./AddObjectFunc"
import UpdateBg from "./UpdateBg"
import UpdateImg from "./UpdateImg"
import { getDimensions } from "./getDimensions"

const HandleFile = async (
  imageUrl: string,
  setImageLoading: any,
  fileInputType: string,
  setImagesCt: any,
  editor: any,
  frame: any,
  setAddImgInfo?: any,
  mainImgInfo?: any,
  setMainImgInfo?: any,
  setPanelInfo?: any,
  activeOb?: any,
  activeObject?: any,
  setSelectedImage?: any,
  uploadType?: any,
  uploads?: any,
  setUploads?: any,
  ImgColorizerInfo?: any,
  setImgColorizerInfo?: any,
  ImgColorizerpanelInfo?: any,
  setImgColorizerpanelInfo?: any
) => {
  setImageLoading(true)
  if (imageUrl) {
    setAddImgInfo ? setAddImgInfo({ showPreview: true, url: imageUrl }) : null
    if (fileInputType === "add") {
      console.log("ADD IMAGE")
      let latest_ct = 0
      setImagesCt((prev: any) => {
        latest_ct = prev + 1
        return prev + 1
      })
      await getDimensions(imageUrl, (img: any) => {
        AddObjectFunc(
          imageUrl,
          editor,
          img.width,
          img.height,
          frame,
          latest_ct,
          null,
          setAddImgInfo ? setAddImgInfo : null
        )
      })
    } else if (fileInputType === "bgupdate") {
      UpdateBg(imageUrl, editor, frame)
    } else if (fileInputType == "panelAdd") {
      console.log("PANEL ADD")
      let latest_ct = 0
      setImagesCt((prev: any) => {
        latest_ct = prev + 1
        return prev + 1
      })
      await getDimensions(imageUrl, (img: any) => {
        AddObjectFromPanel(
          imageUrl,
          editor,
          img.width,
          img.height,
          frame,
          latest_ct,
          null,
          setSelectedImage ? setSelectedImage : null,
          uploadType ? uploadType : null,
          uploads ? uploads : null,
          setUploads ? setUploads : null,
          setImageLoading ? setImageLoading : null,
          setPanelInfo ? setPanelInfo : null,
          setMainImgInfo ? setMainImgInfo : null
        )
      })
    } else {
      UpdateImg(imageUrl, editor, mainImgInfo, setMainImgInfo, setPanelInfo, activeOb, activeObject)
    }
    setTimeout(() => {
      fileInputType != "panelAdd" ? setImageLoading(false) : null
      close()
    }, 200)
  }

  const fileInfo: any = document.getElementById("inputNextFile")
  if (fileInfo && fileInfo.value) fileInfo.value = ""
}

export default HandleFile
