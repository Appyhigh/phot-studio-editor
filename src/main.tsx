import ReactDOM from "react-dom/client"
import Provider from "./Provider"
import Router from "./Router"
import Container from "./Container"
import "./styles/styles.css"
import { CustomTheme } from "./theme"
import { BaseProvider } from "baseui"
import { Provider as StyletronProvider } from "styletron-react"
import { Client as Styletron } from "styletron-engine-atomic"
const engine = new Styletron()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider>
    <StyletronProvider value={engine}>
      <BaseProvider theme={CustomTheme}>
        <Container>
          <Router />
        </Container>
      </BaseProvider>
    </StyletronProvider>
  </Provider>
)
