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


function setupMenu() {
    // Verificar parâmetros adicionais (se necessário)
    const urlParams = new URLSearchParams(window.location.hash.substr(1));
    const param = urlParams.get('param');

    // Atualizar os links do menu
    if (param) {
        const curriculoButton = document.getElementById("curriculoButton");
        const videoButton = document.getElementById("videoButton");
        const cursosButton = document.getElementById("cursosButton");
        const leiturasButton = document.getElementById("leiturasButton");

        if (curriculoButton) curriculoButton.href = "index#" + "param=" + param;
        if (videoButton) videoButton.href = "video#" + "param=" + param;
        if (cursosButton) cursosButton.href = "cursos-treinamentos#" + "param=" + param;
        if (leiturasButton) leiturasButton.href = "leituras#" + "param=" + param;
    }
    
}


function setActiveLink() {
    const links = document.querySelectorAll('.navbar a');
    const currentPath = window.location.pathname.replace(/\/$/, ''); // Remove barra final
    const currentURL = window.location.href; // URL completa para comparação de parâmetros

    links.forEach(link => {
        const linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/$/, ''); // Remove barra final

        // Verifica correspondência exata do caminho ou similaridade com a URL completa
        if (currentPath === linkPath || currentURL.includes(link.getAttribute('href'))) {
            link.classList.add('active'); // Adiciona a classe ativa
        } else {
            link.classList.remove('active'); // Remove a classe ativa
        }
    });
}
