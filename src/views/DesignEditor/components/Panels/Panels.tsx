import { Block } from "baseui/block"
import PanelItem from "./PanelItem"
import PanelsList from "./PanelsList"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import Icons from "~/components/Icons"
import useIsSidebarOpen from "~/hooks/useIsSidebarOpen"

const Panels = () => {
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const isSidebarOpen = useIsSidebarOpen()

  return (
    <>
      <PanelsList />
      <Block className="d-flex">
        <PanelItem />
        <Block
          className="m-auto pointer p-absolute"
          style={{ left: isSidebarOpen ? "460px" : "100px", top: "50%", zIndex: 5 }}
        >
          <div
            className="p-relative"
            style={{ marginRight: "-2px" }}
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen)
            }}
          >
            <div>
              <Icons.SliderBtn size={106} />
            </div>

            <div
              className="p-absolute"
              style={{
                top: "36%",
                left: "35%",
                transform: !isSidebarOpen ? "scaleX(-1)" : "scaleX(1)",
              }}
            >
              <Icons.SliderIcon size={15} />
            </div>
          </div>
        </Block>
      </Block>
    </>
  )
}

export default Panels
