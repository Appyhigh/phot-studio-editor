import { Block } from "baseui/block"
import { useContext, useEffect } from "react"
import TextToArtContext from "~/contexts/TextToArtContext"

const ImagineAI = () => {
  const { textToArtInputInfo, textToArtpanelInfo } = useContext(TextToArtContext)

  return (
    <Block className="d-flex flex-1 flex-column">
      <Block
        className="d-flex align-items-center justify-content-between p-3"
        $style={{
          fontWeight: 500,
        }}
      >
        <Block>Imagine AI</Block>
      </Block>
    </Block>
  )
}

export default ImagineAI
