import Panels from "./components/Panels"
import Canvas from "./components/Canvas"
import Footer from "./components/Footer"
import EditorContainer from "./components/EditorContainer"
import BasePannel from "~/components/UI/BasePannel/BasePannel"
import { Block } from "baseui/block"
import Navbar from "~/components/UI/Common/Navbar/Navbar"
import LayerPanel from "./components/Toolbox/LayerPanel/LayerPanel"
import { fabric } from "fabric"
import { useContext, useEffect, useRef } from "react"
import { useActiveObject, useEditor } from "@layerhub-io/react"

const GraphicEditor = () => {
  // Initially set the canvas background as Transparent Checkbox Image
  const editor = useEditor()

  useEffect(() => {
    if (editor) {
      // Setup Selection Style
      fabric.Object.prototype.transparentCorners = false
      fabric.Object.prototype.cornerStyle = "circle"
      fabric.Object.prototype.borderColor = "#6729F3"
      fabric.Object.prototype.cornerColor = "#6729F3"
      fabric.Object.prototype.cornerStrokeColor = "#FFF"
      fabric.Object.prototype.padding = 0
    }
  }, [editor])

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
