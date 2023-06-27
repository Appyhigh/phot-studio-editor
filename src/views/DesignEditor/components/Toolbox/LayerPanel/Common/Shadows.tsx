import classes from "./style.module.css"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import { shadowOptions } from "~/views/DesignEditor/utils/ShadowOptions"
const Shadows = () => {
  const activeObject: any = useActiveObject()
  const editor = useEditor()
  const [selectedFilter, setSelectedFilter] = useState<string>()

  useEffect(() => {
    if (activeObject?.shadow) {
      setSelectedFilter(activeObject?.shadow?._id)
    }
  }, [activeObject])

  return (
    <div className={classes.filterState}>
      <div className={classes.filterOptions}>
        {shadowOptions.map((each, idx) => (
          <div
            onClick={() => {
              setSelectedFilter(each.name)
              activeObject.set(each.shadowObj)
              editor.canvas.requestRenderAll()
              editor.history.save()
            }}
            key={idx}
            style={each.style}
            className={clsx(
              classes.shadowOption,
              "flex-center pointer",
              selectedFilter === each.name && classes.selectedFilter
            )}
          >
            <span className={classes.filterName}>{each.name === "#1" ? "\u2A2F" : each.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Shadows
