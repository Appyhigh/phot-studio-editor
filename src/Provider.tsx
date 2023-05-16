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

const engine = new Styletron()

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [loaderPopup, setLoaderPopup] = useState<boolean>(false)
  return (
    <ReduxProvier store={store}>
      <LoaderContext.Provider value={{ loaderPopup, setLoaderPopup }}>
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
      </LoaderContext.Provider>
    </ReduxProvier>
  )
}

export default Provider
