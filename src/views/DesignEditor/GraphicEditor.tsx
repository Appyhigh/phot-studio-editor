import Panels from "./components/Panels"
import Canvas from "./components/Canvas"
import Footer from "./components/Footer"
import EditorContainer from "./components/EditorContainer"
import BasePannel from "~/components/UI/BasePannel/BasePannel"
import { Block } from "baseui/block"
import Navbar from "~/components/UI/Common/Navbar/Navbar"
import LayerPanel from "./components/Toolbox/LayerPanel/LayerPanel"
import { fabric } from "fabric"
import { useContext, useEffect, useRef, useState } from "react"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import useAppContext from "~/hooks/useAppContext"
import { OBJECT_REMOVER } from "~/constants/contants"
import Editor from "~/components/FabricCanvas/Editor"
import FabricCanvasModal from "~/components/FabricCanvas/FabricCanvasModal/FabricCanvasModal"

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

  const { activePanel } = useAppContext()
  console.log(activePanel)
  const [isopen, setIsOpen] = useState(false)
  useEffect(() => {
    if (activePanel === OBJECT_REMOVER) {
      setIsOpen(true)
    }
  }, [activePanel])
  return (
    <EditorContainer>
      <Navbar />
      <div className="d-flex flex-1">
        <Panels />
        {
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
        }
        <FabricCanvasModal
          isOpen={isopen}
          handleClose={() => {
            setIsOpen(false)
          }}
        />
      </div>
    </EditorContainer>
  )
}

export default GraphicEditor
