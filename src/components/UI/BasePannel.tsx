import { Theme, styled, useStyletron } from "baseui"
import { Block } from "baseui/block"
import Icons from "../Icons"
import { StatefulTooltip } from "baseui/tooltip"
import { PLACEMENT } from "baseui/toast"
import { Button, KIND } from "baseui/button"
import { SIZE } from "baseui/input"
import { ParagraphXSmall } from "baseui/typography"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import useAppContext from "~/hooks/useAppContext"
import ResizeCanvasPopup from "~/views/DesignEditor/components/Footer/Graphic/ResizeCanvasPopup"
import DownloadPopup from "~/views/DesignEditor/components/Footer/Graphic/DownloadPopup"
import BaseBtn from "./Common/BaseBtn"

const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  height: "55px",
  background: $theme.colors.white,
  boxShadow: "inset 0px -1px 0px #E2E2EA",
  padding: "15px 20px",
}))

const TextBlock = styled<"p", {}, Theme>("p", ({ $theme }) => ({
  color: $theme.colors.accent,
  margin: "0px 25px 0px 6px",
}))

const BasePannel = () => {
  const [css, theme] = useStyletron()
  const { setActivePanel } = useAppContext()
  const setIsSidebarOpen = useSetIsSidebarOpen()

  return (
    <Container className="d-flex align-items-center flex-row">
      <Block className="d-flex justify-content-start align-items-center">
        <Block className="flex-center pointer">
          <Icons.UploadBaseIcon size={24} />
          <ParagraphXSmall>
            <TextBlock
              onClick={() => {
                setIsSidebarOpen(true)
                // @ts-ignore
                setActivePanel("Images")
              }}
            >
              {" "}
              Upload Images
            </TextBlock>
          </ParagraphXSmall>
        </Block>
        <Block className="flex-center pointer">
          <Icons.StockImg size={24} />
          <ParagraphXSmall>
            <TextBlock> Stock Images</TextBlock>
          </ParagraphXSmall>
        </Block>
        <Block className="flex-center pointer">
          <Icons.TextIcon size={24} />
          <ParagraphXSmall>
            <TextBlock
              onClick={() => {
                setIsSidebarOpen(true)
                // @ts-ignore
                setActivePanel("Text")
              }}
            >
              {" "}
              Add Text
            </TextBlock>
          </ParagraphXSmall>
        </Block>
        <Block className="flex-center pointer p-relative resizeCanvasBtn">
          <ParagraphXSmall
            className={css({
              color: theme.colors.backgroundSecondary,
            })}
          >
            Artboard Size
          </ParagraphXSmall>{" "}
          <Block className="ml-1 flex-center">
            <Icons.CanvasResize size={24} />
          </Block>
          <ResizeCanvasPopup />
        </Block>
      </Block>
      <div className="flex-1"></div>
      <Block className="d-flex justify-content-end align-items-center mr-1 pointer">
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
