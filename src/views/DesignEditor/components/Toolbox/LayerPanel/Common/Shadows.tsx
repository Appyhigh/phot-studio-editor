import classes from "./style.module.css"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import { shadowOptions } from "~/views/DesignEditor/utils/ShadowOptions"
import ColorPicker from "~/components/UI/ColorPicker/ColorPicker"
import { error } from "console"
const Shadows = () => {
  const activeObject: any = useActiveObject()
  const editor = useEditor()
  const [selectedFilter, setSelectedFilter] = useState<string>()
  const [selectedOption, setSelectedOption] = useState<string>("Samples")
  const [shadowColorHex, setShadowColorHex] = useState("#00000")
  const [shadowColorOpacity, setShadowColorOpacity] = useState(100)
  const [isOpen, setIsOpen] = useState(false)
  const [shadowValues, setShadowValues] = useState({
    color: "#000000",
    x: 0,
    y: 0,
    blur: 0,
  })

  const { color, x, y, blur } = shadowValues

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setShadowValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const applyShadows = async (filterName: any, shadowObj: any) => {
    setSelectedFilter(filterName)
    activeObject.set(shadowObj)
    editor.canvas.requestRenderAll()
    editor.history.save()
    setShadowValues((prevValues) => ({
      ...prevValues,
      color:shadowObj.shadow.color,
      x:shadowObj.shadow.offsetX,
      y:shadowObj.shadow.offsetY,
      blur:shadowObj.shadow.blur,
    }))
    const RgbaToHex = handleRgbaToHex(shadowObj.shadow.color)
    setShadowColorHex(RgbaToHex) 
    const rgbaValues = color
    .replace(/[^\d.,]/g, "") // Remove non-numeric characters except for dots and commas
    .split(",")
    .map((value: any) => parseFloat(value.trim()))
    setShadowColorOpacity(Math.round(rgbaValues[3] * 100))
  }

  const isValidHex = (hex:any) => /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hex)
  const getChunksFromString = (st:any, chunkSize:any) => st.match(new RegExp(`.{${chunkSize}}`, "g"))
  const convertHexUnitTo256 = (hexStr:any) => parseInt(hexStr.repeat(2 / hexStr.length), 16)

  const getAlphafloat = (a:any, alpha:any) => {
    if (typeof a !== "undefined") {return a / 255}
    if ((typeof alpha !== "number") || alpha <0 || alpha >1){
      return 1
    }
    return alpha
}

  function handleHexToRgba(hex: any,alpha?:any) {

    try{
      if (!isValidHex(hex)){
         return}   
     const chunkSize = Math.floor((hex.length - 1) / 3)
     const hexArr = getChunksFromString(hex.slice(1), chunkSize)
     const [r, g, b, a] = hexArr.map(convertHexUnitTo256)
     return `rgba(${r}, ${g}, ${b}, ${getAlphafloat(a, alpha)})`
     }catch(error){
         console.log(error)
     }
  }


  function handleRgbaToHex(rgba: any) {
    if (rgba.startsWith("#")) {
      return rgba
    }
    const rgbaValues = rgba
      .replace(/[^\d.,]/g, "") // Remove non-numeric characters except for dots and commas
      .split(",")
      .map((value: any) => parseFloat(value.trim()))

    let r = (+rgbaValues[0]).toString(16),
      g = (+rgbaValues[1]).toString(16),
      b = (+rgbaValues[2]).toString(16),
      a = Math.round(+rgbaValues[3] * 255).toString(16)
    if (r.length === 1) r = "0" + r
    if (g.length === 1) g = "0" + g
    if (b.length === 1) b = "0" + b
    if (a.length === 1) a = "0" + a
    return "#" + r + g + b + a
  }

  const handleRgbaOpacity = (rgba:any,opacity:any) =>{
    const rgbaValues = rgba
      .replace(/[^\d.,]/g, "") // Remove non-numeric characters except for dots and commas
      .split(",")
      .map((value: any) => parseFloat(value.trim()))
      let r = rgbaValues[0],g=rgbaValues[1],b=rgbaValues[2],a=opacity/100
      return `rgba(${r}, ${g}, ${b}, ${a})`
  }

  useEffect(()=>{   
const out = handleRgbaOpacity(color,shadowColorOpacity)
setShadowValues((prevValues) => ({
  ...prevValues,
  color:out,
}))
  },[shadowColorOpacity])


  useEffect(() => {
    if (selectedOption === "Manual") {
      activeObject.set({ shadow: { color: color, offsetX: x, offsetY: y, blur: blur, _id: "none" } })
      editor.canvas.requestRenderAll()
      editor.history.save()
    }
  }, [shadowValues])

