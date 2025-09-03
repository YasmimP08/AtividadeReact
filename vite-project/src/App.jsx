import { BrowserRouter, Routes, Route } from "react-router-dom"

import RootLayout from "./layouts/RootLayout"
import Home from "./pages/Home"
import Sobre from "./pages/Sobre"
import Favoritos from "./pages/Favoritos"
import NotFound from "./pages/NotFound"
import "./styleCSS/style.css";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="sobre/:imdbID" element={<Sobre />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}