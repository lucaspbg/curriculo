'use strict'
export async function loadMenu(containerSelector) {
    try {
        const response = await fetch('menu-adm.html');
        const menuHTML = await response.text();
        const container = document.querySelector(containerSelector);
        container.innerHTML = menuHTML;

        // Inicializa as funcionalidades do menu
        //setupMenu();
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
}

function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    const overlay = document.querySelector('.menu-overlay');

    // Alterna o estado ativo do menu
    navbar.classList.toggle('active');

    // Exibe/esconde o overlay com base no estado do menu
    if (navbar.classList.contains('active')) {
        overlay.style.display = 'block';
    } else {
        overlay.style.display = 'none';
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
/*
function setupMenu() {
    // Verificar parâmetros adicionais (se necessário)
    const urlParams = new URLSearchParams(window.location.hash.substr(1));
    const param = urlParams.get('param');


    const basePath = getBasePath();
    // Atualizar os links do menu
    if (param) {
        const cadastroLeiturasButton = document.getElementById("cadastro-leituras");
        const cadastroTreinamentosButton = document.getElementById("cadastro-treinamentos");
        const cadastroCurriculoButton = document.getElementById("cadastro-curriculos");
 
        
        if (cadastroLeiturasButton) cadastroLeiturasButton.href = "cadastro-leituras";
        if (cadastroTreinamentosButton) cadastroTreinamentosButton.href = "cadastro-treinamentos";
        if (cadastroCurriculoButton) cadastroCurriculoButton.href = "cadastro-curriculos";

    }
    
}*/


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