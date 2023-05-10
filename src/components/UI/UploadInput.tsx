import { Theme, styled, useStyletron } from "baseui"
import { Block } from "baseui/block"
import Icons from "~/components/Icons"
import GooglePhotos from "../../views/Public/images/google-photos.svg";
const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  borderRadius: "8px",
  margin: "0px auto 8px",
  width: "280px",
  [$theme.mediaQuery.large]: {
    width: "319px",
    margin: "14px auto 26px",
  },
}))

const LineWithText = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  borderBottom: `1px solid ${$theme.colors.borderAccent}`,
  lineHeight: "0.1em",
  margin: "16px auto 20px",
  opacity: "0.5",
  padding: "0px 10px",
}))

const IconWrapper = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  margin: "0px 8px",
  width: "32px",
  height: "32px",
  position: "relative",
  [$theme.mediaQuery.large]: {
    width: "48px",
    height: "48px",
  },
}))

const UploadInput = ({ handleInputFileRefClick }: any) => {
  const [css, theme] = useStyletron()

  return (
    <>
      <Container
        className={"d-flex justify-content-center flex-column pointer p-relative"}
        onClick={handleInputFileRefClick}
      >
        <Block
          $style={{
            width: "280px",
            height: "200px",
            position: "relative",
            [theme.mediaQuery.large]: {
              width: "320px",
              height: "200px",
            },
          }}
        >
          <Icons.InputContainer />
        </Block>

        <Block className="d-flex flex-column p-absolute w-100">
          <div style={{ margin: "10px auto 10px" }}>
            <Icons.Upload size={31} />
          </div>
          <div className={"text-center"} style={{ fontSize: "14px", color: "#696974" }}>
            Drag and drop your image or
            <p style={{ color: " #6729F3", marginTop: "4px" }}>click to browse</p>
            <LineWithText className="text-center w-80">
              <span
                className={css({ background: theme.colors.white, color: theme.colors.borderAccent })}
                style={{ padding: "3px 10px 0px" }}
              >
                Or
              </span>
            </LineWithText>
          </div>
          <Block className="d-flex flex-row justify-content-center">
            <IconWrapper>
              <Icons.GoogleDrive />
            </IconWrapper>
            <IconWrapper >
              
              <img src={GooglePhotos}/>
            </IconWrapper>
            <IconWrapper>
              <Icons.DropBox />
            </IconWrapper>
            <IconWrapper>
              <Icons.Phone />
            </IconWrapper>
          </Block>
        </Block>
      </Container>
    </>
  )
}

export default UploadInput
