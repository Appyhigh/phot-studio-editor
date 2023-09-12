import { PanelType } from "~/constants/app-options"
import React, { createContext, useState } from "react"

type Template = any
interface IAppContext {
  isMobile: boolean | undefined
  setIsMobile: React.Dispatch<React.SetStateAction<boolean | undefined>>
  templates: Template[]
  setTemplates: (templates: Template[]) => void
  uploads: any[]
  setUploads: (templates: any[]) => void
  shapes: any[]
  setShapes: (templates: any[]) => void
  activePanel: PanelType
  setActivePanel: (option: PanelType) => void
  activeSubMenu: string | null
  setActiveSubMenu: (option: string) => void
  currentTemplate: any
  setCurrentTemplate: any
  res: any[]
  setRes: (res: any[]) => void
  search: string
  setSearch: (search: string) => void
  activeCategory: string
  setActiveCategory: (search: string) => void
}

export const AppContext = createContext<IAppContext>({
  isMobile: false,
  setIsMobile: () => { },
  templates: [],
  setTemplates: () => { },
  uploads: [],
  setUploads: () => { },
  shapes: [],
  setShapes: () => { },
  activePanel: PanelType.BACKGROUND_REMOVER,
  setActivePanel: () => { },
  activeSubMenu: null,
  setActiveSubMenu: (value: string) => { },
  currentTemplate: {},
  setCurrentTemplate: {},
  res: [],
  setRes: () => { },
  search: "",
  setSearch: () => { },
  activeCategory: "",
  setActiveCategory: () => { },
})

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)
  const [templates, setTemplates] = useState<Template[]>([])
  const [uploads, setUploads] = useState<any[]>([])
  const [shapes, setShapes] = useState<Template[]>([])
  const [activePanel, setActivePanel] = useState<PanelType>(PanelType.IMAGES)
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null)
  const [currentTemplate, setCurrentTemplate] = useState(null)
  const [res, setRes] = useState<any[]>([])
  const [search, setSearch] = useState<string>("")
  const [activeCategory, setActiveCategory] = useState<string>("")
  const context = {
    isMobile,
    setIsMobile,
    templates,
    setTemplates,
    activePanel,
    setActivePanel,
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
    setActiveCategory
  }
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}
