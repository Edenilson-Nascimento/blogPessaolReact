import axios from 'axios';

// Exemplo: Substitua pela URL REAL que o Railway te der!
export const api = axios.create({
    baseURL: 'https://blogpessoal-production.up.railway.app'
})

export const cadastroUsuario = async(url: string, dados: any, setDado: (data: any) => void) => {
    const resposta = await api.post(url, dados);
    setDado(resposta.data);
}

export const login = async(url: string, dados: any, setDado: (token: string) => void) => {
    const resposta = await api.post(url, dados);
    setDado(resposta.data.token);
}

export const busca = async(url: string, setDados: (data: any) => void, header: any) => {
    const resposta = await api.get(url, header);
    setDados(resposta.data);
}

export const buscaId = async(url: string, setDados: (data: any) => void, header: any) => {
    const resposta = await api.get(url, header);
    setDados(resposta.data);
}

export const post = async(url: string, dados: any, setDados: (data: any) => void, header: any) => {
    const resposta = await api.post(url, dados, header);
    setDados(resposta.data);
}

export const put = async(url: string, dados: any, setDados: (data: any) => void, header: any) => {
    const resposta = await api.put(url, dados, header);
    setDados(resposta.data);
}

export const deleteId = async(url: string, header: any) => {
    await api.delete(url, header);
}