useEffect(()=>{
const HexToRgba = handleHexToRgba(shadowColorHex)
setShadowValues((prevValues:any) => ({
  ...prevValues,
  color:HexToRgba,
}))
const rgbaValues = color
      .replace(/[^\d.,]/g, "") // Remove non-numeric characters except for dots and commas
      .split(",")
      .map((value: any) => parseFloat(value.trim()))
      setShadowColorOpacity(Math.round(rgbaValues[3] * 100))
},[shadowColorHex])

  useEffect(() => {
    if (activeObject?.shadow) {
      const RgbToHex = handleRgbaToHex(activeObject.shadow.color)
      setSelectedFilter(activeObject?.shadow?._id)
      setShadowValues((prevValues) => ({
        ...prevValues,
        color:activeObject.shadow.color,
        x: activeObject.shadow?.offsetX,
        y: activeObject.shadow.offsetY,
        blur: activeObject.shadow.blur,
      }))
      setShadowColorHex(RgbToHex)

      const rgbaValues = color
      .replace(/[^\d.,]/g, "") // Remove non-numeric characters except for dots and commas
      .split(",")
      .map((value: any) => parseFloat(value.trim()))
      setShadowColorOpacity(Math.round(rgbaValues[3] * 100))
    }  
  }, [])
  

  return (
    <div className={classes.filterState}>
      <ColorPicker
        inputColor={shadowColorHex}
        setInputColor={setShadowColorHex}
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        handleChangeBg={()=>setIsOpen(false)}
      />
      <div className={classes.filterOptions}>
        <div
          onClick={() => {
            setSelectedOption("Samples")
          }}
          className={clsx(
            classes.ShadowSelect,
            "flex-center pointer",
            selectedOption === "Samples" && classes.selectedFilter
          )}
        >
          <span className={classes.filterName}>Samples</span>
        </div>

        <div
          onClick={() => {
            setSelectedOption("Manual")
          }}
          className={clsx(
            classes.ShadowSelect,
            "flex-center pointer",
            selectedOption === "Manual" && classes.selectedFilter
          )}
        >
          <span className={classes.filterName}>Manual</span>
        </div>
      </div>

      {selectedOption === "Samples" ? (
        <div className={classes.filterOptions}>
          {shadowOptions.map((each, idx) => (
            <div
              onClick={() => applyShadows(each.name, each.shadowObj)}
              key={idx}
              style={each.style}
              className={clsx(
                classes.shadowOption,
                "flex-center pointer",
                selectedFilter === each.name && classes.selectedFilter
              )}
            >
              <span className={classes.filterName}>{each.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className={classes.inputContainer}>
            <div className={classes.inputValues}>
              <label htmlFor="x">X</label>
              <input type="number" id="x" name="x" value={x} onChange={handleInputChange} />
            </div>
            <div className={classes.inputValues}>
              {" "}
              <label htmlFor="y">Y</label>
              <input type="number" id="y" name="y" value={y} onChange={handleInputChange} />
            </div>
            <div className={classes.inputValues}>
              <label htmlFor="blur">Blur</label>
              <input type="number" id="blur" name="blur" value={blur} onChange={handleInputChange} />
            </div>
          </div>

          <div className={classes.ShadowsColorPicker}>
            <div onClick={() => setIsOpen(true)} style={{ width: "18px", height: "18px", backgroundColor: color}}>
              {" "}
            </div>
            <input
              type="text"
              id="color"
              name="color"
              className={classes.ColorInput}
              value={shadowColorHex}
              onChange={(e:any)=>{setShadowColorHex(e.target.value)}}
            ></input>
            <input
              type="number"
              max="99"
              className={classes.PercentageInput}
              value={shadowColorOpacity}
              onChange={(e: any) => setShadowColorOpacity(e.target.value)}
            />
            %
          </div>
        </div>
      )}
    </div>
  )
}

export default Shadows
