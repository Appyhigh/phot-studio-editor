import React, { useState } from "react"
import { useStyletron } from "baseui"
import { Block } from "baseui/block"
import Scrollable from "~/components/Scrollable"
import { images } from "~/constants/mock-data"
import { useEditor } from "@layerhub-io/react"
import Uploads from "./Uploads"
import SwiperWrapper from "./Swiper/Swiper"
import { BgOptions } from "~/views/DesignEditor/utils/BgOptions"

const Images = () => {
  const editor = useEditor()
  const [trySampleImgShow, setTrySampleImgShow] = useState(true)
  const [showBgOptions, setShowBgOptions] = useState(false)

  const addObject = React.useCallback(
    (url: string) => {
      if (editor) {
        const options = {
          type: "StaticImage",
          src: url,
          preview: url,
          metadata: { generationDate: new Date().getTime() },
        }
        editor.objects.add(options)
      }
    },
    [editor]
  )
  const handleCloseSampleImg = () => {
    setTrySampleImgShow(!trySampleImgShow)
  }

  const handleCloseBgOptions = () => {
    setShowBgOptions(!showBgOptions)
  }

  return (
    <Block $style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Uploads handleCloseSampleImg={handleCloseSampleImg} handleCloseBgOptions={handleCloseBgOptions} />
      {trySampleImgShow && (
        <>
          {" "}
          <Block
            padding="0 20px"
            marginBottom="1.5rem"
            $style={{
              display: "flex",
              alignItems: "center",
              fontWeight: 600,
              fontSize: "16px",
              marginLeft: "10px",
              justifyContent: "flex-start",
            }}
          >
            Try Sample Images
          </Block>
          <Scrollable>
            <Block padding="0 1.5rem">
              <div style={{ display: "grid", gap: "8px", gridTemplateColumns: "1fr 1fr 1fr" }}>
                {images.map((image, index) => {
                  return (
                    <ImageItem
                      key={index}
                      onClick={() => {
                        addObject(image.src.medium)
                      }}
                      preview={image.src.small}
                    />
                  )
                })}
              </div>
            </Block>
          </Scrollable>
        </>
      )}

      {showBgOptions && (
        <Scrollable>
          <Block className="mt-4">
            <div
              style={{ margin: "0px 20px", border: "1px solid #F1F1F5", borderRadius: "4px" }}
              className="d-flex  flex-row"
            >
              <div
                style={{
                  width: "50%",
                  textAlign: "center",
                  padding: "11px 0px",
                  background: "#171725",
                  color: "#fff",
                  borderRadius: "4px 0px 0px 4px",
                }}
              >
                Backgrounds
              </div>
              <div
                style={{
                  width: "50%",
                  textAlign: "center",
                  padding: "11px 0px",
                  color: "#696974",
                  borderRadius: "0px 4px 4px 0px",
                }}
              >
                Upload
              </div>
            </div>

            {BgOptions.map((each, index) => (
              <>
                <Block
                  key={index}
                  padding="0 20px"
                  $style={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 600,
                    fontSize: "16px",
                    margin: "20px 0px 14px 0px",
                    justifyContent: "flex-start",
                  }}
                >
                  {each.heading}
                </Block>
                <SwiperWrapper data={each.options} />
              </>
            ))}
          </Block>
        </Scrollable>
      )}
    </Block>
  )
}

const ImageItem = ({ preview, onClick }: { preview: any; onClick?: (option: any) => void }) => {
  const [css] = useStyletron()
  return (
    <div
      onClick={onClick}
      className={css({
        position: "relative",
        background: "#f8f8fb",
        cursor: "pointer",
        borderRadius: "8px",
        overflow: "hidden",
        "::before:hover": {
          opacity: 1,
        },
      })}
    >
      <div
        className={css({
          backgroundImage: `linear-gradient(to bottom,
          rgba(0, 0, 0, 0) 0,
          rgba(0, 0, 0, 0.006) 8.1%,
          rgba(0, 0, 0, 0.022) 15.5%,
          rgba(0, 0, 0, 0.047) 22.5%,
          rgba(0, 0, 0, 0.079) 29%,
          rgba(0, 0, 0, 0.117) 35.3%,
          rgba(0, 0, 0, 0.158) 41.2%,
          rgba(0, 0, 0, 0.203) 47.1%,
          rgba(0, 0, 0, 0.247) 52.9%,
          rgba(0, 0, 0, 0.292) 58.8%,
          rgba(0, 0, 0, 0.333) 64.7%,
          rgba(0, 0, 0, 0.371) 71%,
          rgba(0, 0, 0, 0.403) 77.5%,
          rgba(0, 0, 0, 0.428) 84.5%,
          rgba(0, 0, 0, 0.444) 91.9%,
          rgba(0, 0, 0, 0.45) 100%)`,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0,
          transition: "opacity 0.3s ease-in-out",
          height: "100%",
          width: "100%",
          ":hover": {
            opacity: 1,
          },
        })}
      />
      <img
        src={preview}
        className={css({
          width: "100%",
          height: "100%",
          objectFit: "contain",
          pointerEvents: "none",
          verticalAlign: "middle",
        })}
      />
    </div>
  )
}

export default Images
