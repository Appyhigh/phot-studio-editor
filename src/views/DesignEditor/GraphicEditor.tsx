import Panels from "./components/Panels"
import Canvas from "./components/Canvas"
import Footer from "./components/Footer"
import EditorContainer from "./components/EditorContainer"
import Navbar from "~/components/UI/Navbar"
import BasePannel from "~/components/UI/BasePannel"
import LayerPanel from "./components/Toolbox/LayerPanel/LayerPanel"

const GraphicEditor = () => {
  return (
    <EditorContainer>
      <Navbar />

      <div className="d-flex flex-1">
        <Panels />
        <div className="flex-1 d-flex flex-column p-relative">
          {/* <Toolbox /> */}
          <BasePannel />
          <div className="flex-1 d-flex flex-row p-relative">
            <div className="flex-1 d-flex flex-column p-relative">
              <Canvas />
              <Footer />
            </div>
            <LayerPanel />
          </div>
        </div>
      </div>
    </EditorContainer>
  )
}

export default GraphicEditor
