// URL do Google Sheets no formato CSV
const googleSheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSh9vsJP8S5B6m_2GA4s89TWcqufGT3_VzNeLYialcVbksXwqIM1QXMQGw23rG2V9L7ljHpWsLvuUeL/pub?gid=660387765&output=csv';

// Obtém o parâmetro "param" da URL
function getParamFromURL() {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    return urlParams.get('param');
}

// Carrega os dados da planilha e aplica as cores
function carregarDados(param) {
    Papa.parse(googleSheetUrl, {
        download: true,
        header: true,
        complete: function(results) {
            const dados = results.data;

            // Busca o registro correspondente ao parâmetro
            const empresaInfo = dados.find(item => item.Param === param);

            if (empresaInfo) {
                // Define as variáveis de cor como propriedades CSS
                document.documentElement.style.setProperty('--primary-color', empresaInfo['Cor primária']);
                document.documentElement.style.setProperty('--secondary-color', empresaInfo['Cor secundária']);
                //console.log('Cores aplicadas:', empresaInfo['Cor primária'], empresaInfo['Cor secundária']);
            } else {
                console.warn(`Nenhuma correspondência encontrada para o parâmetro: ${param}`);
            }
        },
        error: function(error) {
            console.error('Erro ao carregar os dados da planilha:', error);
        }
    });
}

// Função principal para inicializar as cores dinâmicas
function aplicarEstilosDinamicos() {
    const param = getParamFromURL();
    if (param) {
        carregarDados(param);
    } else {
        console.warn('Nenhum parâmetro "param" encontrado na URL.');
    }
}

// Exportando a função para reutilização
export { aplicarEstilosDinamicos };
