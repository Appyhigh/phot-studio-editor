import Panels from "./components/Panels"
import Canvas from "./components/Canvas"
import Footer from "./components/Footer"
import Toolbox from "./components/Toolbox"
import EditorContainer from "./components/EditorContainer"
import ContextMenu from "./components/ContextMenu"
import Navbar from "~/components/UI/Navbar"
import BasePannel from "~/components/UI/BasePannel"
import LayerPanel from "./components/Toolbox/LayerPanel"

const GraphicEditor = () => {
  return (
    <EditorContainer>
      <Navbar />
      <BasePannel />

      <div style={{ display: "flex", flex: 1 }}>
        <Panels />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
          {/* <Toolbox /> */}
          <Canvas />
          <Footer />
        </div>
        <LayerPanel />
      </div>
    </EditorContainer>
  )
}

export default GraphicEditor
