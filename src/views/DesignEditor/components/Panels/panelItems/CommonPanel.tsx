import { Block } from "baseui/block"
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"

const CommonPanel = () => {
  const setIsSidebarOpen = useSetIsSidebarOpen()

  return (
    <Block className="d-flex flex-1 flex-column">
      <Block
        className="d-flex align-items-center justify-content-between p-3"
        $style={{
          fontWeight: 500,
        }}
      >
        <Block>Common</Block>

        <Block onClick={() => setIsSidebarOpen(false)} $style={{ cursor: "pointer", display: "flex" }}>
          <AngleDoubleLeft size={18} />
        </Block>
      </Block>
    </Block>
  )
}

export default CommonPanel
