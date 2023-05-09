import { Theme, styled } from "baseui"
import { Block } from "baseui/block"
import Icons from "~/components/Icons"
const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  borderRadius: "8px",
  width: "319px",
  margin: "14px auto 26px",
  border: "1px dashed #6729F3",
}))
const UploadInput = ({ handleInputFileRefClick }: any) => {
  return (
    <>
      <Container className={"d-flex justify-content-center flex-column pointer"} onClick={handleInputFileRefClick}>
        <Block style={{ margin: "16px 26px" }} className="d-flex flex-column">
          <div style={{ margin: "10px auto 10px" }}>
            <Icons.Upload size={31} />
          </div>{" "}
          <div className={"text-center"} style={{ fontSize: "14px", color: "#696974", fontFamily: "Rubik" }}>
            Drag and drop your image or
            <br />
            <span style={{ color: " #6729F3", marginTop: "4px" }}>click to browse</span>
            <p
              style={{
                width: "100%",
                textAlign: "center",
                borderBottom: "1px solid #92929D",
                lineHeight: "0.1em",
                margin: "16px 0 20px",
                opacity: "0.5",
                fontSize: "12px",
              }}
            >
              <span style={{ background: "#fff", color: "#92929D", padding: "0 10px" }}>Or</span>
            </p>
          </div>
        </Block>
      </Container>
    </>
  )
}

export default UploadInput
