import React, { useState } from "react"
import { Provider as ScenifyProvider } from "@layerhub-io/react"
import { Client as Styletron } from "styletron-engine-atomic"
import { Provider as StyletronProvider } from "styletron-react"
import { BaseProvider, LightTheme } from "baseui"
import { store } from "./store/store"
import { Provider as ReduxProvier } from "react-redux"
import { AppProvider } from "./contexts/AppContext"
import { DesignEditorProvider } from "./contexts/DesignEditor"
import { I18nextProvider } from "react-i18next"
import { TimerProvider } from "@layerhub-io/use-timer"
import LoaderContext from "./contexts/LoaderContext"
import i18next from "i18next"
import "./translations"
import { CustomTheme } from "./theme"
import MainImageContext from "./contexts/MainImageContext"
import AuthWrapper from "./hooks/useAuth"
import ImagesContext from "./contexts/ImagesCountContext"
import TextToArtContext from "./contexts/TextToArtContext"
import ErrorContext from "./contexts/ErrorContext"
import ImageUpScalerContext from "./contexts/ImageUpScalerContext"
import ImageColorizerContext from "./contexts/ImageColorizerContext"
import PhotoEditorContext from "./contexts/PhotoEditorContext"

const engine = new Styletron()

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [loaderPopup, setLoaderPopup] = useState<boolean>(false)

  const [mainImgInfo, setMainImgInfo] = useState({
    type: "",
    id: "",
    src: "",
    preview: "",
    url: "",
    original: "",
    metadata: {},
    swiper_selected_option: false,
    swiper_selected_color: "",
  })

  const [panelInfo, setPanelInfo] = useState({
    uploadSection: true,
    trySampleImg: true,
    uploadPreview: false,
    bgOptions: false,
    bgRemoverBtnActive: false,
  })

  const [imagesCt, setImagesCt] = useState(0)

  const [textToArtInputInfo, setTextToArtInputInfo] = useState({
    prompt: "",
    style: [],
    images_generation_ct: 1,
    uploaded_img: "",
    image_wt: 5.6,
    negative_prompt_visible: false,
    negative_prompt: "",
    cfg_scale: 7.5,
    aspect_ratio: "1:1",
    showclearTooltip: false,
  })

  const [textToArtpanelInfo, setTextToArtPanelInfo] = useState({
    resultSectionVisible: false,
    resultImages: [],
  })

  const [styleImage, setStyleImage] = useState(new Set<string>())

  const [result, setResult] = useState([])

  const [errorInfo, setErrorInfo] = useState({
    errorInfo: {
      showError: false,
      errorMsg: "",
      retryFn: () => {},
    },
  })

  const [imgScalerInfo, setImgScalerInfo] = useState({
    id: "",
    src: "",
    original: "",
    scaler: 2,
    result: [],
    showclearTooltip: false,
  })

  const [imgScalerPanelInfo, setImgScalerPanelInfo] = useState({
    uploadSection: true,
    trySampleImg: true,
    uploadPreview: false,
    resultSectionVisible: false,
  })

  const [photoEditorInfo, setPhotoEditorInfo] = useState({
    src: "",
    original: "",
    prompt: "",
    images_generation_ct: 1,
    result: [],
    showclearTooltip: false,
  })

  const [photoEditorPanelInfo, setPhotoEditorPanelInfo] = useState({
    uploadSection: true,
    trySampleImg: true,
    uploadPreview: false,
    resultSectionVisible: false,
  })

  const [ImgColorizerInfo, setImgColorizerInfo] = useState({
    type: "",
    id: "",
    src: "",
    original: "",
    resultImages: [],
  })

  const [ImgColorizerpanelInfo, setImgColorizerpanelInfo] = useState({
    uploadSection: true,
    trySampleImg: true,
    uploadPreview: false,
    resultOption: false,
    tryFilters: false,
  })

  return (
    <AuthWrapper>
      <ReduxProvier store={store}>
        <ImagesContext.Provider value={{ imagesCt, setImagesCt }}>
          <LoaderContext.Provider value={{ loaderPopup, setLoaderPopup }}>
            <ErrorContext.Provider value={{ errorInfo, setErrorInfo }}>
              <ImageColorizerContext.Provider
                value={{ ImgColorizerInfo, setImgColorizerInfo, ImgColorizerpanelInfo, setImgColorizerpanelInfo }}
              >
                <ImageUpScalerContext.Provider
                  value={{ imgScalerInfo, setImgScalerInfo, imgScalerPanelInfo, setImgScalerPanelInfo }}
                >
                  <PhotoEditorContext.Provider
                    value={{ photoEditorInfo, setPhotoEditorInfo, photoEditorPanelInfo, setPhotoEditorPanelInfo }}
                  >
                    <TextToArtContext.Provider
                      value={{
                        textToArtInputInfo,
                        setTextToArtInputInfo,
                        textToArtpanelInfo,
                        setTextToArtPanelInfo,
                        styleImage,
                        setStyleImage,
                        result,
                        setResult,
                      }}
                    >
                      <MainImageContext.Provider value={{ mainImgInfo, setMainImgInfo, panelInfo, setPanelInfo }}>
                        <DesignEditorProvider>
                          <TimerProvider>
                            <AppProvider>
                              <ScenifyProvider>
                                <StyletronProvider value={engine}>
                                  <BaseProvider theme={CustomTheme}>
                                    <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
                                  </BaseProvider>
                                </StyletronProvider>
                              </ScenifyProvider>
                            </AppProvider>
                          </TimerProvider>
                        </DesignEditorProvider>
                      </MainImageContext.Provider>
                    </TextToArtContext.Provider>
                  </PhotoEditorContext.Provider>
                </ImageUpScalerContext.Provider>
              </ImageColorizerContext.Provider>
            </ErrorContext.Provider>
          </LoaderContext.Provider>
        </ImagesContext.Provider>
      </ReduxProvier>
    </AuthWrapper>
  )
}

export default Provider
