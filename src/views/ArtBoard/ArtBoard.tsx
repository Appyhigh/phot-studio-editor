import EditorContainer from "../DesignEditor/components/EditorContainer"
import Footer from "../DesignEditor/components/Footer"
import Canvas from "./Components/Canvas"
import Sidebar from "./Components/Sidebar/Sidebar"
import BasePanel from "~/components/UI/BasePanel/BasePanel"

const ArtBoard = () => {
  return (
    <EditorContainer>
      {/* <Navbar /> */}
      <BasePanel />
      <div style={{ display: "flex", flex: 1 }}>
        {/* <Panels /> */}
        <Sidebar />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
          <Footer />
          <Canvas />
        </div>
      </div>
    </EditorContainer>
  )
}

export default ArtBoard
