import Uppy from "@uppy/core"
import { Dashboard } from "@uppy/react"
import OneDrive from "@uppy/onedrive"
import Dropbox from "@uppy/dropbox"
import XHR from "@uppy/xhr-upload"
import Url from "@uppy/url"
import "./uppy.css"
import "@uppy/core/dist/style.min.css"
import "@uppy/dashboard/dist/style.min.css"
import { useEffect, useContext, useState } from "react"
import { getBucketImageUrlFromFile } from "~/utils/removeBackground"
import ImagesContext from "~/contexts/ImagesCountContext"
import { useEditor, useFrame } from "@layerhub-io/react"
import HandleFile from "~/views/DesignEditor/utils/functions/HandleFile"
import { HandleBgUpload } from "~/views/DesignEditor/utils/functions/HandleBgUpload"
import useAppContext from "~/hooks/useAppContext"
import FileError from "../Common/FileError/FileError"
import PhotoEditorContext from "~/contexts/PhotoEditorContext"
import ImageUpScalerContext from "~/contexts/ImageUpScalerContext"
import ImageColorizerContext from "~/contexts/ImageColorizerContext"
import MainImageContext from "~/contexts/MainImageContext"
import { OBJECT_REMOVER, OBJECT_REPLACER } from "~/constants/contants"
import ObjectRemoverContext from "~/contexts/ObjectRemoverContext"
import ObjectReplacerContext from "~/contexts/ObjectReplacerContext"
import { getDimensions } from "~/views/DesignEditor/utils/functions/getDimensions"
import ProductPhotoshootContext from "~/contexts/ProductPhotoshootContext"

