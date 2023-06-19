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
import Icons from "~/components/Icons"
import { getBucketImageUrlFromFile } from "~/utils/removeBackground"

import classes from "./style.module.css"
import ImagesContext from "~/contexts/ImagesCountContext"
import { useEditor, useFrame } from "@layerhub-io/react"
import HandleFile from "~/views/DesignEditor/utils/functions/HandleFile"
import { HandleBgUpload } from "~/views/DesignEditor/utils/functions/HandleBgUpload"
import FileError from "../Common/FileError/FileError"

const UppyDashboard = ({
  close,
  setImageLoading,
  setAddImgInfo,
  fileInputType,
  mainImgInfo,
  setMainImgInfo,
  setPanelInfo,
  activeOb,
  activeObject,
  id,
  setSelectedImage,
  uploadType,
  uploads,
  setUploads,
  setBgUploadPreview,
}: any) => {
  const { setImagesCt } = useContext(ImagesContext)
  const editor = useEditor()
  const frame = useFrame()
  const [uploadErrorMsg, setUploadErrorMsg] = useState("")
  const [displayError, setDisplayError] = useState(false)

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
        maxFileSize: 10485760,
      },
    })
  }

  useEffect(() => {
    uppy.on("file-added", async (file: any) => {
      if (file.source == "Dropbox" || file.source == "OneDrive") {
        setImageLoading(true)
        uppy.upload()
      } else {
        setImageLoading(true)
        const imageUrl = file.source == "Url" ? file.remote.body.fileId : await getBucketImageUrlFromFile(file.data)
        if (fileInputType == "bgUpload") {
          HandleBgUpload(setImageLoading, setBgUploadPreview, imageUrl)
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
            setMainImgInfo ? setMainImgInfo : null,
            setPanelInfo ? setPanelInfo : null,
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
          fileInputType != "panelAdd" ? setImageLoading(false) : null
          close()
        }, 200)
      }
    })
    uppy.on("upload-success", async (file: any, data: any) => {
      if (file.source == "Dropbox" || file.source == "OneDrive") {
        setImageLoading(true)
        const imageUrl = data.body.baseUrl
        if (imageUrl) {
          if (fileInputType == "bgUpload") {
            HandleBgUpload(setImageLoading, setBgUploadPreview, imageUrl)
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
              setMainImgInfo ? setMainImgInfo : null,
              setPanelInfo ? setPanelInfo : null,
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
        setImageLoading(false)
        close()
      }, 200)
    })
    uppy.on("upload-error", (file: any, error: any) => {
      console.log("error with file:", file.id)
      console.log("error message:", error)
      uppy.cancelAll()
      setTimeout(() => {
        setImageLoading(false)
        close()
      }, 200)
    })
    uppy.on("restriction-failed", (file: any, error: any) => {
      if (file.size > 10485760) {
        setUploadErrorMsg("File size must be under 10 MB.")
      } else {
        setUploadErrorMsg("Wrong format file uploaded , Please upload an image in JPG, JPEG , PNG or BMP format")
      }
      setTimeout(() => {
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
  }, [displayError, uploadErrorMsg])

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
        <div style={{ position: "relative", top: "-0.75rem" }}>
          <FileError ErrorMsg={uploadErrorMsg} displayError={displayError} />
        </div>
      )}
    </div>
  )
}

export default UppyDashboard
