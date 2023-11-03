import { Block } from "baseui/block"
import classes from "./style.module.css"
import Icons from "~/components/Icons"
import { useNavigate } from "react-router-dom"
const HomepageToolCard = ({ data }: any) => {
  const navigate = useNavigate()
  return (
    <Block
      onClick={() => {
        navigate("/art-board")
      }}
      className={classes.toolCard}
    >
      <div className={classes.toolCardImgCon}>
        <img src={data.src} alt={data.title} />
      </div>
      <div className={classes.descCon}>
        <h3 className={classes.toolCardHeader}>{data.title}</h3>
        <p className={classes.toolCardDesc}>{data.discription}</p>
      </div>
      {
        <div className={classes.comingSoonWrapper}>
          <Icons.CommingSoon />
        </div>
      }
    </Block>
  )
}
export default HomepageToolCard
