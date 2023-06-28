import Panels from "./components/Panels"
import Canvas from "./components/Canvas"
import Footer from "./components/Footer"
import EditorContainer from "./components/EditorContainer"
import BasePanel from "~/components/UI/BasePanel/BasePanel"
import Navbar from "~/components/UI/Common/Navbar/Navbar"
import LayerPanel from "./components/Toolbox/LayerPanel/LayerPanel"
import { fabric } from "fabric"
import { useEffect, useState } from "react"
import { useEditor } from "@layerhub-io/react"
import useAppContext from "~/hooks/useAppContext"
import { OBJECT_REMOVER } from "~/constants/contants"
import FabricCanvasModal from "~/components/FabricCanvas/FabricCanvasModal/FabricCanvasModal"
import { PanelType } from "~/constants/app-options"
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

  const { activePanel, setActivePanel } = useAppContext()
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    if (activePanel && !Object.values(PanelType).includes(activePanel)) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
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
            <BasePanel />
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
          isOpen={isOpen}
          handleClose={() => {
            setIsOpen(false)
            setActivePanel(null as any)
          }}
        />
      </div>
    </EditorContainer>
  )
}

export default GraphicEditor
