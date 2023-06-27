import { images } from "src/constants/mock-data"
import { useCoreHandler } from "src/components/FabricCanvas/Canvas/handlers"
import { useCallback } from "react"
import useEditor from "~/hooks/useFabricEditor"
const ImagesPanel = () => {
  return (
    <>
      <div className="d-flex">
        <div className="d-flex flex-wrap">
          {images.map((image: any, index: any) => {
            return index < 8 && <ImageItem key={index} src={image.src} />
          })}
        </div>
      </div>
    </>
  )
}

const ImageItem = ({ src }: { src: any }) => {
  const { addImage } = useCoreHandler()
  const { fabricEditor: {canvas} } = useEditor()

  const handleAddObject = useCallback(() => {
    console.log("add object: ", src.small)
    addImage({
      type: "image",
      src: src.small,
    })
  }, [canvas])

  return (
    <div className="pointer p-1" onClick={handleAddObject}>
      <img src={src.small} />
    </div>
  )
}

export default ImagesPanel
