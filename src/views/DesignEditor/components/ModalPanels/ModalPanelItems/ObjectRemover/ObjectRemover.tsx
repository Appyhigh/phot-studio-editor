import Icons from "~/components/Icons"
import classes from "./style.module.css"

const ObjectRemover = () => {
  return (
    <div>
      <div className={classes.heading}>
        <div className={classes.arrowIcon}>
          <Icons.ArrowLeft />
        </div>
        <p>Object Remover</p>
      </div>
    </div>
  )
}

export default ObjectRemover
