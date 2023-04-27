import useEditorType from "~/hooks/useEditorType"
import GraphicEditor from "./GraphicEditor"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import Preview from "./components/Preview"

const DesignEditor = () => {
  const editorType = useEditorType()
  const { displayPreview, setDisplayPreview } = useDesignEditorContext()
  console.log(editorType)
  return (
    <>
      {displayPreview && <Preview isOpen={displayPreview} setIsOpen={setDisplayPreview} />}
      {{ GRAPHIC: <GraphicEditor /> }[editorType]}
    </>
  )
}

export default DesignEditor
