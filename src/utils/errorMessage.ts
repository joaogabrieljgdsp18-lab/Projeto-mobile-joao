import axios from 'axios';

export function getRequestErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.code === 'ECONNABORTED') return 'A solicitação demorou demais. Tente novamente.';
    if (!error.response) return 'Sem conexão com a internet. Verifique sua rede.';
  }
  return 'Não foi possível carregar os dados. Tente novamente.';
}
