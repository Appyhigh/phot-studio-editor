import { AppContext } from "~/contexts/AppContext"
import { useContext } from "react"

const useAppContext = () => {
  const {
    isMobile,
    setIsMobile,
    activePanel,
    setActivePanel,
    templates,
    setTemplates,
    shapes,
    setShapes,
    activeSubMenu,
    setActiveSubMenu,
    uploads,
    setUploads,
    currentTemplate,
    setCurrentTemplate,
    res,
    setRes,
    search,
    setSearch,
    activeCategory,
    setActiveCategory,
  } = useContext(AppContext)
  return {
    isMobile,
    setIsMobile,
    activePanel,
    setActivePanel,
    templates,
    setTemplates,
    shapes,
    setShapes,
    activeSubMenu,
    setActiveSubMenu,
    uploads,
    setUploads,
    currentTemplate,
    setCurrentTemplate,
    res,
    setRes,
    search,
    setSearch,
    activeCategory,
    setActiveCategory,
  }
}

export default useAppContext
