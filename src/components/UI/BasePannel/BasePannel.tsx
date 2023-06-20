import { Block } from "baseui/block"
import Icons from "../../Icons"
import { StatefulTooltip } from "baseui/tooltip"
import { PLACEMENT } from "baseui/toast"
import ResizeCanvasPopup from "~/views/DesignEditor/components/Footer/Graphic/ResizeCanvasPopup/ResizeCanvasPopup"
import DownloadPopup from "~/views/DesignEditor/components/Footer/Graphic/DownloadPopup/DownloadPopup"
import CanvasEditingPannel from "~/views/DesignEditor/components/Footer/Graphic/CanvasEditingPannel/CanvasEditingPannel"
import { useEditor, useObjects } from "@layerhub-io/react"
import AddPopup from "~/views/DesignEditor/components/Footer/Graphic/AddPopup/AddPopup"
import { useEffect, useState } from "react"
import classes from "./style.module.css"
import clsx from "clsx"
import { backgroundLayerType, checkboxBGUrl } from "~/constants/contants"
import BaseButton from "../Button/BaseButton"

const BasePannel = () => {
  const editor = useEditor()
  const [showAddPopup, setShowAddPopup] = useState(false)
  const objects = useObjects()

  const [showTooltip, setShowToolTip] = useState(false)

  const resetHandler = () => {
    // editor.objects.clear()

    //  @ts-ignore
    objects.map((x) => {
      if (x.type !== "BackgroundImage" || x?.metadata?.type != backgroundLayerType) editor.objects.removeById(x.id)
    })

    editor.history.reset()
    editor.history.save()
    const bgImageIndex = editor?.frame?.background?.canvas?._objects.findIndex(
      (el: any) => el.type === "BackgroundImage" || el?.metadata?.type === backgroundLayerType
    )
    if (bgImageIndex == -1) {
      const options = {
        type: "BackgroundImage",
        src: checkboxBGUrl,
        preview: checkboxBGUrl,
        metadata: { generationDate: new Date().getTime(), type: backgroundLayerType },
      }
      editor.frame.setBackgroundColor("#ffff")
      editor.objects.add(options).then(() => {
        editor.objects.setAsBackgroundImage()
      })
    }
  }

  const downloadBtnDisable =
    (editor?.frame?.background?.canvas?._objects?.length === 3 &&
      editor?.frame?.background?.canvas?._objects[2]?.metadata?.type === backgroundLayerType) ||
    (editor?.frame?.background?.canvas?._objects?.length === 2 &&
      editor?.frame?.background?.canvas?._objects[1]?.fill==="#ffffff")

  const handleCloseAddPopup = () => {
    setShowAddPopup(false)
  }
  //  time out auto save tooltip
  // @ts-ignore
  let timeoutId

  useEffect(() => {
    const handleHistoryChanged = () => {
      // @ts-ignore
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setShowToolTip(true)
      }, 5000)
    }
    if (editor) {
      editor.on("history:changed", handleHistoryChanged)
    }
    return () => {
      // @ts-ignore
      clearTimeout(timeoutId)
    }
  }, [editor])

  useEffect(() => {
    if (showTooltip) {
      setTimeout(() => {
        setShowToolTip(false)
      }, 2000)
    }
  }, [showTooltip])

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
          <div></div>
          {!showTooltip && (
            <>
              <Block
                className={clsx(classes.resetBtn, "pointer")}
                onClick={() => {
                  setShowToolTip(true)
                }}
              >
                <Icons.Save size={26} />
              </Block>
            </>
          )}
          {showTooltip && (
            <Block className={clsx(classes.resetBtn, "pointer relative")}>
              <Icons.Save size={26} />
              <div className={classes.toolTip}>
                <div className="p-relative">
                  <Icons.ToolTip />
                  <p className={classes.toolTipText}>All changes are saved</p>
                </div>
              </div>
            </Block>
          )}

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
          <BaseButton
            title="Download"
            disabled={downloadBtnDisable ? true : false}
            fontSize="14px"
            padding="15px"
            marginLeft="12px"
            borderRadius="10px"
            fontFamily="poppins"
            height="38px"
            width="120px"
            // className={clsx(classes.basePannelBtn, downloadBtnDisable && classes.disabledDownloadBtn)}
          />
            
          
          {!downloadBtnDisable && <DownloadPopup />}
        </Block>
      </Block>
    </Block>
  )
}

export default BasePannel
