import { Block } from "baseui/block"
import { useState } from "react"
import classes from "./style.module.css"
import { RgbaColorPicker, HslaColorPicker } from "react-colorful"
import { Button } from "baseui/button"
import Icons from "~/components/Icons"
import { rgbaTohex } from "~/utils/colorConverter"

const BrandColorPicker = ({ type, handleAddColor, close, index }: any) => {
    const [color, setColor] = useState({ r: 0, g: 0, b: 0, a: 1 })
    const [hexColor, setHexColor] = useState("#000000")
    const [hslaColor, setHslaColor] = useState({ h: 270, s: 0, l: 0, a: 1 })
    const [opacity, setOpacity] = useState("100%")
    const [selectedColorFormat, setSelectedColorFormat] = useState("Hex")

    const handleColorFormatChange = (event: any) => {
        setSelectedColorFormat(event.target.value)
    }

    const rgba2hex = async () => {
        var hex = rgbaTohex(color.r, color.g, color.b, color.a)
        setHexColor(hex)
        setOpacity(`${Math.round(color?.a * 100)}%`)
    }

    return (
        <Block className={classes.colorPickerContainer}>
            <Block className={classes.colorInfoCon}>
                <div className={classes.colorInputCon}>
                    <label className={classes.inputLabel}>
                        Name
                        <input className={classes.inputBox} type="text" name="name" placeholder="Primary color" />
                    </label>

                    <label className={classes.inputLabel}>
                        Description
                        <input className={classes.inputBox} type="text" name="Description" placeholder="What’s it for?" />
                    </label>
                </div>
            </Block>
            <div className={classes.modal}>
                <Block className={classes.colorPickerSection}>
                    <div className="brand-hex-color-picker">
                        {(selectedColorFormat === 'Hex' || selectedColorFormat === 'Rgba' || selectedColorFormat === 'Css') ?
                            <RgbaColorPicker
                                onChange={(color) => {
                                    setColor(color)
                                    rgba2hex()
                                }}
                            />
                            :
                            <HslaColorPicker
                                onChange={(hslaColor: any) => {
                                    setHslaColor(hslaColor)
                                }}
                            />
                        }
                    </div>
                    <span style={{ position: "absolute", marginTop: "-30px" }}>
                        <Icons.ColorSelecter />
                    </span>

                    <div className={classes.colorValuesInput}>
                        <div className={classes.selectColorCodeCon}>
                            <select id="colorFormat" className={classes.selectColorCont} onChange={handleColorFormatChange}>
                                <option value="Hex">HEX</option>
                                <option value="Rgba">RGB</option>
                                <option value="Hsla">HSL</option>
                                <option value="Css">CSS</option>
                            </select>
                            <div className={classes.selectDownArrow}>
                                <Icons.DownArrow width="10px" height="10px" color="#696974" />
                            </div>
                        </div>

                        {selectedColorFormat === "Hex" && (
                            <div className={classes.inputPercentage}>
                                <input
                                    className={classes.colorPickerInputField}
                                    onChange={(e) => {
                                        setHexColor(e.target.value)
                                    }}
                                    value={hexColor}
                                />

                                <input className={classes.colorPercentageInputField} value={opacity} />
                            </div>
                        )}

                        {selectedColorFormat === "Rgba" && (
                            <Block className={classes.multiValueInputFieldsCon}>
                                <div className={classes.valueContainer}>
                                    <label>R</label>
                                    <input
                                        className={classes.colorSingleValInput}
                                        type="number"
                                        id="red-input"
                                        min="0"
                                        max="255"
                                        value={color?.r}
                                    // onChange={(e) => setColor((prev) => ({ ...prev, r: e.target.value }))}
                                    />
                                </div>

                                <div className={classes.valueContainer}>
                                    <label>G</label>
                                    <input
                                        className={classes.colorSingleValInput}
                                        type="number"
                                        id="red-input"
                                        min="0"
                                        max="255"
                                        value={color?.g}
                                    // onChange={(e) => setColor((prev) => ({ ...prev, g: e.target.value }))}
                                    />
                                </div>

                                <div className={classes.valueContainer}>
                                    <label>B</label>
                                    <input
                                        className={classes.colorSingleValInput}
                                        type="number"
                                        id="red-input"
                                        min="0"
                                        max="255"
                                        value={color?.b}
                                    // onChange={(e) => setColor((prev) => ({ ...prev, b: e.target.value }))}
                                    />
                                </div>

                                <div className={classes.valueContainer}>
                                    <label>A</label>
                                    <input
                                        className={classes.colorSingleValInput}
                                        type="number"
                                        id="red-input"
                                        min="0"
                                        max="255"
                                        value={color?.a}
                                    // onChange={(e) => setColor((prev) => ({ ...prev, a: e.target.value }))}
                                    />
                                </div>
                            </Block>
                        )}

                        {selectedColorFormat === "Hsla" && (
                            <Block className={classes.multiValueInputFieldsCon}>
                                <div className={classes.valueContainer}>
                                    <label>H</label>
                                    <input
                                        className={classes.colorSingleValInput}
                                        type="number"
                                        id="red-input"
                                        min="0"
                                        max="360"
                                        value={hslaColor.h}
                                    // onChange={(e) => setHslaColor((prev) => ({ ...prev, h: e.target.value }))}
                                    />
                                </div>

                                <div className={classes.valueContainer}>
                                    <label>S</label>
                                    <input
                                        className={classes.colorSingleValInput}
                                        type="number"
                                        id="red-input"
                                        min="0"
                                        max="360"
                                        value={hslaColor.s}
                                    // onChange={(e) => setHslaColor((prev) => ({ ...prev, s: e.target.value }))}
                                    />
                                </div>

                                <div className={classes.valueContainer}>
                                    <label>L</label>
                                    <input
                                        className={classes.colorSingleValInput}
                                        type="number"
                                        id="red-input"
                                        min="0"
                                        max="360"
                                        value={hslaColor.l}
                                    // onChange={(e) => setHslaColor((prev) => ({ ...prev, l: e.target.value }))}
                                    />
                                </div>

                                <div className={classes.valueContainer}>
                                    <label>A</label>
                                    <input
                                        className={classes.colorSingleValInput}
                                        type="number"
                                        id="red-input"
                                        min="0"
                                        max="360"
                                        value={hslaColor.a}
                                    // onChange={(e) => setHslaColor((prev) => ({ ...prev, a: e.target.value }))}
                                    />
                                </div>
                            </Block>
                        )}

                        {selectedColorFormat === "Css" &&
                            <input className={classes.cssInput} value={`rgba(${color.r} ${color.g} ${color.b} ${color.a})`} />
                        }
                    </div>

                    <Block className="w-100 mt-3" style={{ height: "38px" }}>
                        <Button
                            onClick={() => {
                                handleAddColor(index, hexColor, type)
                                close()
                            }}
                            $colors={{ backgroundColor: "#6729F3", color: "#fff" }}
                            className="w-100 h-100 p-5 mt-5 d-inline-block"
                        >
                            Add
                        </Button>
                    </Block>
                </Block>
            </div>
        </Block>
    )
}

export default BrandColorPicker
