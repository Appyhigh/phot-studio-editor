import Panels from "./components/Panels"
import Canvas from "./components/Canvas"
import Footer from "./components/Footer"
import EditorContainer from "./components/EditorContainer"
import BasePanel from "~/components/UI/BasePanel/BasePanel"
import Navbar from "~/components/UI/Common/Navbar/Navbar"
import LayerPanel from "./components/Toolbox/LayerPanel/LayerPanel"
import { fabric } from "fabric"
import { useContext, useEffect, useState } from "react"
import { useEditor } from "@layerhub-io/react"
import useAppContext from "~/hooks/useAppContext"
import FabricCanvasModal from "~/components/FabricCanvas/FabricCanvasModal/FabricCanvasModal"
import { PanelType } from "~/constants/app-options"
import ProductPhotoshootContext from "~/contexts/ProductPhotoshootContext"
import ObjectRemoverContext from "~/contexts/ObjectRemoverContext"
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
  const { setProductPhotoshootInfo } = useContext(ProductPhotoshootContext)

  const { objectRemoverInfo, setObjectRemoverInfo } = useContext(ObjectRemoverContext)

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
            setObjectRemoverInfo((prev: any) => ({ ...prev, src: "", preview: "", result: "" }))
            setActivePanel(null as any)
            setProductPhotoshootInfo({
              src: "",
              preview: "",
              prompt: "",
              result: [],
              tooltip: false,
              finalImage: "",
              again: false,
              prevObjects: [],
            })
          }}
        />
      </div>
    </EditorContainer>
  )
}

export default GraphicEditor
