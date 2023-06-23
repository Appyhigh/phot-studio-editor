import React, { useContext, useEffect, useState } from "react"
import { Block } from "baseui/block"
import Icons from "~/components/Icons"
import classes from "./style.module.css"
import clsx from "clsx"
import MainImageContext from "~/contexts/MainImageContext"
import LoaderSpinner from "../../../../../Public/images/loader-spinner.svg"
import UppyDashboard from "~/components/UI/UploadInput/UppyDashboard"
import ImageUpScalerContext from "~/contexts/ImageUpScalerContext"
import ImageColorizerContext from "~/contexts/ImageColorizerContext"

export default function ({
  uploadType,
  mainHeading,
  fileInputType,
  id,
  uploads,
  setUploads,
  imageLoading,
  setImageLoading,
}: any) {
  const [selectedImage, setSelectedImage] = React.useState<any>(null)
  const { mainImgInfo, setMainImgInfo, setPanelInfo } = useContext(MainImageContext)
  const { imgScalerInfo, setImgScalerInfo, setImgScalerPanelInfo } = useContext(ImageUpScalerContext)
  // @ts-ignore
  const { ImgColorizerInfo, setImgColorizerInfo, ImgColorizerpanelInfo, setImgColorizerpanelInfo } =
    useContext(ImageColorizerContext)
  const [renderKey, setRenderKey] = useState(0)

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
            <Block className={classes.panelHeading}>{mainHeading}</Block>
          </Block>
        </Block>
        {!imageLoading && (
          <div key={renderKey}>
            <UppyDashboard
              setImageLoading={setImageLoading}
              fileInputType={fileInputType}
              imgScalerInfo={imgScalerInfo}
              setImgScalerInfo={setImgScalerInfo}
              setImgScalerPanelInfo={setImgScalerPanelInfo}
              mainImgInfo={mainImgInfo}
              setMainImgInfo={setMainImgInfo}
              setPanelInfo={setPanelInfo}
              id={id}
              setSelectedImage={setSelectedImage}
              uploadType={uploadType}
              uploads={uploads}
              setUploads={setUploads}
              ImgColorizerInfo={ImgColorizerInfo}
              setImgColorizerInfo={setImgColorizerInfo}
              ImgColorizerpanelInfo={ImgColorizerpanelInfo}
              setImgColorizerpanelInfo={setImgColorizerpanelInfo}
            />
          </div>
        )}
      </Block>
      {imageLoading && (
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
