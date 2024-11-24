// Importa o cliente do Supabase
import { supabase } from './supabaseClient.js';

// Obtém o parâmetro "param" da URL
function getParamFromURL() {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    return urlParams.get('param');
}

// Carrega os dados do Supabase e aplica as cores
async function carregarDados(param) {
    try {
        // Consulta a tabela no Supabase com base no parâmetro
        const { data, error } = await supabase
            .from('curriculos')
            .select('*')
            .eq('param', param);

        if (error || data.length === 0) {
            console.warn(`Nenhuma correspondência encontrada para o parâmetro: ${param}`);
            return;
        }

        const empresaInfo = data[0];

        // Define as variáveis de cor como propriedades CSS
        document.documentElement.style.setProperty('--primary-color', empresaInfo['cor_primaria']);
        document.documentElement.style.setProperty('--secondary-color', empresaInfo['cor_secundaria']);
        //console.log('Cores aplicadas:', empresaInfo['cor_primaria'], empresaInfo['cor_secundaria']);
    } catch (err) {
        console.error('Erro ao carregar os dados do Supabase:', err);
    }
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
