import { use, useEffect, useState } from "react";
import "./CadastrarProduto.css";
import ProdutoCard from "../components/Produtos";
import { supabase }  from '../supabaseClient'
const Disponibilidade_Padrao = {
  Delivery: true,
  Salao: true,
  PedidoOnline: true,
  CardapioDigital: true,
  Totem: true,
};

export default function CadastrarProduto() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [disponibilidade, setDisponibilidade] = useState(Disponibilidade_Padrao);
  const [produtos, setProdutos] = useState([]);
  const [editandoID, setEditandoID] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState(null)


  useEffect(() => { buscarProdutos() }, [])

  async function buscarProdutos() {
    setCarregando(true)
    setErro(null)

    const { data, error } = await supabase
    .from('produtos')
    .select('*')
    .order('created_at', { ascending: false})
    

    if(error) {
      console.log(error)
      setErro('Não foi possivel carregar os produtos/pratos...')
    } else {
      setProdutos(data)
    }
    setCarregando(false)
  }

  function handleDisponibilidadeChange(campo) {
    setDisponibilidade((prev) => ({
      ...prev,
      [campo]: !prev[campo],
    }));
  }

  function limparForms(){
    setNome('')
    setPreco('')
    setDescricao('')
    setCategoria('')
    setDisponibilidade(Disponibilidade_Padrao)
    setEditandoID(null)
  }

  async function handleSubmit(enviar) {
    enviar.preventDefault()
    setSalvando(true)
    setErro(null)

    const payload = {
      nome, 
      preco: Number(preco) || 0,
      descricao,
      categoria,
      disponibilidade
    }

    if(editandoID) {
      // para editar dados
      const { error } = await supabase
      .from('produtos')
      .update(payload)
      .eq('id', editandoID)

      if(error){
        console.error(error)
        setErro('Não foi possivel salvar essa edição de dados')
        setSalvando(false)
        return
      }
    } else {
      // caso nao editar ele  vai inserir no banco

      const { error } = await supabase.from('produtos').insert([payload])

      if(error) {
        console.error(error)
        setErro('Não foi possivel cadastrar o produto/prato...')
        setSalvando(false)
        return
      }
    }

    await buscarProdutos()
    limparForms()
    setSalvando(false)
  }

  function handleEditar(prod) {
    setNome(prod.nome)
    setPreco(prod.preco)
    setDescricao(prod.descricao)
    setCategoria(prod.categoria)
    setDisponibilidade(prod.disponibilidade || Disponibilidade_Padrao)
    setEditandoID(prod.id)

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleExcluir(id) {
    const confirmar = window.confirm('Você tem certeza que vai excluir esse prato? Lembrando, não tem como voltar')
    if(!confirmar) return

    setErro(null)
    const { error } = await supabase.from('produtos').delete().eq('id', id)

    if(error){
      console.error(error)
      setErro('Não foi possivel excluir o produto/prato')
      return
    }

    setProdutos((i) => i.filter((prod) => prod.id !== id))

    if(editandoID === id){
      limparForms()
    }
  }
  return (
    <div className="Cadastrar-Produto">
      <h1>Cadastrar Produto</h1>

      {erro && (
        <div className="mensagem-erro" role="alert">
          {erro}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="campo-inicial">
          <label>
            Nome do Produto
            <input
              className="nome-produto"
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
              onChange={() => handleDisponibilidadeChange("Delivery")}
            />
            Delivery
          </label>
          <label>
            <input
              type="checkbox"
              checked={disponibilidade.Salao}
              onChange={() => handleDisponibilidadeChange("Salao")}
            />
            Salão
          </label>
          <label>
            <input
              type="checkbox"
              checked={disponibilidade.PedidoOnline}
              onChange={() => handleDisponibilidadeChange("PedidoOnline")}
            />
            Pedido Online
          </label>
          <label>
            <input
              type="checkbox"
              checked={disponibilidade.CardapioDigital}
              onChange={() => handleDisponibilidadeChange("CardapioDigital")}
            />
            Cardapio Digital
          </label>
          <label>
            <input
              type="checkbox"
              checked={disponibilidade.Totem}
              onChange={() => handleDisponibilidadeChange("Totem")}
            />
            Totem
          </label>
        </div>

       <div className="botao">
          <button type="submit" disabled={salvando}>
            {salvando
              ? "Salvando..."
              : editandoID
              ? "Salvar edição"
              : "Salvar"}
          </button>
          {editandoID && (
            <button
              type="button"
              className="btn-cancelar-edicao"
              onClick={limparForms}
              disabled={salvando}
            >
              Cancelar edição
            </button>
          )}
        </div>
      </form>

      <div className="Lista">
        <h1>Lista de Produtos</h1>

        {carregando ? (
          <p>Carregando produtos...</p>
        ) : produtos.length === 0 ? (
          <p>Nenhum produto cadastrado ainda.</p>
        ) : (
          <div className="grid-produtos">
            {produtos.map((prod) => (
              <ProdutoCard
                key={prod.id}
                prod={prod}
                onEditar={handleEditar}
                onExcluir={handleExcluir}
              ></ProdutoCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
