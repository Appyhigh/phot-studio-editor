import { Block } from "baseui/block"
import { useEditor, useFrame, useObjects } from "@layerhub-io/react"
import { useEffect, useState } from "react"
import Icons from "~/components/Icons"
import classes from "./style.module.css"
import clsx from "clsx"
import { Slider } from "baseui/slider"
import ColorPicker from "~/components/UI/ColorPicker/ColorPicker"
import { backgroundLayerType, deviceUploadType } from "~/constants/contants"

const TransparencyPopup = ({ showPopup }: any) => {
  const objects: any = useObjects()
  const editor = useEditor()
  const frame = useFrame()
  const [transparency, setTransparency] = useState(0)
  const [bgColor, setBGColor] = useState("#ffffff")
  const [isOpen, setIsOpen] = useState(false)

  const openDatabase = () => {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open("Phot-Studio", 1)

      request.onerror = (event: any) => {
        console.error("IndexedDB error:", event.target.error)
        reject()
      }

      request.onsuccess = (event: any) => {
        const db = event.target.result
        resolve(db)
      }

      request.onupgradeneeded = (event: any) => {
        const db = event.target.result

        if (!db.objectStoreNames.contains("Phot-Studio-Canvas-Store")) {
          db.createObjectStore("Phot-Studio-Canvas-Store")
        }
      }
    })
  }

  const saveData = async (data: any) => {
    try {
      const db: any = await openDatabase()

      const transaction = db.transaction("Phot-Studio-Canvas-Store", "readwrite")
      const objectStore = transaction.objectStore("Phot-Studio-Canvas-Store")

      const savedTransparency = objectStore.put(data, "savedTransparency")

      savedTransparency.onerror = (event: any) => {
        console.error("IndexedDB put error:", event.target.error)
      }

      // savedTransparency.onsuccess = () => {
      //   console.log("Data stored successfully in IndexedDB")
      // }
    } catch (error) {
      console.error("Failed to save data to IndexedDB:", error)
    }
  }

  const fetchData = async () => {
    try {
      const db: any = await openDatabase()

      const transaction = db.transaction("Phot-Studio-Canvas-Store", "readonly")
      const objectStore = transaction.objectStore("Phot-Studio-Canvas-Store")

      const getSavedTransparency = objectStore.get("savedTransparency")

      getSavedTransparency.onerror = (event: any) => {
        console.error("IndexedDB get error:", event.target.error)
      }
      getSavedTransparency.onerror = (event: any) => {
        console.error("IndexedDB get error:", event.target.error)
      }

      getSavedTransparency.onsuccess = (event: any) => {
        const data = event.target.result
        setTransparency(data ?? 0)
      }
    } catch (error) {
      console.error("Failed to fetch data from IndexedDB:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const hexToRgba = (e: any) => {
    const hex = String(editor.frame.background.fill).replace("#", "")
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    const a = 1 - e / 100
    const rgba = "rgba(" + r + "," + g + "," + b + "," + a + ")"
    return rgba
  }

  const addAlpha = (e: any) => {
    const a = 1 - e / 100
    const rgbaArr = String(editor.frame.background.fill).split(",")
    rgbaArr[rgbaArr.length - 1] = a + ")"
    const newRgba = rgbaArr.join(",")
    return newRgba
  }

  const handleChange = async (e: any) => {
    setTransparency(e)
    objects.map((each: any) => {
      editor.objects.update({ opacity: 1 - e / 100 }, each.id)
      if (String(editor.frame.background.fill).includes("#")) {
        editor.frame.setBackgroundColor(hexToRgba(e))
      } else {
        editor.frame.setBackgroundColor(addAlpha(e))
      }
    })
    saveData(e.toString())
    // localStorage.setItem("transparency", e.toString())
  }

  const colors = [
    "#FF6BB2",
    "#B69DFF",
    "#30C5E5",
    "#7BB872",
    "#49A8EE",
    "#3F91A2",
    "#DA4F7A",
    "#886F65",
    "#D9D9D9",
    "#FFCFB4",
    "#E59230",
    "#FFFFFF",
  ]

  const updateObjectFill = (each: any) => {
    const bgObject = editor.frame.background.canvas._objects.filter(
      (el: any) => el.metadata?.type === backgroundLayerType
    )[0]

    const deviceObject = editor.frame.background.canvas._objects.filter(
      (el: any) => el.metadata?.type === deviceUploadType
    )[0]

    const backgroundImg = editor.frame.background.canvas._objects.filter((el: any) => el.type === "BackgroundImage")[0]

    if (bgObject) {
      editor.frame.resize({ width: frame.width, height: frame.height })
      editor.objects.remove(bgObject.id)
      editor.objects.unsetBackgroundImage()
    } else if (deviceObject) {
      editor.frame.resize({ width: frame.width, height: frame.height })
      editor.objects.remove(deviceObject.id)
      editor.objects.unsetBackgroundImage()
    } else if (backgroundImg) {
      editor.objects.remove(backgroundImg.id)
      editor.objects.unsetBackgroundImage()
    }
    editor.frame.setBackgroundColor(each)
  }

  function close() {
    setIsOpen(false)
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
            <div className={clsx(classes.subHeading, "pt-1 pb-1")}>Colors</div>
            <div className={classes.colorsWrapper}>
              {colors.map((each, idx) => {
                return (
                  <div
                    key={idx}
                    className={clsx(classes.colorOption, "flex-center")}
                    onClick={() => {
                      if (idx === colors.length - 1) {
                        setIsOpen(true)
                      } else {
                        setBGColor(each)
                        updateObjectFill(each)
                      }
                    }}
                    style={{ backgroundColor: each, border: idx == colors.length - 1 ? "1px solid #92929D" : "" }}
                  >
                    {idx === colors.length - 1 && (
                      <div>
                        {" "}
                        <Icons.ColorPlus />{" "}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            <ColorPicker
              inputColor={bgColor}
              isOpen={isOpen}
              handleClose={close}
              type="background"
              handleColor={(each: any) => {
                setBGColor(each)
                updateObjectFill(each)
              }}
            />
          </div>
        </div>
      </Block>
    </Block>
  )
}

export default TransparencyPopup
