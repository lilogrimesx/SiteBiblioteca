const listaLivros = document.getElementById("listaLivros");
const listaMangas = document.getElementById("listaMangas");
const formLivro = document.getElementById("formLivro");

const detalheImagem = document.getElementById("detalheImagem");
const detalheTitulo = document.getElementById("detalheTitulo");
const detalheAutor = document.getElementById("detalheAutor");
const detalheCategoria = document.getElementById("detalheCategoria");
const detalhePreco = document.getElementById("detalhePreco");
const detalheDescricao = document.getElementById("detalheDescricao");

let livros = [
  {
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
    preco: "R$ 29,90",
    categoria: "Literatura Brasileira",
    descricao: "Um dos maiores clássicos da literatura brasileira.",
    capa: "https://m.media-amazon.com/images/I/416E0ngf0xL._SY445_SX342_ML2_.jpg"
  },
  {
    titulo: "O Pequeno Príncipe",
    autor: "Antoine de Saint-Exupéry",
    preco: "R$ 24,90",
    categoria: "Fantasia",
    descricao: "Uma história poética sobre amizade, infância e imaginação.",
    capa: "https://m.media-amazon.com/images/I/41+Qj-qZPOL._SY445_SX342_ML2_.jpg"
  },
  {
    titulo: "1984",
    autor: "George Orwell",
    preco: "R$ 39,90",
    categoria: "Ficção",
    descricao: "Um clássico sobre controle, vigilância e sociedade.",
    capa: "https://m.media-amazon.com/images/I/51VXYaKO-sL._SY445_SX342_ML2_.jpg"
  }
];

let mangas = [
  {
    titulo: "Jujutsu Kaisen",
    autor: "Masashi Kishimoto",
    preco: "R$ 34,90",
    categoria: "Shounen",
    descricao: "Uma história de um jovem feiticeiro chamado Itadori Yuji",
    capa: "https://m.media-amazon.com/images/I/81s+jxE5KEL._SY466_.jpg"
  },
  {
    titulo: "One Piece",
    autor: "Eiichiro Oda",
    preco: "R$ 39,90",
    categoria: "Aventura",
    descricao: "A aventura de Luffy e sua tripulação em busca do One Piece.",
    capa: "https://m.media-amazon.com/images/I/91NxYvUNf6L._SY466_.jpg"
  },
  {
    titulo: "Demon Slayer",
    autor: "Koyoharu Gotouge",
    preco: "R$ 32,90",
    categoria: "Ação",
    descricao: "Tanjiro luta contra demônios para salvar sua irmã Nezuko.",
    capa: "https://m.media-amazon.com/images/I/71oZmNhST-L._SY342_.jpg"
  }
];

function criarCard(item, tipo) {
  const card = document.createElement("article");
  card.classList.add("card");

  if (tipo === "manga") {
    card.classList.add("manga-card");
  }

  card.innerHTML = `
    <img src="${item.capa}" alt="Capa de ${item.titulo}">

    <div class="info-card">
      <h3>${item.titulo}</h3>
      <p>Autor: ${item.autor}</p>
      <p class="preco">${item.preco}</p>
      <button class="botao">Ver detalhes</button>
    </div>
  `;

  const botao = card.querySelector(".botao");

  botao.addEventListener("click", function() {
    verDetalhes(item);
  });

  return card;
}

function mostrarLivros() {
  listaLivros.innerHTML = "";

  livros.forEach(function(livro) {
    const card = criarCard(livro, "livro");
    listaLivros.appendChild(card);
  });
}

function mostrarMangas() {
  listaMangas.innerHTML = "";

  mangas.forEach(function(manga) {
    const card = criarCard(manga, "manga");
    listaMangas.appendChild(card);
  });
}

function verDetalhes(item) {
  detalheImagem.src = item.capa;
  detalheImagem.alt = `Capa de ${item.titulo}`;
  detalheTitulo.textContent = item.titulo;
  detalheAutor.textContent = item.autor;
  detalheCategoria.textContent = item.categoria;
  detalhePreco.textContent = item.preco;
  detalheDescricao.textContent = item.descricao;

  document.getElementById("detalhes").scrollIntoView({ behavior: "smooth" });
}

formLivro.addEventListener("submit", function(event) {
  event.preventDefault();

  const tipo = document.getElementById("tipo").value;
  const titulo = document.getElementById("titulo").value;
  const autor = document.getElementById("autor").value;
  const precoInput = document.getElementById("preco").value;
  const categoria = document.getElementById("categoria").value;
  const descricao = document.getElementById("descricao").value;
  const capaArquivo = document.getElementById("capa").files[0];

  if (isNaN(precoInput) || precoInput.trim() === "") {
    alert("Digite apenas números no campo preço.");
    return;
  }

  const preco = `R$ ${Number(precoInput).toFixed(2).replace(".", ",")}`;

  const leitor = new FileReader();

  leitor.onload = function() {
    const novoItem = {
      titulo: titulo,
      autor: autor,
      preco: preco,
      categoria: categoria,
      descricao: descricao,
      capa: leitor.result
    };

    if (tipo === "manga") {
      mangas.push(novoItem);
      mostrarMangas();
      document.getElementById("mangas").scrollIntoView({ behavior: "smooth" });
    } else {
      livros.push(novoItem);
      mostrarLivros();
      document.getElementById("livros").scrollIntoView({ behavior: "smooth" });
    }

    formLivro.reset();
    alert("Cadastro realizado com sucesso!");
  };

  leitor.readAsDataURL(capaArquivo);
});

mostrarLivros();
mostrarMangas();
