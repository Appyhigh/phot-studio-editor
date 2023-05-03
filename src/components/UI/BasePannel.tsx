import { Theme, styled, useStyletron } from "baseui"
import { Block } from "baseui/block"
import Icons from "../Icons"
import { StatefulTooltip } from "baseui/tooltip"
import { PLACEMENT } from "baseui/toast"
import { Button, KIND } from "baseui/button"
import { SIZE } from "baseui/input"
import { ParagraphXSmall } from "baseui/typography"

const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  height: "55px",
  background: $theme.colors.white,
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  boxShadow: "inset 0px -1px 0px #E2E2EA",
  padding: "15px 20px",
}))

const TextBlock = styled<"p", {}, Theme>("p", ({ $theme }) => ({
  color: $theme.colors.accent,
  margin: "0px 25px 0px 6px",
}))

const BasePannel = () => {
  const [css, theme] = useStyletron()

  return (
    <Container>
      <Block className="d-flex justify-content-start align-items-center">
        <Block className="flex-center">
          <Icons.UploadBaseIcon size={24} />
          <ParagraphXSmall>
            <TextBlock> Upload Images</TextBlock>
          </ParagraphXSmall>
        </Block>
        <Block className="flex-center">
          <Icons.StockImg size={24} />
          <ParagraphXSmall>
            <TextBlock> Stock Images</TextBlock>
          </ParagraphXSmall>
        </Block>
        <Block className="flex-center">
          <Icons.TextIcon size={24} />
          <ParagraphXSmall>
            <TextBlock> Add Text</TextBlock>
          </ParagraphXSmall>
        </Block>
        <Block className="flex-center">
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
        </Block>
      </Block>
      <div className="flex-1"></div>
      <Block className="d-flex justify-content-end align-items-center mr-1 pointer">
        <StatefulTooltip placement={PLACEMENT.bottom} showArrow={true} accessibilityType={"tooltip"} content="Share">
          <Button kind={KIND.tertiary} size={SIZE.compact}>
            <Icons.Share size={16} />
          </Button>
        </StatefulTooltip>
        <Button
          kind={KIND.secondary}
          style={{ height: "38px" }}
          className={css({
            backgroundColor: theme.colors.accent,
            color: theme.colors.white,
          })}
        >
          <ParagraphXSmall> Download</ParagraphXSmall>
        </Button>
      </Block>
    </Container>
  )
}

export default BasePannel
