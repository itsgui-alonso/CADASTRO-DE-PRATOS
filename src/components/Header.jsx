import { FaBars } from "react-icons/fa";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { MdTableRestaurant } from "react-icons/md";
import { AiOutlineContainer } from "react-icons/ai";
import { FaHouseChimneyUser } from "react-icons/fa6";
import { MdOutlineMonetizationOn } from "react-icons/md";
import { MdNotificationsActive } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import "./Header.css"

export default function Header() {
  return (
    <header className="header">
      <div className="parteEsquerda">
        <button className="botao"><FaBars/></button>
        <span className="logo">Saipos</span>
        <span className="usuario">Guilherme Alonso</span>
      </div>

      <div className="parteMeio">
        <button className="icone-btn"><MdOutlineDeliveryDining /></button>
        <button className="icone-btn"><MdTableRestaurant /></button>
        <button className="icone-btn"><AiOutlineContainer /></button>
        <button className="icone-btn"><FaHouseChimneyUser /></button>
      </div>

      <div className="parteDireita">
        <div className="status-aberto">
          <span>Aberto:</span>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>

        <div className="tempo">
            <label>Entrega:</label>
            <select>
                <option>30 min</option>
            </select>
        </div>

        <button className="btn-caixa"><MdOutlineMonetizationOn className="money"/> ABRIR FRENTE DE CAIXA</button>
        <button className="icone-btn"><MdNotificationsActive /></button>
        <button className="icone-btn"><IoPersonSharp /></button>
      </div>
    </header>
  );
}
