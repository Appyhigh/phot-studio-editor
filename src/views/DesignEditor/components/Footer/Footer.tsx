import Graphic from "./Graphic"
import useEditorType from "~/hooks/useEditorType"

const Footer = () => {
  const editorType = useEditorType()

  return {
    GRAPHIC: <Graphic />,
  }[editorType]
}

export default Footer
