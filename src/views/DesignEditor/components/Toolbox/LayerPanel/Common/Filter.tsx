import { filterOptions } from "~/views/DesignEditor/utils/FilterOptions"
import classes from "./style.module.css"
import clsx from "clsx"
import { useState } from "react"
import SliderBar from "~/components/UI/Common/SliderBar"
import { Block } from "baseui/block"

const Filter = () => {
  const [filterVal, setfilterVal] = useState(50)
  const minQuality = 10
  const maxQuality = 100
  const handleFilterChange = (e: any) => {
    setfilterVal(e[0])
  }
  return (
    <div className={classes.filterState}>
      <div className={classes.filterOptions}>
        {filterOptions.map((each, idx) => (
          <div key={idx} className={clsx(classes.filterOption, "flex-center pointer",idx==0&&classes.selectedFilter)}>
            <span className={classes.filterName}>{each.name}</span>
          </div>
        ))}
      </div>

      <Block className="mb-1">
        <SliderBar
          width="200px"
          minVal={minQuality}
          maxVal={maxQuality}
          thumbSize={"14px"}
          val={[filterVal]}
          handleChange={handleFilterChange}
        />
      </Block>
    </div>
  )
}

export default Filter
