// Script para debugar o problema do statusId
const axios = require('axios');

// Interceptar requests para a API do Groner
axios.interceptors.request.use(request => {
  if (request.url && request.url.includes('api.groner.app')) {
    console.log('🌐 GRONER REQUEST:', {
      method: request.method?.toUpperCase(),
      url: request.url,
      params: request.params,
      data: request.data,
      headers: {
        'Authorization': request.headers.Authorization ? 'Bearer ***' : 'None',
        'Content-Type': request.headers['Content-Type']
      }
    });
  }
  return request;
});

axios.interceptors.response.use(response => {
  if (response.config.url && response.config.url.includes('api.groner.app')) {
    console.log('✅ GRONER RESPONSE:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
  }
  return response;
}, error => {
  if (error.config?.url && error.config.url.includes('api.groner.app')) {
    console.log('❌ GRONER ERROR:', {
      status: error.response?.status,
      url: error.config.url,
      data: error.response?.data
    });
  }
  return Promise.reject(error);
});

console.log('🔍 Groner Debug Interceptor ativado!');
console.log('📋 Vai capturar todos os requests para api.groner.app');
