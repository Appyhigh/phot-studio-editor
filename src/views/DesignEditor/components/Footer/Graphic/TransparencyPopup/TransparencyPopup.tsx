import { Block } from "baseui/block"
import { useEditor, useObjects } from "@layerhub-io/react"
import { useState } from "react"
import Icons from "~/components/Icons"
import classes from "./style.module.css"
import clsx from "clsx"
import { Slider } from "baseui/slider"

const TransparencyPopup = ({ showPopup }: any) => {
  const objects: any = useObjects()
  const editor = useEditor()
  const [transparency, setTransparency] = useState(0)

  const handleChange = (e: any) => {
    setTransparency(e)
    objects.map((each: any) => {
      // console.log("OBJECT", objects)
      editor.objects.update({ opacity: 1 - e / 100 }, each.id)
      // editor.canvas.canvas.overlayColor = "#fa6667"
      // editor.frame.options.opacity = 0.5
      // console.log("FRAME", editor.frame.background)
      // editor.canvas.canvas.renderAll.bind(editor.canvas.canvas)()

      // editor.frame.setBackgroundColor("rgba(255,255,255,0.5)")
      // editor.frame.setBackgroundColor("") editor.frame.renderAll.bind(canvas))
    })
  }

  return (
    <Block style={{ display: showPopup ? "block" : "none" }}>
      <Block className={"resizeCanvas"} style={{ minWidth: "200px" }}>
        <div className={clsx(classes.resizeCanvasContainer, "d-flex align-items-start flex-column p-absolute ")}>
          <div className={clsx(classes.chevronTopIcon, "p-absolute")}>
            <Icons.SliderBtn size={106} width="10" />
          </div>
          <div className={classes.subSection}>
            <div className={clsx(classes.subHeading, "pt-1 pb-1")}>Transparency</div>
            <Slider
              overrides={{
                InnerThumb: () => null,
                ThumbValue: () => null,
                TickBar: () => null,
                Root: {
                  style: ({ $theme }) => {
                    return {
                      width: "135px",
                      marginLeft: "8px",
                      marginRight: "8px",
                      [$theme.mediaQuery.large]: {
                        width: "210px",
                      },
                    }
                  },
                },
                Thumb: {
                  style: {
                    height: "20px",
                    width: "20px",
                    paddingLeft: 0,
                    backgroundColor: "#44444F",
                  },
                },
                Track: {
                  style: {
                    paddingLeft: 0,
                    paddingRight: 0,
                  },
                },
                InnerTrack: {
                  style: {
                    height: "4px",
                  },
                },
              }}
              min={0}
              max={100}
              value={[transparency]}
              onChange={(e) => handleChange(e.value[0])}
            />
          </div>
        </div>
      </Block>
    </Block>
  )
}

export default TransparencyPopup
