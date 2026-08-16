import { useState } from "react";
import "./CadastrarProduto.css";
import { use } from "react";
export default function CadastrarProduto() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [disponibilidade, setDisponibilidade] = useState({
    Delivery: true,
    Salao: true,
    PedidoOnline: true,
    CardapioDigital: true,
    Totem: true,
  });

  function handleDisponibilidadeChange(campo) {
    setDisponibilidade((prev) => ({
      ...prev,
      [campo]: !prev[campo],
    }))
  }

  function handleSubmit(enviar) {
    enviar.preventDefault();
    const novoProduto = {};
    console.log("Produto Cadastrado: ", novoProduto);
  }
  return (
    <div className="Cadastrar-Produto">
      <h1>Cadastrar Produto</h1>

      <form onSubmit={handleSubmit}>
        <div className="campo-inicial">
          <label>
            Nome do Produto
            <input
              type="text"
              placeholder="Insira um nome deste produto"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
            />
          </label>

          <label>
            Preço
            <input
              type="number"
              step="0.01"
              placeholder="0,00"
              value={preco}
              onChange={(event) => setPreco(event.target.value)}
            />
          </label>
        </div>

        <div className="Campo-detalhes">
          <label>
            Categoria
            <select
              value={categoria}
              onChange={(event) => setCategoria(event.target.value)}
            >
              <option value="">Selecione uma categoria</option>
              <option value="entradas">Entradas</option>
              <option value="bebidas">Bebidas</option>
              <option value="pratos">Pratos</option>
              <option value="sobremeas">Sobremesas</option>
              <option value="diversos">Diversos</option>
            </select>
          </label>

          <label>
            Descrição
            <input
                type="text"
                placeholder="Ex: O verdadeiro sabor da Itália na sua casa! Massa no ponto perfeito com um molho ultra cremoso de ovos e queijo, misturado com muito bacon bem crocante e sequinho. Uma explosão de sabor e cremosidade a cada garfada. Perfeito para matar a sua fome!"
                value={descricao}
                onChange={(event) => setDescricao(event.target.value)}
            ></input>
          </label>
        </div>

        <div className="campo-produtoDisponivel">
            <p>Onde o produdo está diponivel?</p>
            <label>
                <input 
                    type="checkbox"
                    checked={disponibilidade.Delivery} 
                    onChange={() => handleDisponibilidadeChange('Delivery')}
                />
                Delivery
            </label>
            <label>
                <input 
                    type="checkbox"
                    checked={disponibilidade.Salao} 
                    onChange={() => handleDisponibilidadeChange('Salao')}
                />
                Salão
            </label>
            <label>
                <input 
                    type="checkbox"
                    checked={disponibilidade.PedidoOnline} 
                    onChange={() => handleDisponibilidadeChange('PedidoOnline')}
                />
                Pedido Online
            </label>
            <label>
                <input 
                    type="checkbox"
                    checked={disponibilidade.CardapioDigital} 
                    onChange={() => handleDisponibilidadeChange('CardapioDigital')}
                />
                Cardapio Digital
            </label>
            <label>
                <input 
                    type="checkbox"
                    checked={disponibilidade.Totem} 
                    onChange={() => handleDisponibilidadeChange('Totem')}
                />
                Totem
            </label>
        </div>

        <div className="botao">
            <button type="submit">Salvar</button>
        </div>
      </form>

      <button>Ir para Produtos</button>
    </div>
  );
}
