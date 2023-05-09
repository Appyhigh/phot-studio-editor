import { Theme, styled, useStyletron } from "baseui"
import { Block } from "baseui/block"
import { LabelXSmall, ParagraphSmall, ParagraphXSmall } from "baseui/typography"
import Icons from "~/components/Icons"

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
      <Block className="addPopupCon">
        <Box
          className="d-flex justify-flex-start align-items-start p-absolute flex-column mt-4"
        >
          <div className="p-absolute" style={{ rotate: "-90deg", top: "-60px", left: "70px" }}>
            <Icons.SliderBtn size={106} width="10" />
          </div>
          <Block style={{ padding: "22px 10px 16px 24px" }}>
            <ParagraphSmall>
              <span className="pb-1">Image</span>{" "}
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
              <span className="pb-1">Video</span>
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
              <span className="pb-1">Text</span>
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
              <span className="pb-1">Background</span>
            </ParagraphSmall>
            <LabelXSmall>
              <span className={css({ color: theme.colors.borderAccent })}>
                Lorem ipsum dolor sit amet consecte. Pulvinar vitae sit
              </span>
            </LabelXSmall>
          </Block>
        </Box>
      </Block>
    </Block>
  )
}

export default AddPopup
