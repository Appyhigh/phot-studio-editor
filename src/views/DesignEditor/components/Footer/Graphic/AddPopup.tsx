import { Theme, styled, useStyletron } from "baseui"
import { Block } from "baseui/block"
import { LabelXSmall, ParagraphSmall, ParagraphXSmall } from "baseui/typography"

const Box = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  width: "262px",
  border: "1px solid #F1F1F5",
  background: $theme.colors.white,
  zIndex: 500,
  height: "auto-fit",
  borderRadius: "10px",
}))

const HorizontalLine = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  width: "220px",
  border: "1px solid #F1F1F5",
  background: $theme.colors.white,
  zIndex: 500,
  marginLeft: "20px",
}))

const AddPopup = () => {
  const [css, theme] = useStyletron()

  return (
    <Block className="addPopup">
      <Box className="d-flex justify-flex-start align-items-start p-absolute flex-column">
        <Block style={{ padding: "20px 10px 16px 24px" }}>
          <ParagraphSmall>
            <span style={{ paddingBottom: "4px" }}>Image</span>{" "}
          </ParagraphSmall>

          <LabelXSmall>
            <span className={css({ color: theme.colors.borderAccent })}>
              Lorem ipsum dolor sit amet consecte. Pulvinar vitae sit
            </span>
          </LabelXSmall>
        </Block>
        <HorizontalLine />
        <Block style={{ padding: "20px 10px 16px 24px" }}>
          <ParagraphSmall>
            <span style={{ paddingBottom: "4px" }}>Video</span>
          </ParagraphSmall>
          <LabelXSmall>
            <span className={css({ color: theme.colors.borderAccent })}>
              Lorem ipsum dolor sit amet consecte. Pulvinar vitae sit
            </span>
          </LabelXSmall>
        </Block>
        <HorizontalLine />{" "}
        <Block style={{ padding: "20px 10px 16px 24px" }}>
          <ParagraphSmall>
            <span style={{ paddingBottom: "4px" }}>Text</span>
          </ParagraphSmall>
          <LabelXSmall>
            <span className={css({ color: theme.colors.borderAccent })}>
              Lorem ipsum dolor sit amet consecte. Pulvinar vitae sit
            </span>
          </LabelXSmall>
        </Block>
        <HorizontalLine />
        <Block style={{ padding: "20px 10px 16px 24px" }}>
          <ParagraphSmall>
            <span style={{ paddingBottom: "4px" }}>Background</span>
          </ParagraphSmall>
          <LabelXSmall>
            <span className={css({ color: theme.colors.borderAccent })}>
              Lorem ipsum dolor sit amet consecte. Pulvinar vitae sit
            </span>
          </LabelXSmall>
        </Block>
      </Box>
    </Block>
  )
}

export default AddPopup
