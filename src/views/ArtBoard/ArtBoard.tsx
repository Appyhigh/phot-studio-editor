import { useEffect } from "react"
import EditorContainer from "../DesignEditor/components/EditorContainer"
import Footer from "../DesignEditor/components/Footer"
import Canvas from "./Components/Canvas"
import Navbar from "./Components/Navbar/Navbar"
import Sidebar from "./Components/Sidebar/Sidebar"
import { useEditor } from "@layerhub-io/react"
import { applyZoomRatio } from "./utils/applyZoomRatio"

const ArtBoard = () => {
  const editor = useEditor()

  // Set initial zoom value
  useEffect(() => {
    if (editor) {
      setTimeout(() => {
        applyZoomRatio("zoomRatio", { target: { value: 20 } }, editor)
      }, 200)
    }
  }, [editor])

  return (
    <EditorContainer>
      <Navbar />
      <div style={{ display: "flex", flex: 1 }}>
        {/* <Panels /> */}
        <Sidebar />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
          <Canvas />
          <Footer />
        </div>
      </div>
    </EditorContainer>
  )
}

export default ArtBoard
