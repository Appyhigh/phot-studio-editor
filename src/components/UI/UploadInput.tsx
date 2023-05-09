import { Theme, styled } from "baseui"
import { Block } from "baseui/block"
import Icons from "~/components/Icons"
const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  borderRadius: "8px",
  width: "319px",
  margin: "14px auto 26px",
}))
const UploadInput = ({ handleInputFileRefClick }: any) => {
  return (
    <>
      <Container
        className={"d-flex justify-content-center flex-column pointer p-relative"}
        onClick={handleInputFileRefClick}
      >
        <Icons.InputContainer size={"320px"} />

        <Block className="d-flex flex-column p-absolute" style={{width:"100%"}}>
          <div style={{ margin: "10px auto 10px" }}>
            <Icons.Upload size={31} />
          </div>{" "}
          <div className={"text-center"} style={{ fontSize: "14px", color: "#696974", fontFamily: "Rubik" }}>
            Drag and drop your image or
            <br />
            <span style={{ color: " #6729F3", marginTop: "4px" }}>click to browse</span>
            <p
              style={{
                width: "80%",
                textAlign: "center",
                borderBottom: "1px solid #92929D",
                lineHeight: "0.1em",
                margin: "16px auto 20px",
                opacity: "0.5",
                padding:"0px 10px",
              }}
            >
              <span style={{ background: "#fff", color: "#92929D", padding: "3px 10px 0px" }}>Or</span>
            </p>
          </div>
          <Block className="d-flex flex-row justify-content-center">
            <div style={{margin:"0px 8px"}}>
              <Icons.GoogleDrive size={"48"} />
            </div>
            <div style={{margin:"0px 8px"}}>
              <Icons.GooglePhotos size={"48"} />
            </div>
            <div style={{margin:"0px 8px"}}>
              {" "}
              <Icons.DropBox size="48" />
            </div>
            <div style={{margin:"0px 8px"}}>
              {" "}
              <Icons.Phone size="48" />
            </div>
          </Block>
        </Block>
      </Container>
    </>
  )
}

export default UploadInput
