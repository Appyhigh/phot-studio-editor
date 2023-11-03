import { BrowserRouter, Routes, Route } from "react-router-dom"
import DesignEditor from "~/views/DesignEditor"
import Dashboard from "~/views/Dashboard"
import HomePage from "./views/HomePage/HomePage"
import ArtBoard from "./views/ArtBoard"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {import.meta.env.VITE_DEPLOYMENT_ENVIRONMENT !== "PROD" && (
          <>
            <Route path="/manage" element={<Dashboard />} />
            <Route path="/old-home" element={<DesignEditor />} />
            <Route path="/art-board" element={<ArtBoard />} />
          </>
        )}
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
