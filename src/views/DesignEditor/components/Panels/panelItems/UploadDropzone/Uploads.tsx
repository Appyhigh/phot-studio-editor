import React, { useContext, useEffect, useState } from "react"
import { Block } from "baseui/block"
import { useEditor } from "@layerhub-io/react"
import UploadPreview from "../UploadPreview/UploadPreview"
import Icons from "~/components/Icons"
import classes from "./style.module.css"
import clsx from "clsx"
import MainImageContext from "~/contexts/MainImageContext"
import { LOCAL_SAMPLE_IMG } from "~/constants/contants"
import FileError from "~/components/UI/Common/FileError/FileError"
import LoaderSpinner from "../../../../../Public/images/loader-spinner.svg"
import UppyDashboard from "~/components/UI/UploadInput/UppyDashboard"

export default function ({ uploadType, activePanel, imageLoading, setImageLoading }: any) {
  const [uploads, setUploads] = React.useState<any[]>([])

  const editor = useEditor()
  const [selectedImage, setSelectedImage] = React.useState<any>(null)
  const { mainImgInfo, setMainImgInfo, panelInfo, setPanelInfo } = useContext(MainImageContext)

  const [rejectedFileUpload, setRejectedFileUpload] = useState(false)
  const [renderKey, setRenderKey] = useState(0)

  const discardHandler = (id: string) => {
    setMainImgInfo((prev: any) => ({ ...prev, id: "" }))
    // @ts-ignore
    setPanelInfo((prev) => ({
      ...prev,
      trySampleImg: true,
      bgOptions: false,
      uploadPreview: false,
      bgRemoverBtnActive: false,
      uploadSection: true,
    }))
    editor.objects.removeById(id)
  }

  useEffect(() => {
    setTimeout(() => {
      setRenderKey((prev) => prev + 1)
    }, 4000)
  }, [imageLoading])

  return (
    <>
      <Block className={"mt-3"}>
        <Block className="d-flex align-items-center flex-start">
          <Block className="pl-1">
            {uploadType === LOCAL_SAMPLE_IMG && !imageLoading && !rejectedFileUpload && uploads.length === 0 ? (
              <Block className={classes.panelHeading}>Add Image</Block>
            ) : (
              uploadType != LOCAL_SAMPLE_IMG &&
              !imageLoading &&
              !rejectedFileUpload &&
              mainImgInfo.id === "" && <Block className={classes.panelHeading}>Add Image</Block>
            )}
          </Block>
          <Block>
            {activePanel === "Images"
              ? uploadType === LOCAL_SAMPLE_IMG &&
                !imageLoading &&
                !rejectedFileUpload &&
                uploads.length != 0 && (
                  <div
                    className="d-flex justify-content-start flex-row align-items-center pointer"
                    onClick={() => {
                      //when right icon with Image is clicked set upload to intital state
                      setUploads([])
                    }}
                  >
                    <Icons.ChevronRight size="16" /> <Block className={clsx(classes.panelHeading, "ml-1")}>Image</Block>
                  </div>
                )
              : mainImgInfo.id &&
                !imageLoading && (
                  <div
                    className="d-flex justify-content-start flex-row align-items-center pointer"
                    onClick={() => {
                      //when right icon with Image is clicked set upload to intital state
                      setMainImgInfo((prev: any) => ({ ...prev, id: "" }))
                      // @ts-ignore
                      setPanelInfo((prev) => ({
                        ...prev,
                        trySampleImg: true,
                        bgOptions: false,
                        uploadSection: true,
                        bgRemoveBtnActive: false,
                      }))
                    }}
                  >
                    <Icons.ChevronRight size="16" /> <Block className={clsx(classes.panelHeading, "ml-1")}>Image</Block>
                  </div>
                )}
          </Block>
        </Block>
        {uploadType === LOCAL_SAMPLE_IMG && !imageLoading && uploads.length === 0 && !rejectedFileUpload ? (
          <div key={renderKey}>
            <UppyDashboard
              setImageLoading={setImageLoading}
              fileInputType={"panelAdd"}
              mainImgInfo={mainImgInfo}
              setMainImgInfo={setMainImgInfo}
              setPanelInfo={setPanelInfo}
              id={"Image"}
              setSelectedImage={setSelectedImage}
              uploadType={uploadType}
              uploads={uploads}
              setUploads={setUploads}
            />
          </div>
        ) : (
          mainImgInfo.id == "" &&
          !rejectedFileUpload &&
          !imageLoading &&
          uploadType !== LOCAL_SAMPLE_IMG && (
            <div key={renderKey}>
              <UppyDashboard
                setImageLoading={setImageLoading}
                fileInputType={"panelAdd"}
                mainImgInfo={mainImgInfo}
                setMainImgInfo={setMainImgInfo}
                setPanelInfo={setPanelInfo}
                id={"BgImage"}
                setSelectedImage={setSelectedImage}
                uploadType={uploadType}
                uploads={uploads}
                setUploads={setUploads}
              />
            </div>
          )
        )}

        <>
          <Block className={classes.uploadInputWrapper}>
            {activePanel === "Images"
              ? uploadType === LOCAL_SAMPLE_IMG &&
                rejectedFileUpload && (
                  <FileError
                    handleTry={() => {
                      setRejectedFileUpload(false)
                    }}
                  />
                )
              : uploadType !== LOCAL_SAMPLE_IMG &&
                rejectedFileUpload && (
                  <FileError
                    handleTry={() => {
                      setRejectedFileUpload(false)
                    }}
                  />
                )}
            <Block className={classes.uploadPreviewSection}>
              {activePanel === "Images"
                ? uploadType === LOCAL_SAMPLE_IMG &&
                  !rejectedFileUpload &&
                  !imageLoading &&
                  uploads.length != 0 &&
                  uploads.map((upload) => (
                    <div
                      key={upload.id}
                      className="d-flex align-items-center pointer"
                      // onClick={() => addImageToCanvas(upload)}
                    >
                      <UploadPreview
                        uploadType={uploadType}
                        upload={upload}
                        selectedImage={selectedImage}
                        discardHandler={() => {
                          setUploads([])
                        }}
                      />
                    </div>
                  ))
                : mainImgInfo.id &&
                  !rejectedFileUpload &&
                  !imageLoading && (
                    <UploadPreview
                      uploadType={uploadType}
                      selectedImage={selectedImage}
                      discardHandler={discardHandler}
                    />
                  )}
            </Block>
          </Block>
        </>
      </Block>
      {imageLoading && !rejectedFileUpload && (
        <Block
          className={clsx("d-flex justify-content-center flex-column pointer p-relative", classes.uploadInputSection)}
        >
          <Block className={classes.uploadInputContainer}>
            <Icons.InputContainer />
          </Block>
          <div className={classes.loadingSpinner}>
            {<img className={classes.stockImagesLoader} src={LoaderSpinner} />}{" "}
          </div>
        </Block>
      )}
    </>
  )
}
