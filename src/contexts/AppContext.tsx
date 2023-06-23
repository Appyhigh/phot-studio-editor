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
  bgSampleImages: any[]
  setBgSampleImages: (bgSampleImages: any[]) => void
  imgUpscalerSampleImg: any[]
  setImgUpscalerSampleImg: (imgUpscalerSampleImg: any[]) => void
  SampleImages: any
  setSampleImages: any
}

export const AppContext = createContext<IAppContext>({
  isMobile: false,
  setIsMobile: () => {},
  templates: [],
  setTemplates: () => {},
  uploads: [],
  setUploads: () => {},
  shapes: [],
  setShapes: () => {},
  activePanel: PanelType.BACKGROUND_REMOVER,
  setActivePanel: () => {},
  activeSubMenu: null,
  setActiveSubMenu: (value: string) => {},
  currentTemplate: {},
  setCurrentTemplate: {},
  res: [],
  setRes: () => {},
  search: "",
  setSearch: () => {},
  bgSampleImages: [],
  setBgSampleImages: () => {},
  imgUpscalerSampleImg: [],
  setImgUpscalerSampleImg: () => {},
  SampleImages:{Images:[],BgRemover:[],ImageUpscalar:[],ImageColorizer:[]},
  setSampleImages: () => {}
})

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)
  const [templates, setTemplates] = useState<Template[]>([])
  const [uploads, setUploads] = useState<any[]>([])
  const [shapes, setShapes] = useState<Template[]>([])
  const [activePanel, setActivePanel] = useState<PanelType>(PanelType.IMAGE_UPSCALER)
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null)
  const [currentTemplate, setCurrentTemplate] = useState(null)
  const [res, setRes] = useState<any[]>([])
  const [search, setSearch] = useState<string>("")
  const [bgSampleImages, setBgSampleImages] = useState<any[]>([])
  const [imgUpscalerSampleImg, setImgUpscalerSampleImg] = useState<any[]>([])
  const [SampleImages, setSampleImages] = useState({Images:[],bgRemover:[],ImageUpscalar:[],ImageColorizer:[]})
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
    bgSampleImages,
    setBgSampleImages,
    imgUpscalerSampleImg,
    setImgUpscalerSampleImg,
    SampleImages,
    setSampleImages
  }
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}
