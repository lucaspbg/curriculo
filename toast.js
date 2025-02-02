// Aguarda o carregamento do DOM
document.addEventListener("DOMContentLoaded", function () {
    // Carrega o toast.html dentro da página
    fetch("toast.html")
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML("beforeend", html);
        });
});

// Função para exibir o Toast
function showToast(message, type = "info") {
    const toastContainer = document.getElementById("toastContainer");

    if (!toastContainer) {
        console.error("Elemento #toastContainer não encontrado.");
        return;
    }

    const toast = document.createElement("div");
    toast.classList.add("toast", `toast-${type}`);
    toast.innerHTML = `<span>${message}</span>`;

    // Adiciona a notificação ao container
    toastContainer.appendChild(toast);

    // Remove o toast após alguns segundos
    setTimeout(() => {
        toast.classList.add("fade-out");
        setTimeout(() => toast.remove(), 700); // Tempo da animação
    }, 4000);
}
