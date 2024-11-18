function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}

function setupMenu() {
    // Capturar o parâmetro de hash na URL
    const urlParams = new URLSearchParams(window.location.hash.substr(1));
    const param = urlParams.get('param');

    // Atualizar os links do menu
    if (param) {
        const curriculoButton = document.getElementById("curriculoButton");
        const videoButton = document.getElementById("videoButton");
        const cursosButton = document.getElementById("cursosButton");
        const leiturasButton = document.getElementById("leiturasButton");

        if (curriculoButton) curriculoButton.href = "index?" + "param=" + param;
        if (videoButton) videoButton.href = "video#" + "param=" + param;
        if (cursosButton) cursosButton.href = "cursos-treinamentos#" + "param=" + param;
        if (leiturasButton) leiturasButton.href = "leituras#" + "param=" + param;
    }
}
