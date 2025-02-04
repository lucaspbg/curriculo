'use strict'
export async function loadMenu(containerSelector) {
    try {
        const response = await fetch('menu.html');
        const menuHTML = await response.text();
        const container = document.querySelector(containerSelector);
        container.innerHTML = menuHTML;

        // Inicializa as funcionalidades do menu
        setupMenu();
        setActiveLink();

        // Garante que o botão toggle funcione
        const toggleButton = container.querySelector('.menu-toggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', toggleMenu);
        }

        const toggleButton_x = container.querySelector('.menu-toggle-x');
        if (toggleButton_x) {
            toggleButton_x.addEventListener('click', toggleMenu);
        }

        const overlay = container.querySelector('.menu-overlay');
        if (overlay) {
            overlay.addEventListener('click', toggleMenu);
        }        
        
    } catch (error) {
        console.error('Erro ao carregar o menu:', error);
    }


    const statusContainer = document.getElementById("containerStatus");
    const tooltip = document.getElementById("tooltip");
    const fecharToltipStatus = document.getElementById("fechar-toltip-status");
    const copiarEnderecoEmail = document.getElementById("copiarEmail");


    // Exibir tooltip no hover
    //statusContainer.addEventListener("mouseenter", () => {
    statusContainer.addEventListener("click", () => {    
        tooltip.classList.add("ativo");
       
        
    });


    // Fechar tooltip ao clicar fora
    document.addEventListener("click", (event) => {
        if (!statusContainer.contains(event.target) && !tooltip.contains(event.target)) {
           tooltip.classList.remove("ativo");
            
        }
    });

    // Fechar tolltip
    fecharToltipStatus.addEventListener("click", () => {
       tooltip.classList.remove("ativo");
        
    });

    copiarEnderecoEmail.addEventListener("click", () => {
        const baseURL = "lucaspereira_borges@hotmail.com";
        // Copia a URL para a área de transferência
        navigator.clipboard.writeText(baseURL).then(() => {
            //alert("O endereço de e-mail lucaspereira_borges@hotmail.com foi copiado para a área de transferência!"); // Feedback visual
            showToast("O e-mail lucaspereira_borges@hotmail.com foi copiado<br>para sua área de trasferência. Cole onde quiser.", "success");
        }).catch(err => {
            console.error("Erro ao copiar para a área de transferência: ", err);
        });
    });



}

function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    const overlay = document.querySelector('.menu-overlay');
    const body = document.body;

    // Alterna o estado ativo do menu
    navbar.classList.toggle('active');

    // Exibe/esconde o overlay com base no estado do menu
    if (navbar.classList.contains('active')) {
        overlay.style.display = 'block';
        body.classList.toggle('no-scroll');
    } else {
        overlay.style.display = 'none';
         body.classList.remove('no-scroll');
    }
}

// Expondo a função ao escopo global

function getBasePath() {
    // Detecta se está no localhost com subdiretório
    if (window.location.origin.includes('localhost')) {
        return '/curriculo'; // Subdiretório local
    }
    return ''; // Produção (sem subdiretório)
}

function setupMenu() {
    // Verificar parâmetros adicionais (se necessário)
    const urlParams = new URLSearchParams(window.location.hash.substr(1));
    const param = urlParams.get('param');


    const basePath = getBasePath();
    // Atualizar os links do menu
    if (param) {
        const curriculoButton = document.getElementById("curriculoButton");
        const videoButton = document.getElementById("videoButton");
        const cursosButton = document.getElementById("cursosButton");
        const leiturasButton = document.getElementById("leiturasButton");
        const sobreButton = document.getElementById("sobreButton");

        if (curriculoButton) curriculoButton.href = basePath + "/#" + "param=" + param;
        if (videoButton) videoButton.href = "video#" + "param=" + param;
        if (cursosButton) cursosButton.href = "cursos-treinamentos#" + "param=" + param;
        if (leiturasButton) leiturasButton.href = "leituras#" + "param=" + param;
        if (sobreButton) sobreButton.href = "sobre#" + "param=" + param;
        
    }else{

        if (curriculoButton) curriculoButton.href = basePath + "/";
        if (videoButton) videoButton.href = "video";
        if (cursosButton) cursosButton.href = "cursos-treinamentos";
        if (leiturasButton) leiturasButton.href = "leituras";
        if (sobreButton) sobreButton.href = "sobre";

    }
    
}


function setActiveLink() {
    const links = document.querySelectorAll('.navbar a');
    const currentPath = window.location.pathname.replace(/\/$/, ''); // Remove barra final
    const homePath = '/'; // Define explicitamente a URL raiz

    links.forEach(link => {
        const linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/$/, ''); // Remove barra final

        // Verifica se o caminho atual é a raiz ou corresponde ao link
        if ((currentPath === homePath && linkPath === homePath) || currentPath === linkPath) {
            link.classList.add('active'); // Adiciona a classe ativa
        } else {
            link.classList.remove('active'); // Remove a classe ativa
        }
    });

}



