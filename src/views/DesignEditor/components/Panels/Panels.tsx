import { Block } from "baseui/block"
import PanelItem from "./PanelItem/PanelItem"
import PanelsList from "./PanelsList/PanelsList"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import Icons from "~/components/Icons"
import useIsSidebarOpen from "~/hooks/useIsSidebarOpen"
import classes from "./style.module.css"
import clsx from "clsx"
import { useEffect } from "react"
import useAppContext from "~/hooks/useAppContext"
import { PanelType } from "~/constants/app-options"

const Panels = () => {
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const isSidebarOpen = useIsSidebarOpen()
  const { activePanel } = useAppContext()

  useEffect(() => {
    if (!activePanel || !Object.values(PanelType).includes(activePanel)) {
      setIsSidebarOpen(false)
    }
  }, [activePanel])

  return (
    <>
      <PanelsList />
      <Block className="d-flex">
        <PanelItem />
        <Block
          className={clsx("m-auto pointer p-absolute", classes.sliderBtnWrapper, isSidebarOpen && classes.sliderOpen)}
        >
          {activePanel && Object.values(PanelType).includes(activePanel) && (
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
          )}
        </Block>
      </Block>
    </>
  )
}

export default Panels
