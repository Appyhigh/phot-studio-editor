import { BrowserRouter, Routes, Route } from "react-router-dom"
import DesignEditor from "~/views/DesignEditor"
import Dashboard from "~/views/Dashboard"
import HomePage from "./views/HomePage"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/manage" element={<Dashboard />} />
        <Route path="/" element={<DesignEditor />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
