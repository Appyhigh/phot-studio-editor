import clsx from "clsx"
import classes from "./style.module.css"

const ImagesCount = ({ stateInfo, setStateInfo }: any) => {
  return (
    <div className={classes.itemContainer}>
      <div className={classes.itemHeading}>How many images you want to generate?</div>
      <div className="d-flex justify-content-start flex-row">
        {[1, 2, 3, 4].map((each, idx) => {
          return (
            <div
              key={idx}
              className={clsx(
                classes.ctBox,
                "flex-center pointer",
                idx === 0 && "ml-0",
                stateInfo.images_generation_ct === each && classes.selectedCtBox
              )}
              onClick={() => {
                setStateInfo((prev: any) => ({ ...prev, images_generation_ct: each }))
              }}
            >
              {each}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ImagesCount
