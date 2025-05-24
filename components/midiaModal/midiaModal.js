const supabaseUrl = 'https://wdmsfmmzaiodwxjyvdtd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkbXNmbW16YWlvZHd4anl2ZHRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI0MTI1OTgsImV4cCI6MjA0Nzk4ODU5OH0.JzFOFNdqNMMk9yneU97XxGIWMlHLjb3PKHffiorT9y4';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

const MidiaModal = {
  campoAlvo: null,
  origem: null,
  arquivoSelecionado: null,

  abrir(origem, idCampo) {
    this.campoAlvo = document.getElementById(idCampo);
    this.origem = origem;
    this.arquivoSelecionado = null;

    fetch('components/midiaModal/midiaModal.html')
      .then(r => r.text())
      .then(html => {
        document.getElementById('modalMidia').innerHTML = html;
        document.getElementById('modalMidia').style.display = 'flex';
        document.body.classList.add('no-scroll');
        this._initEventos();
        this._listarGaleria();
      });
  },

  fechar() {
    document.getElementById('modalMidia').style.display = 'none';
    document.body.classList.remove('no-scroll');
  },

  _initEventos() {
    document.getElementById('btnCancelar').onclick = () => this.fechar();
    document.getElementById('fechar-galeria').onclick = () => this.fechar();
    document.getElementById('fileInput').addEventListener('change', e => this._upload(e.target.files));
    document.getElementById('btnInserir').onclick = () => this._inserirSelecionado();

    const dropArea = document.getElementById('dropArea');
    ['dragenter', 'dragover'].forEach(event => {
      dropArea.addEventListener(event, e => {
        e.preventDefault();
        dropArea.classList.add('highlight');
      });
    });

    ['dragleave', 'drop'].forEach(event => {
      dropArea.addEventListener(event, e => {
        e.preventDefault();
        dropArea.classList.remove('highlight');
      });
    });

    dropArea.addEventListener('drop', e => {
      const files = e.dataTransfer.files;
      this._upload(files);
    });
  },

  _sanitizarNomeArquivo(nome) {
    nome = nome.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    nome = nome.replace(/\s+/g, '-');
    nome = nome.replace(/[^a-zA-Z0-9._-]/g, '');
    return nome.toLowerCase();
  },

  async _upload(arquivos) {
    for (let file of arquivos) {
      const nomeSanitizado = this._sanitizarNomeArquivo(file.name);
      const path = `${this.origem}/${nomeSanitizado}`;
      const { error } = await supabase.storage.from('midia').upload(path, file, { upsert: true });
      if (!error) this._listarGaleria();
    }
  },
  
async _listarGaleria() {
  const galeria = document.getElementById('galeria');
  //galeria.innerHTML = '<div class="loader-galeria">Carregando arquivos...</div>';

  const { data } = await supabase.storage.from('midia').list(this.origem);
  galeria.innerHTML = '';
  if (!data || data.length === 0) {
    galeria.innerHTML = `<div class="mensagem-vazia">Galeria vazia, selecione ou arraste novos arquivos para para a área de upload acima.</div>`;
    document.getElementById('btnInserir').disabled = true;
    return;
  }

  data.forEach(item => {
    const url = `${supabaseUrl}/storage/v1/object/public/midia/${this.origem}/${item.name}`;
    const ext = item.name.split('.').pop().toLowerCase();

    if (!['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf'].includes(ext)) return;

    const card = document.createElement('div');
    card.className = 'item-galeria';

    const img = document.createElement('img');
    if (ext === 'pdf') {
      img.src = 'img/thumb-pdf.png';
    } else {
      img.src = '';
      const temp = new Image();
      temp.onload = () => { img.src = temp.src; };
      temp.src = url;
    }
    card.appendChild(img);

    const titulo = document.createElement('div');
    titulo.className = 'titulo-arquivo';
    titulo.textContent = item.name;
    card.appendChild(titulo);

    const btnRemover = document.createElement('button');
    btnRemover.className = 'btn-remover';
    btnRemover.innerHTML = `<i class='fas fa-trash'>`;
    btnRemover.onclick = async (e) => {
      e.stopPropagation();
      const confirmar = confirm(`Tem certeza que deseja excluir "${item.name}"?`);
      if (!confirmar) return;

      await supabase.storage.from('midia').remove([`${this.origem}/${item.name}`]);
      this._listarGaleria();
    };
    card.appendChild(btnRemover);

    card.onclick = () => {
      document.querySelectorAll('.item-galeria').forEach(el => el.classList.remove('selecionado'));
      card.classList.add('selecionado');
      this.arquivoSelecionado = item.name;
      document.getElementById('btnInserir').disabled = false;
    };

    galeria.appendChild(card);
  });

  document.getElementById('btnInserir').disabled = true;
},

  _inserirSelecionado() {
    if (this.arquivoSelecionado) {
      this.campoAlvo.value = this.arquivoSelecionado;
      this.fechar();
    }
  }
};
