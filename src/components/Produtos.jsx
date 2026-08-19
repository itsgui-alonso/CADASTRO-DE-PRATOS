import React from "react";
import "./Produtos.css";
import imagemDelivery from "../assets/Delivery.jpg";

export default function ProdutoCard({ prod, onEditar, onExcluir }) {
  return (
    <div className="card-produto">
      
      <img
        src={imagemDelivery}
        className="card-produto-img"
      />

      
      <div className="card-produto-conteudo">
        <h3 className="card-produto-titulo">{prod.nome}</h3>

        <div className="card-produto-campo">
          <h4 className="card-produto-Descricao">Descrição</h4>
          <p>{prod.descricao}</p>
        </div>

        <div className="card-produto-linha">
          <strong>Categoria:</strong> <span>{prod.categoria}</span>
        </div>

        <div className="card-produto-linha">
          <strong>Preço:</strong> <span>R$ {prod.preco}</span>
        </div>

        
        <div className="card-produto-rodape">
          <div className="card-produto-disponivel">
            <strong>Disponivel</strong>{" "}
            <span>
              {Object.keys(prod.disponibilidade)
                .filter((local) => prod.disponibilidade[local])
                .join(", ")}
            </span>
          </div>

          <div className="card-produto-botoes">
            <button
              type="button"
              className="btn-card btn-excluir"
              onClick={() => onExcluir(prod.id)}
            >
              Excluir
            </button>
            <button
              type="button"
              className="btn-card btn-editar"
              onClick={() => onEditar(prod)}
            >
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}