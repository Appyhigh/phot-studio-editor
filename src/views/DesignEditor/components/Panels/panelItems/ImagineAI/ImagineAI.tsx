import { Block } from "baseui/block"
import { useContext, useEffect, useRef, useState } from "react"
import Scrollable from "~/components/Scrollable"
import TextToArtContext from "~/contexts/TextToArtContext"

import classes from "./style.module.css"
import ArrowOpen from "~/components/Icons/ArrowOpen"
import SelectStyle from "~/components/UI/SelectStyle/SelectStyle"
import StyleSwiper from "~/components/UI/SelectStyle/StyleSwiper"

const ImagineAI = () => {
  const { textToArtInputInfo, setTextToArtInputInfo } = useContext(TextToArtContext)
  const { styleImage, setStyleImage } = useContext(TextToArtContext)
  const [selectStyleDisplay, setSelectStyleDisplay] = useState(false)
  const selectStyleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectStyleRef.current && !selectStyleRef.current.contains(event.target as Node)) {
        setSelectStyleDisplay(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <Block className="d-flex flex-1 flex-column">
      <Scrollable>
        {/* Prompt */}
        <Block className={classes.imagineItemContainer}>
          <Block className={classes.imagineItemHeading}>Prompt</Block>
          <Block className={classes.imagineItemDesc}>
            What do you want to see, you can use a single word or complete sentence.
          </Block>
          <textarea
            className={classes.promptInput}
            placeholder="Oil painting, fantasy, fantasy style, japanese female wearing a blue kimono holding a katana"
            onChange={(e) => {
              setTextToArtInputInfo({ ...textToArtInputInfo, prompt: e.target.value })
            }}
          ></textarea>
        </Block>
        {/* Select a Style */}
        <Block className={classes.imagineItemContainer}>
          <Block className={classes.imagineItemHeading}>Select a Style</Block>
          <button className={classes.selectStyleInput} onClick={() => setSelectStyleDisplay(true)}>
            Select style
            <ArrowOpen size={14} />
          </button>
          <StyleSwiper
            styleImage={styleImage}
            setStyleImage={setStyleImage}
            textToArtInputInfo={textToArtInputInfo}
            setTextToArtInputInfo={setTextToArtInputInfo}
          />
        </Block>
      </Scrollable>
      {/* Select a Style popup */}
      {selectStyleDisplay && (
        <div ref={selectStyleRef}>
          <SelectStyle />
        </div>
      )}
    </Block>
  )
}

export default ImagineAI
