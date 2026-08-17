import { BrowserRouter, Routes, Route } from "react-router-dom"
import CadastrarProduto from "./pages/CadastrarProduto"
import Header from "./components/Header"

export default function App() {
  
  return (
    
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<CadastrarProduto />} />
      </Routes>
    </BrowserRouter>
  )
}