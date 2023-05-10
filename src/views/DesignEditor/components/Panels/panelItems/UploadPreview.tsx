import { Theme, styled, useStyletron } from "baseui"
import { Block } from "baseui/block"
import Icons from "~/components/Icons"
const Box = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  borderRadius: "8px",
  width: "280px",
  [$theme.mediaQuery.large]: {
    width: "319px",
  },
}))

const Button = styled<"button", {}, Theme>("button", ({ $theme }) => ({
  width: "270px",
  height: "52px",
  textAlign: "center",
  color: $theme.colors.white,
  fontWeight: 500,
  fontSize: $theme.sizing.scale650,
  // @ts-ignore
  background: $theme.colors.accent,
  border: "1px solid transparent",
  borderRadius: "8px",
  marginTop: "6px",
  [$theme.mediaQuery.large]: {
    width: "319px",
    marginTop: "20px",
  },
}))

const UploadPreview = ({ upload, selectedImage, discardHandler }: any) => {
  const [css, theme] = useStyletron()

  return (
    <div>
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

      <Box className={"flex-center flex-column "}>
        <img
          className="p-absolute"
          style={{ top: "90px", width: "140px", height: "140px", borderRadius: "4px" }}
          src={upload.preview ? upload.preview : upload.url}
          alt="preview"
        />

        {selectedImage === upload.preview && (
          <Block className="p-absolute"
          $style={{
            top:"74px",right:"20px",
            [theme.mediaQuery.large]:{
              top: "70px", right: "38px" 
            }
          }}
          >
            <span onClick={discardHandler}>
              <Icons.Trash size={"32"} />
            </span>
          </Block>
        )}
      </Box>
      {selectedImage === upload.preview && <Button>Remove Background</Button>}
    </div>
  )
}

export default UploadPreview
