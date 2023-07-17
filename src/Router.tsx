import { BrowserRouter, Routes, Route } from "react-router-dom"
import DesignEditor from "~/views/DesignEditor"
import Dashboard from "~/views/Dashboard"
import HomePage from "./views/HomePage/HomePage"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/manage" element={<Dashboard />} />
        <Route path="/tool-page" element={<DesignEditor />} />
        <Route path="/" element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
