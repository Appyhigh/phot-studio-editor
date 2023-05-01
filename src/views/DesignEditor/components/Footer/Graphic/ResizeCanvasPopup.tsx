import { Input } from "baseui/input"
import classes from "./style.module.css"
import { Padding } from "baseui/popover/styled-components"
import { Block } from "baseui/block"

const ResizeCanvasPopup = ({ showResizeCanvas }: any) => {
  return (
    <div className={classes.resizeCanvas}>
      <div
        style={{
          height: "342px",
          width: "251px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
          alignItems: "start",
          border: "1px solid #F1F1F5",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
          borderRadius: "4px",
          position: "absolute",
          zIndex: 500,
          fontFamily: "Rubik",
          left: "-40px",
        }}
      >
        <div style={{ margin: "4px 16px" }}>
          <p style={{ fontSize: "12px", color: "#000" }}>Fixed Size</p>
          <div style={{ display: "flex", justifyContent: "center", flexDirection: "row", color: "#92929D" }}>
            <Block
              $style={{
                width: "40px",
                height: "40px",
                border: "1.5px solid #92929D",
                borderRadius: "4px",
                margin: "0px 6px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ":hover": {
                  color: "#000",
                  cursor: "pointer",
                  border: "1.5px solid #000",
                },
              }}
            >
              <p>1:1</p>
            </Block>
            <Block
              $style={{
                width: "40px",
                height: "48px",
                border: "1.5px solid #92929D",
                borderRadius: "4px",
                margin: "0px 6px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ":hover": {
                  color: "#000",
                  cursor: "pointer",
                  border: "1.5px solid #000",
                },
              }}
            >
              <p>4:5</p>
            </Block>{" "}
            <Block
              $style={{
                width: "60px",
                height: "32px",
                border: "1.5px solid #92929D",
                borderRadius: "4px",
                margin: "0px 6px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ":hover": {
                  color: "#000",
                  cursor: "pointer",
                  border: "1.5px solid #000",
                },
              }}
            >
              <p>16:9</p>
            </Block>
            <Block
              $style={{
                width: "30px",
                height: "50px",
                border: "1.5px solid #92929D",
                borderRadius: "4px",
                margin: "0px 6px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ":hover": {
                  color: "#000",
                  cursor: "pointer",
                  border: "1.5px solid #000",
                },
              }}
            >
              <p>1:2</p>
            </Block>
          </div>
        </div>
        <div style={{ border: "1px solid #F1F1F5", width: "100%", marginTop: "12px" }}></div>
        <div style={{ margin: "4px 16px" }}>
          <p style={{ fontSize: "12px", color: "#000" }}>Custom Size</p>
          <div style={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>
            <Input
              type="number"
              placeholder="width"
              overrides={{
                Input: {
                  style: {
                    backgroundColor: "#ffffff",
                    textAlign: "center",
                    paddingLeft: 0,
                    paddingRight: 0,
                  },
                },
                Root: {
                  style: {
                    border: "1px solid #92929D",
                    height: "32px",
                    width: "86px",
                    borderRadius: "4px",
                    marginRight: "6px",
                  },
                },
              }}
            />{" "}
            <Input
              type="number"
              placeholder="height"
              overrides={{
                Input: {
                  style: {
                    backgroundColor: "#ffffff",
                    textAlign: "center",
                    paddingLeft: 0,
                    paddingRight: 0,
                  },
                },
                Root: {
                  style: {
                    border: "1px solid #92929D",
                    height: "32px",
                    width: "86px",
                    borderRadius: "4px",
                    marginLeft: "6px",
                  },
                },
              }}
            />
          </div>
        </div>
        <div style={{ border: "1px solid #F1F1F5", width: "100%", marginTop: "12px" }}></div>

        <div style={{ margin: "4px 16px" }}>
          <p style={{ fontSize: "12px", color: "#000" }}>Others</p>
          <div
            className={classes.sizeSelectionInput}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              fontSize: "11px",
              color: "#44444F",
            }}
          >
            <label style={{ display: "flex", alignItems: "center" }}>
              <input type="checkbox" name="option" value="Video (1920 x 1080 px)" /> Video{" "}
              <span style={{ color: "#92929D",marginLeft:"3px" }}> (1920 x 1080 px)</span>
            </label>
            <label style={{ display: "flex", alignItems: "center" }}>
              <input type="checkbox" name="option" value="Facebook Post (940 x 788 px)" /> Facebook Post{" "}
              <span style={{ color: "#92929D",marginLeft:"3px" }}> (940 x 788 px)</span>{" "}
            </label>
            <label style={{ display: "flex", alignItems: "center" }}>
              <input type="checkbox" name="option" value="Facebook Cover (1640 x 924 px)" /> Facebook Cover{" "}
              <span style={{ color: "#92929D" ,marginLeft:"3px"}}> (1640 x 924 px)</span>
            </label>{" "}
            <label style={{ display: "flex", alignItems: "center" }}>
              <input type="checkbox" name="option" value="Logo (500 x 500 px)" /> Logo{" "}
              <span style={{ color: "#92929D",marginLeft:"3px" }}> (500 x 500 px)</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResizeCanvasPopup
