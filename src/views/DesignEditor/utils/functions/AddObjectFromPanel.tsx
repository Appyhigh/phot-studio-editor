import { nanoid } from "nanoid"
import { LOCAL_SAMPLE_IMG } from "~/constants/contants"

export const AddObjectFromPanel = (
  url: string,
  editor: any,
  width?: number,
  height?: number,
  frame?: any,
  latest_ct?: any,
  setRejectedFileUpload?: any,
  setSelectedImage?: any,
  uploadType?: string,
  uploads?: any,
  setUploads?: any,
  setImageLoading?: any,
  setPanelInfo?: any,
  setMainImgInfo?: any
) => {
  let scale = 1
  if (width && height && frame) {
    if (width > frame.width || height > frame.height) {
      if (width / frame.width > height / frame.height) {
        scale = frame.width / width
      } else {
        scale = frame.height / height
      }
    }
  }
  if (editor) {
    const options = {
      type: "StaticImage",
      id: nanoid(),
      src: url,
      preview: url,
      original: url,
      metadata: { generationDate: new Date().getTime() },
      scaleX: scale,
      scaleY: scale,
      name: latest_ct.toString(),
    }
    setSelectedImage(options)
    const fileInfo: any = document.getElementById("inputFile")
    if (fileInfo?.value) fileInfo.value = ""

    if (uploadType === LOCAL_SAMPLE_IMG) {
      setUploads([...uploads, options])
      if (url) {
        setImageLoading(false)
      }
    } else {
      // @ts-ignore
      setPanelInfo((prev) => ({
        ...prev,
        trySampleImg: false,
        bgRemoverBtnActive: true,
        uploadSection: false,
        bgOptions: false,
        UploadPreview: true,
      }))
      // @ts-ignore
      setMainImgInfo((prev) => ({ ...prev, ...options }))
      if (url) {
        setImageLoading(false)
      }
    }
  }
}
