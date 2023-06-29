import { useState } from "react"
import useFabricEditor from "src/hooks/useFabricEditor"
import CanvasArea from "./CanvasArea/CanvasArea"
import classes from "./style.module.css"
import ModalBasePanel from "./Panels/ModalBasePanel/ModalBasePanel"
import PointerIcon from "~/components/Icons/PointerIcon"
import "swiper/css"
import "swiper/css/navigation"
import PhotoshootLeftPanel from "./Panels/PhotoshootLeftPanel/PhotoshootLeftPanel"

function Editor({ handleClose }: any) {
  const [dimension, setDimension] = useState({
    width: 800,
    height: 800,
  })
  const [isDoneBtnDisabled, setIsDoneBtnDisabled] = useState(false)

  const { fabricEditor } = useFabricEditor()

  const { canvas, objects }: any = fabricEditor

  return (
    <div>
      <div className={"d-flex flex-row"}>
        <PhotoshootLeftPanel handleClose={handleClose} />
        {/* <ImagesPanel /> */}

        <div className={classes.editor}>
          <ModalBasePanel handleClose={handleClose} isDoneBtnDisabled={isDoneBtnDisabled} />
          <div className={classes.three}>
            <CanvasArea width={dimension.width} height={dimension.height} />
          </div>
        </div>
      </div>

      <div className={classes.chevronIcon} style={{ bottom: "0.5rem" }}>
        <PointerIcon />
      </div>
    </div>
  )
}

export default Editor
