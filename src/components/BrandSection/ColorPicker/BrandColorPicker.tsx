import { Block } from "baseui/block"
import { useState } from "react"
import classes from "./style.module.css"
import { RgbaColorPicker } from "react-colorful"
import { throttle } from "lodash"
import { Button } from "baseui/button"
import Icons from "~/components/Icons"

const BrandColorPicker = ({ isOpen, handleClose, inputColor, handleChangeColor }: any) => {
    const [color, setColor] = useState(inputColor)
    const [hexColor, setHexColor] = useState("#000000")
    const [opacity, setOpacity] = useState('100%')
    const close = () => {
        handleClose()
    }
    const updateObjectFill = throttle((color: string) => {
        handleChangeColor(color)
        setColor(color)
        close()
    }, 1000)

    function rgba2hex() {
        var hex = '#' +
            (parseInt(`${color?.r}`, 10) | (1 << 8)).toString(16).slice(1) +
            (parseInt(`${color?.g}`, 10) | (1 << 8)).toString(16).slice(1) +
            (parseInt(`${color?.b}`, 10) | (1 << 8)).toString(16).slice(1)
        setHexColor(hex)
        setOpacity(`${Math.round(color?.a * 100)}%`)
    }

    console.log(color);

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
                        {
                            <RgbaColorPicker
                                onChange={(color) => {
                                    setColor(color)
                                    rgba2hex()
                                }}
                            />
                        }
                    </div>
                    <span style={{ position: "absolute", marginTop: "-30px" }}>
                        <Icons.ColorSelecter />
                    </span>

                    <div className={classes.colorValuesInput}>
                        <div className={classes.selectColorCodeCon}>
                            <select id="colorFormat" className={classes.selectColorCont}>
                                <option value="Hex">Hex</option>
                                <option value="Hex">Hex</option>
                            </select>
                            <div className={classes.selectDownArrow}>
                                <Icons.DownArrow width="10px" height="10px" color="#696974" />
                            </div>
                        </div>

                        <div className={classes.inputPercentage}>
                            <input
                                className={classes.colorPickerInputField}
                                onChange={(e) => {
                                    setColor(e.target.value)
                                }}
                                value={hexColor}
                            />
                            <input className={classes.colorPercentageInputField} value={opacity} />
                        </div>
                    </div>

                    <Block className="w-100 mt-3" style={{ height: '38px' }}>
                        <Button
                            onClick={() => updateObjectFill(color)}
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
