import { Theme, styled } from "baseui"
import Icons from "~/components/Icons"
const Box = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  borderRadius: "8px",
  width: "319px",
  margin: "0px auto 0px",
}))

const Button = styled<"button", {}, Theme>("button", ({ $theme }) => ({
  width: "319px",
  height: "52px",
  textAlign: "center",
  color: "#92929D;",
  fontWeight: 500,
  fontSize: "18px",
  background: "#F1F1F5",
  border: "1px solid transparent",
  borderRadius: "8px",
  marginTop: "20px",
  fontFamily: "Rubik",
}))

const UploadPreview = ({ upload, selectedImage, discardHandler }: any) => {
  return (
    <div>
        <Icons.InputContainer size={"320px"} />

      <Box className={"flex-center flex-column "}>
        <img
          style={{ position: "absolute", top: "90px", width: "140px", height: "140px", borderRadius: "4px" }}
          src={upload.preview ? upload.preview : upload.url}
          alt="preview"
        />

        {selectedImage === upload.preview && (
          <div style={{ position: "absolute", top: "70px", right: "38px" }}>
            <span onClick={discardHandler}>
              <Icons.Trash size={"32"} />
            </span>
          </div>
        )}
      </Box>
      {selectedImage === upload.preview && (
        <div>
          <div>
            <Button>Remove Background</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UploadPreview
