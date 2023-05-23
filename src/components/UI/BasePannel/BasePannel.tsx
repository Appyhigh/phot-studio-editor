import { Block } from "baseui/block"
import Icons from "../../Icons"
import { StatefulTooltip } from "baseui/tooltip"
import { PLACEMENT } from "baseui/toast"
import ResizeCanvasPopup from "~/views/DesignEditor/components/Footer/Graphic/ResizeCanvasPopup/ResizeCanvasPopup"
import DownloadPopup from "~/views/DesignEditor/components/Footer/Graphic/DownloadPopup/DownloadPopup"
import CanvasEditingPannel from "~/views/DesignEditor/components/Footer/Graphic/CanvasEditingPannel/CanvasEditingPannel"
import { useEditor } from "@layerhub-io/react"
import AddPopup from "~/views/DesignEditor/components/Footer/Graphic/AddPopup/AddPopup"
import { useState } from "react"
import classes from "./style.module.css"
import clsx from "clsx"
import { backgroundLayerType, checkboxBGUrl } from "~/constants/contants"

const BasePannel = () => {
  const editor = useEditor()
  const [showAddPopup, setShowAddPopup] = useState(false)

  const resetHandler = () => {
    editor.objects.clear()
    editor.history.reset()
    editor.history.save()
    const options = {
      type: "StaticImage",
      src: checkboxBGUrl,
      preview: checkboxBGUrl,
      metadata: { generationDate: new Date().getTime(), type: backgroundLayerType },
    }
    editor.objects.add(options).then(() => {
      editor.objects.setAsBackgroundImage()
    })
  }

  const handleCloseAddPopup = () => {
    setShowAddPopup(false)
  }

  const [showCanvasResizePopup, setCanvasResizePopup] = useState(false)
  return (
    <Block className={clsx(classes.basePannel, "d-flex align-items-center flex-row")}>
      <Block className="d-flex justify-content-start align-items-center">
        <Block className="flex-center">
          <div className="p-relative addPopupBtn">
            <button
              className={classes.basePannelBtn}
              onMouseOver={() => {
                setShowAddPopup(true)
              }}
            >
              <span className="d-flex align-items-center">
                <span className="pr-1">
                  <Icons.Plus size={16} />
                </span>
                Add
                <span className="pl-3">
                  <Icons.ArrowDown size={14} />
                </span>
              </span>
            </button>
            <AddPopup showPopup={showAddPopup} handleClose={handleCloseAddPopup} />
          </div>
          <StatefulTooltip
            placement={PLACEMENT.bottom}
            showArrow={true}
            accessibilityType={"tooltip"}
            content={"Restore"}
          >
            <Block
              className={clsx(classes.resetBtn, "pointer")}
              onClick={() => {
                // function is called twice because there will be shomehow 1 element left in undo
                resetHandler()
                resetHandler()
              }}
            >
              <Icons.Save size={26} />
            </Block>
          </StatefulTooltip>
          <Block
            className="flex-center pointer p-relative resizeCanvasBtn"
            onMouseOver={() => {
              setCanvasResizePopup(true)
            }}
          >
            <Icons.CanvasResize size={24} />
            <ResizeCanvasPopup show={showCanvasResizePopup} />
          </Block>
        </Block>
      </Block>
      <div className="flex-1"></div>
      <Block className="d-flex justify-content-end align-items-center mr-1 pointer">
        <CanvasEditingPannel />
        {/* <StatefulTooltip placement={PLACEMENT.bottom} showArrow={true} accessibilityType={"tooltip"} content="Share">
          <Block className={clsx(classes.canvasOptions, "pointer")}>
            <Icons.Share size={16} />
          </Block>
        </StatefulTooltip> */}
        <Block className={"p-relative downloadResultBtn"}>
          <button className={classes.basePannelBtn}>Download</button>
          <DownloadPopup />
        </Block>
      </Block>
    </Block>
  )
}

export default BasePannel
