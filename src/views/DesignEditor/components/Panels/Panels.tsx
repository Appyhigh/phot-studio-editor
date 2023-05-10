import { Block } from "baseui/block"
import PanelItem from "./PanelItem/PanelItem"
import PanelsList from "./PanelsList/PanelsList"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import Icons from "~/components/Icons"
import useIsSidebarOpen from "~/hooks/useIsSidebarOpen"
import classes from "./style.module.css"
import clsx from "clsx"

const Panels = () => {
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const isSidebarOpen = useIsSidebarOpen()
  return (
    <>
      <PanelsList />
      <Block className="d-flex">
        <PanelItem />
        <Block
          className={clsx("m-auto pointer p-absolute", classes.sliderBtnWrapper, isSidebarOpen && classes.sliderOpen)}
        >
          <Block
            className={clsx("p-relative", classes.sliderBtn)}
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen)
            }}
          >
            <div>
              <Icons.SliderBtn size={106} />
            </div>

            <Block className={clsx("p-absolute", classes.sliderIcon, isSidebarOpen && classes.sliderIconTransform)}>
              <Icons.SliderIcon size={15} />
            </Block>
          </Block>
        </Block>
      </Block>
    </>
  )
}

export default Panels
