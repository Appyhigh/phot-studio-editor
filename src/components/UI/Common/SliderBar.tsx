import { Slider } from "baseui/slider"
import useFabricEditor from "src/hooks/useFabricEditor"
const SliderBar = ({ width, minVal, maxVal, val, handleChange, thumbSize, step }: any) => {
  const { fabricEditor, setFabricEditor } = useFabricEditor()

  return (
    <div>
      <Slider
        onFinalChange={() => {
          setFabricEditor((prev) => ({ ...prev, brushShow: false }))
        }}
        overrides={{
          InnerThumb: () => null,
          ThumbValue: () => null,
          TickBar: () => null,
          Root: {
            style: { width: width, marginRight: "10px" },
          },
          Thumb: {
            style: {
              height: thumbSize,
              width: thumbSize,
              paddingLeft: 0,
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
        step={step}
        value={[val]}
        onChange={({ value }) => {
          setFabricEditor((prev) => ({ ...prev, brushShow: true }))
          handleChange(value)
        }}
        min={minVal}
        max={maxVal}
      />
    </div>
  )
}

export default SliderBar
