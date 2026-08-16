import { BrowserRouter, Routes, Route } from "react-router-dom"
import CadastrarProduto from "./pages/CadastrarProduto"
import ListaProdutos from "./pages/ListaProdutos"

export default function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/listaProdutos" element={<ListaProdutos />} />
        <Route path="/" element={<CadastrarProduto />} />
      </Routes>
    </BrowserRouter>
  )
}