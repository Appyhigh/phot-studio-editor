import { Slider } from "baseui/slider"

const SliderBar = ({ width, minVal, maxVal, val, handleChange, thumbSize,step,color,height }: any) => {
  return (
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
            backgroundColor:color?color:"#333B4F",
            background:color?color:"#333B4F"

          },
        },
        Track: {
          style: {
            paddingLeft: 0,
            paddingRight: 0,
            color:color?color:"#333B4F"
 

          },
        },
        InnerTrack: {
          style: {
            height:height?height: "4px",
            backgroundColor:color?color:"#333B4F" ,
            color:color?color:"#333B4F"
          },
        },
      }}
      step={step}
      value={[val]}
      onChange={({ value }) => handleChange(value)}
      min={minVal}
      max={maxVal}
    />
  )
}

export default SliderBar
