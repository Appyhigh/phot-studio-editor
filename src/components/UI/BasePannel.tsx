import { Theme, styled } from "baseui"
import { Block } from "baseui/block"
import Icons from "../Icons"
import { StatefulTooltip } from "baseui/tooltip"
import { PLACEMENT } from "baseui/toast"
import { Button, KIND } from "baseui/button"
import { SIZE } from "baseui/input"
import ResizeCanvasPopup from "~/views/DesignEditor/components/Footer/Graphic/ResizeCanvasPopup"
import DownloadPopup from "~/views/DesignEditor/components/Footer/Graphic/DownloadPopup"
import BaseBtn from "./Common/BaseBtn"
import CanvasEditingPannel from "~/views/DesignEditor/components/Footer/Graphic/CanvasEditingPannel"
import { useEditor } from "@layerhub-io/react"
const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  height: "55px",
  background: $theme.colors.white,
  boxShadow: "inset 0px -1px 0px #E2E2EA",
  padding: "15px 20px",
}))

const BasePannel = () => {
  const editor = useEditor()
  const resetHandler = () => {
    editor.objects.clear()
    editor.history.reset()
    editor.history.save()
  }
  return (
    <Container className="d-flex align-items-center flex-row">
      <Block className="d-flex justify-content-start align-items-center">
        <Block className="flex-center">
          <BaseBtn bgColor="#6729F3" title={"Add"} txtColor="#fff" padding="15px" fontSize={"14"}>
            <Block className="d-flex align-items-center">
              <Block className="pr-1">
                <Icons.Plus size={16} />
              </Block>
              Add
              <Block className="pl-3">
                <Icons.ArrowDown size={14} />
              </Block>
            </Block>
          </BaseBtn>
          <StatefulTooltip
            placement={PLACEMENT.bottom}
            showArrow={true}
            accessibilityType={"tooltip"}
            content={"Restore"}
          >
            <Button
              kind={KIND.tertiary}
              size={SIZE.compact}
              style={{ margin: "10px 15px" }}
              onClick={() => {
                // function is called twice because there will be shomehow 1 element left in undo
                resetHandler()
                resetHandler()
              }}
            >
              <Icons.Save size={26} />
            </Button>
          </StatefulTooltip>
          <Block className="flex-center pointer p-relative resizeCanvasBtn">
            <Icons.CanvasResize size={24} />
            <ResizeCanvasPopup />
          </Block>
        </Block>
      </Block>
      <div className="flex-1"></div>
      <Block className="d-flex justify-content-end align-items-center mr-1 pointer">
        <CanvasEditingPannel />

        <StatefulTooltip placement={PLACEMENT.bottom} showArrow={true} accessibilityType={"tooltip"} content="Share">
          <Button kind={KIND.tertiary} size={SIZE.compact}>
            <Icons.Share size={16} />
          </Button>
        </StatefulTooltip>
        <div className={"p-relative downloadResultBtn"}>
          <BaseBtn txtColor={"#fff"} bgColor={"#6729F3"} title={"Download"} />
          <DownloadPopup />
        </div>
      </Block>
    </Container>
  )
}

export default BasePannel
