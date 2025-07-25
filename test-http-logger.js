// Script para testar captura de requests HTTP
const axios = require('axios');

// Interceptar requests do axios
axios.interceptors.request.use(request => {
  console.log('🌐 HTTP REQUEST:', {
    method: request.method?.toUpperCase(),
    url: request.url,
    headers: request.headers,
    data: request.data
  });
  return request;
});

axios.interceptors.response.use(response => {
  console.log('✅ HTTP RESPONSE:', {
    status: response.status,
    statusText: response.statusText,
    url: response.config.url,
    data: response.data
  });
  return response;
}, error => {
  console.log('❌ HTTP ERROR:', {
    status: error.response?.status,
    statusText: error.response?.statusText,
    url: error.config?.url,
    data: error.response?.data
  });
  return Promise.reject(error);
});

// Teste simples
async function testRequest() {
  try {
    const response = await axios.get('https://httpbin.org/get');
    console.log('Teste concluido');
  } catch (error) {
    console.log('Erro no teste:', error.message);
  }
}

testRequest();
