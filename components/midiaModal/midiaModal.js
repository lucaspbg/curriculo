document.addEventListener("DOMContentLoaded", function () {
  fetch("components/midiaModal/midiaModal.html")
    .then(res => res.text())
    .then(html => {
      document.body.insertAdjacentHTML("beforeend", html);
      MidiaModal._conectarEventos();
    });

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "components/midiaModal/midiaModal.css";
  document.head.appendChild(link);
});

const MidiaModal = {
  campoAlvo: null,
  arquivos: [],
  selecionado: null,

  abrir(origem, idCampo) {
    this.campoAlvo = document.getElementById(idCampo);
    const modal = document.getElementById("modalMidia");
    if (modal) {
      modal.style.display = "flex";
      modal.innerHTML = `
<div class="modal-content">
  <div class="header-midia">
    <h2>Biblioteca de Mídia</h2>
    <div class="fechar-galeria" id="fechar-galeria"><i class="fas fa-times"></i></div>
  </div>

  <div id="areaUpload" class="area-upload">
    <div id="dropArea" class="drop-area">
      <p>Solte novos arquivos aqui para upload<br><span>ou</span></p>
      <label class="botao-upload">
        Selecionar novos arquivos
        <input type="file" id="fileInput" multiple accept="image/*,application/pdf" hidden>
      </label>
    </div>
  </div>

  <div id="galeria" class="gallery"></div>

  <div class="botoes-modal">
    <button id="btnInserir" disabled>Inserir</button>
    <button id="btnCancelar">Cancelar</button>
  </div>
</div>`;
      document.body.classList.add('no-scroll');
      this._conectarEventos();
    }
  },

  fechar() {
    const modal = document.getElementById("modalMidia");
    if (modal) modal.style.display = "none";
    document.body.classList.remove('no-scroll');
    this.arquivos = [];
    this.selecionado = null;
  },

  async uploadArquivos(arquivos) {
    for (let file of arquivos) {
      const reader = new FileReader();
      const wrapper = document.createElement("div");
      wrapper.className = "item-galeria";

      const progressBar = document.createElement("div");
      progressBar.className = "progress-bar";
      const progressInner = document.createElement("div");
      progressInner.className = "progress-bar-inner";
      progressBar.appendChild(progressInner);
      wrapper.appendChild(progressBar);
      document.getElementById("galeria").appendChild(wrapper);

      reader.onloadstart = () => {
        progressInner.style.width = "0%";
      };

      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = (e.loaded / e.total) * 100;
          progressInner.style.width = percent + "%";
        }
      };

      reader.onload = (e) => {
        this.arquivos.push({ nome: file.name, tipo: file.type, src: e.target.result });
        this._renderGaleria();
        document.getElementById("btnInserir").disabled = false;
      };

      reader.readAsDataURL(file);
    }
  },

  inserir() {
    if (this.selecionado !== null && this.campoAlvo) {
      const arquivo = this.arquivos[this.selecionado];
      this.campoAlvo.value = arquivo.nome;
      this.fechar();
    }
  },

  remover(index) {
    if (confirm("Deseja realmente remover este arquivo?")) {
      this.arquivos.splice(index, 1);
      if (this.selecionado === index) {
        this.selecionado = null;
      }
      this._renderGaleria();
      if (this.arquivos.length === 0) {
        document.getElementById("btnInserir").disabled = true;
      }
    }
  },

  _renderGaleria() {
    const galeria = document.getElementById("galeria");
    galeria.innerHTML = "";

    this.arquivos.forEach((arquivo, index) => {
      const item = document.createElement("div");
      item.className = "item-galeria";
      if (index === this.selecionado) item.classList.add("selecionado");

      item.onclick = () => {
        this.selecionado = index;
        this._renderGaleria();
        document.getElementById("btnInserir").disabled = false;
      };

      let conteudo;
      if (arquivo.tipo.startsWith("image/")) {
        conteudo = `<img src="${arquivo.src}" alt="${arquivo.nome}" />`;
      } else if (arquivo.tipo === "application/pdf") {
        conteudo = `<iframe src="${arquivo.src}"></iframe>`;
      } else {
        conteudo = `<span>Arquivo não suportado</span>`;
      }

      item.innerHTML = `${conteudo}<div class='titulo-arquivo'>${arquivo.nome}</div>`;

      const btnX = document.createElement("button");
      btnX.className = "btn-remover";
      btnX.innerHTML = "<i class='fas fa-trash'></i>";
      btnX.onclick = (e) => {
        e.stopPropagation();
        this.remover(index);
      };

      item.appendChild(btnX);
      galeria.appendChild(item);
    });
  },

  _conectarEventos() {
    const fileInput = document.getElementById("fileInput");
    const dropArea = document.getElementById("dropArea");

    fileInput.onchange = (e) => {
      if (e.target.files.length) this.uploadArquivos(e.target.files);
    };

    dropArea.ondragover = (e) => {
      e.preventDefault();
      dropArea.classList.add("hover");
    };
    dropArea.ondragleave = () => dropArea.classList.remove("hover");
    dropArea.ondrop = (e) => {
      e.preventDefault();
      dropArea.classList.remove("hover");
      if (e.dataTransfer.files.length) this.uploadArquivos(e.dataTransfer.files);
    };

    document.getElementById("btnCancelar").onclick = () => this.fechar();
    document.getElementById("fechar-galeria").onclick = () => this.fechar();
    document.getElementById("btnInserir").onclick = () => this.inserir();
  }
};