const UppyDashboard = ({
  close,
  setImageLoading,
  setAddImgInfo,
  fileInputType,
  activeOb,
  activeObject,
  id,
  setSelectedImage,
  uploadType,
  uploads,
  setUploads,
  setBgUploadPreview,
  imgUpload,
  setImgUpload,
}: any) => {
  const { setImagesCt } = useContext(ImagesContext)
  const editor = useEditor()
  const frame = useFrame()
  const [uploadErrorMsg, setUploadErrorMsg] = useState("")
  const [displayError, setDisplayError] = useState(false)
  const { mainImgInfo, setMainImgInfo, setPanelInfo } = useContext(MainImageContext)
  const { setImgScalerInfo, setImgScalerPanelInfo } = useContext(ImageUpScalerContext)
  const { setImgColorizerInfo, setImgColorizerPanelInfo } = useContext(ImageColorizerContext)
  const { setPhotoEditorInfo, setPhotoEditorPanelInfo } = useContext(PhotoEditorContext)
  const { setProductPhotoshootInfo } = useContext(ProductPhotoshootContext)
  const { objectRemoverInfo, setObjectRemoverInfo } = useContext(ObjectRemoverContext)
  const { objectReplacerInfo, setObjectReplacerInfo } = useContext(ObjectReplacerContext)

  const setDimension = async (img: string) => {
    await getDimensions(img, (imgSrc: any) => {
      setObjectRemoverInfo((prev: any) => ({ ...prev, width: imgSrc.width, height: imgSrc.height }))
    })
  }

  const setDimensionReplacer = async (img: string) => {
    await getDimensions(img, (imgSrc: any) => {
      setObjectReplacerInfo((prev: any) => ({ ...prev, width: imgSrc.width, height: imgSrc.height }))
    })
  }

  let uppy: any

  if (typeof window !== "undefined") {
    uppy = new Uppy({
      id: id,
      autoProceed: false,
    })
    uppy.use(OneDrive, {
      companionUrl: "https://devapi.phot.ai/companion",
    })
    uppy.use(Dropbox, {
      companionUrl: "https://devapi.phot.ai/companion",
    })
    uppy.use(Url, {
      companionUrl: "https://devapi.phot.ai/companion",
    })
    uppy.use(XHR, {
      endpoint: "https://devapi.phot.ai/app/api/v1/signedURL?tool=BACKGROUND_REMOVER",
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      },
    })
    uppy.setOptions({
      restrictions: {
        maxNumberOfFiles: 1,
        allowedFileTypes: ["image/*", ".png", ".jpg", ".jpeg", ".bmp", ".webp"],
        maxFileSize: 5242880,
      },
    })
  }
  const activePanel = useAppContext()

  useEffect(() => {
    uppy.on("file-added", async (file: any) => {
      if(file.type==="image/tiff"){
        setImageLoading(false)
        setDisplayError(true)
        setUploadErrorMsg("Wrong format file uploaded, Please upload an image in JPG, JPEG, PNG or BMP format")
        setTimeout(() => {
          setDisplayError(false)
        }, 5000);
        close()
      }
      if (file.source == "Dropbox" || file.source == "OneDrive") {
        setImageLoading ? setImageLoading(true) : null
        uppy.upload()
      } else {
        setImageLoading ? setImageLoading(true) : null
        const imageUrl = file.source == "Url" ? file.remote.body.fileId : await getBucketImageUrlFromFile(file.data)
        if (fileInputType == "bgUpload") {
          HandleBgUpload(setImageLoading, setBgUploadPreview, imageUrl)
        } else if (fileInputType === "ImgUpscaler") {
          setImgScalerInfo
            ? // @ts-ignore
              setImgScalerInfo((prev) => ({ ...prev, src: imageUrl, original: imageUrl, scale: 2, result: [] }))
            : null
          // @ts-ignore
          setImgScalerPanelInfo((prev) => ({ ...prev, uploadSection: false, uploadPreview: true, trySampleImg: false }))
        } else if (fileInputType === "modalUpload") {
          setImgUpload((prev: any) => ({ ...prev, src: imageUrl }))
        } else if (uploadType === OBJECT_REMOVER) {
          console.log(file)
          setObjectRemoverInfo((prev: any) => ({ ...prev, src: imageUrl, preview: imageUrl, file_name: file.name }))
          setDimension(imageUrl)
        } else if (uploadType === OBJECT_REPLACER) {
          setObjectReplacerInfo((prev: any) => ({ ...prev, src: imageUrl, preview: imageUrl, file_name: file.name }))
          setDimensionReplacer(imageUrl)
        } else if (fileInputType == "photoEditor") {
          setPhotoEditorInfo
            ? setPhotoEditorInfo((prev: any) => ({
                ...prev,
                src: imageUrl,
                original: imageUrl,
                result: [],
              }))
            : null
          setPhotoEditorPanelInfo
            ? setPhotoEditorPanelInfo((prev: any) => ({
                ...prev,
                uploadSection: false,
                uploadPreview: true,
                trySampleImg: false,
              }))
            : null
        } else if (fileInputType === "ImgColorizer") {
          setImgColorizerInfo
            ? // @ts-ignore
              setImgColorizerInfo((prev) => ({ ...prev, src: imageUrl, original: imageUrl, resultImages: [] }))
            : null

          // @ts-ignore
          setImgColorizerPanelInfo((prev) => ({
            ...prev,
            uploadSection: false,
            trySampleImg: false,
            uploadPreview: true,
            resultOption: false,
            tryFilters: false,
          }))
        } else if (fileInputType === "productAdd") {
          setProductPhotoshootInfo((prev: any) => ({
            ...prev,
            addPreview: imageUrl,
          }))
          close()
        } else {
          HandleFile(
            imageUrl,
            setImageLoading,
            fileInputType,
            setImagesCt,
            editor,
            frame,
            setAddImgInfo ? setAddImgInfo : null,
            mainImgInfo ? mainImgInfo : null,
            setMainImgInfo,
            setPanelInfo,
            activeOb ? activeOb : null,
            activeObject ? activeObject : null,
            setSelectedImage ? setSelectedImage : null,
            uploadType ? uploadType : null,
            uploads ? uploads : null,
            setUploads ? setUploads : null
          )
        }
        uppy.cancelAll()
        setTimeout(() => {
          fileInputType != "panelAdd" ? (setImageLoading ? setImageLoading(false) : null) : null
          close()
        }, 200)
      }
    })
    uppy.on("upload-success", async (file: any, data: any) => {
      if (file.source == "Dropbox" || file.source == "OneDrive") {
        setImageLoading ? setImageLoading(true) : null
        const imageUrl = data.body.baseUrl
        if (imageUrl) {
          if (fileInputType == "bgUpload") {
            HandleBgUpload(setImageLoading, setBgUploadPreview, imageUrl)
          } else if (fileInputType === "ImgUpscaler") {
            setImgScalerInfo &&
              setImgScalerInfo((prev: any) => ({ ...prev, src: imageUrl, original: imageUrl, scale: 2, result: [] }))
            setImgScalerPanelInfo((prev: any) => ({
              ...prev,
              uploadSection: false,
              uploadPreview: true,
              trySampleImg: false,
            }))
          } else if (fileInputType === "ImgColorizer") {
            setImgColorizerInfo
              ? // @ts-ignore
                setImgColorizerInfo((prev) => ({ ...prev, src: imageUrl, original: imageUrl }))
              : null
            // @ts-ignore
            setImgColorizerPanelInfo((prev) => ({
              ...prev,
              uploadSection: false,
              trySampleImg: false,
              uploadPreview: true,
              resultOption: false,
              tryFilters: false,
            }))
          } else if (fileInputType === "modalUpload") {
            setImgUpload((prev: any) => ({ ...prev, src: imageUrl }))
          } else if (uploadType === OBJECT_REMOVER) {
            setObjectRemoverInfo((prev: any) => ({ ...prev, src: imageUrl, preview: imageUrl, file_name: file.name }))
            setDimension(imageUrl)
          } else if (uploadType === OBJECT_REPLACER) {
            setObjectReplacerInfo((prev: any) => ({ ...prev, src: imageUrl, preview: imageUrl, file_name: file.name }))
            setDimensionReplacer(imageUrl)
          } else if (fileInputType == "photoEditor") {
            setPhotoEditorInfo
              ? setPhotoEditorInfo((prev: any) => ({
                  ...prev,
                  src: imageUrl,
                  original: imageUrl,
                  result: [],
                }))
              : null
            setPhotoEditorPanelInfo
              ? setPhotoEditorPanelInfo((prev: any) => ({
                  ...prev,
                  uploadSection: false,
                  uploadPreview: true,
                  trySampleImg: false,
                }))
              : null
          } else if (fileInputType === "productAdd") {
            setProductPhotoshootInfo((prev: any) => ({
              ...prev,
              addPreview: imageUrl,
            }))
            close()
          } else {
            HandleFile(
              imageUrl,
              setImageLoading,
              fileInputType,
              setImagesCt,
              editor,
              frame,
              setAddImgInfo ? setAddImgInfo : null,
              mainImgInfo ? mainImgInfo : null,
              setMainImgInfo,
              setPanelInfo,
              activeOb ? activeOb : null,
              activeObject ? activeObject : null,
              setSelectedImage ? setSelectedImage : null,
              uploadType ? uploadType : null,
              uploads ? uploads : null,
              setUploads ? setUploads : null
            )
          }
        }
      }
      uppy.cancelAll()
      setTimeout(() => {
        fileInputType != "panelAdd" ? setImageLoading(false) : null
        close()
      }, 200)
    })
    uppy.on("upload-failed", (file: any, error: any) => {
      console.log("error with file:", file.id)
      console.log("error message:", error)
      uppy.cancelAll()
      setTimeout(() => {
        setImageLoading ? setImageLoading(true) : null
        close()
      }, 200)
    })
    uppy.on("upload-error", (file: any, error: any) => {
      console.log("error with file:", file.id)
      console.log("error message:", error)
      uppy.cancelAll()
      setTimeout(() => {
        setImageLoading ? setImageLoading(true) : null
        close()
      }, 200)
    })

    uppy.on("restriction-failed", (file: any, error: any) => {
      console.log(file, error)
      if (file.source == "Url") {
        setUploadErrorMsg("Incorrect url format. Please enter a valid url.")
      } else if (
        file.type != "image/jpeg" &&
        file.type != "image/png" &&
        file.type != "image/jpg" &&
        file.type != "image/bmp" &&
        file.type != "image/webp"
      ) {
        setUploadErrorMsg("Wrong format file uploaded, Please upload an image in JPG, JPEG, PNG or BMP format")
      } else if (file.size > 5242880) {
        setUploadErrorMsg("File size must be under 5 MB.")
      } else {
        setUploadErrorMsg("An error occurred while uploading the file. Please try again.")
      }
      setTimeout(() => {
        setImageLoading(false)
        setDisplayError(true)
      }, 250)
      uppy.cancelAll()
      setTimeout(() => {
        setDisplayError(false)
        setTimeout(() => {
          setUploadErrorMsg("")
        }, 500)
      }, 5000)
      return false
    })

    uppy.on("info-visible", (file: any, error: any) => {
      console.log(file, error)
      if (file && file.source == "Url") {
        setUploadErrorMsg("Incorrect url format. Please enter a valid url.")
      } else if (
        file &&
        file.type != "image/jpeg" &&
        file.type != "image/png" &&
        file.type != "image/jpg" &&
        file.type != "image/bmp" &&
        file.type != "image/webp"
      ) {
        setUploadErrorMsg("Wrong format file uploaded, Please upload an image in JPG, JPEG, PNG or BMP format")
      } else if (file && file.size > 5242880) {
        setUploadErrorMsg("File size must be under 5 MB.")
      } else {
        setUploadErrorMsg("Incorrect url format. Please enter a valid url.")
      }
      setTimeout(() => {
        setImageLoading(false)
        setDisplayError(true)
      }, 250)
      uppy.cancelAll()
      setTimeout(() => {
        setDisplayError(false)
        setTimeout(() => {
          setUploadErrorMsg("")
        }, 500)
      }, 5000)
      return false
    })
  }, [displayError, uploadErrorMsg, activePanel])

  return (
    <div key={id}>
      <Dashboard
        uppy={uppy}
        plugins={["Dropbox", "OneDrive", "Url"]}
        proudlyDisplayPoweredByUppy={false}
        hideUploadButton={true}
        locale={{
          strings: {
            dropPasteImportFiles: "Drag and drop your image or %{browseFiles}",
            browseFiles: "click to browse",
          },
        }}
        disableInformer={true}
      />
      {uploadErrorMsg && (
        <div style={{ position: "relative", top: "-0.25rem" }}>
          <FileError ErrorMsg={uploadErrorMsg} displayError={displayError} />
        </div>
      )}
    </div>
  )
}

export default UppyDashboard
