import { BrowserRouter, Routes, Route } from "react-router-dom"
import DesignEditor from "~/views/DesignEditor"
import Dashboard from "~/views/Dashboard"
import HomePage from "./views/HomePage"
import ProductPhotoShoot from "./views/ProductPhotoshoot"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/manage" element={<Dashboard />} />
        <Route path="/" element={<DesignEditor />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/product-photoshoot" element={<ProductPhotoShoot />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
