import React, { useContext, useEffect } from "react"
import { styled } from "baseui"
import { Theme } from "baseui/theme"
import Toolbox from "../../Toolbox"
import ErrorContext from "~/contexts/ErrorContext"
import Toast from "~/components/Toast/Toast"
import Scenes from "./Scenes"

const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  width: "100%",
}))

const Graphic = () => {
  const { errorInfo } = useContext(ErrorContext)

  return (
    <Container className="d-flex justify-content-center flex-column align-items-center">
      {errorInfo.showError && (
        <Toast
          style={{ width: "60%" }}
          type="error"
          message={errorInfo.errorMsg}
          clickHandler={() => {
            errorInfo.retryFn()
          }}
        />
      )}

      <Toolbox />
      <Scenes />

      {/* <Common /> */}
    </Container>
  )
}

export default Graphic
