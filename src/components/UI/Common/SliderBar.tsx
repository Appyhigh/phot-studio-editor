import { Slider } from "baseui/slider"

const SliderBar = ({ width, minVal, maxVal, val, handleChange, thumbSize, step }: any) => {
  return (
    <div>
      <Slider
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
        onChange={({ value }) => handleChange(value)}
        min={minVal}
        max={maxVal}
      />
    </div>
  )
}

export default SliderBar
