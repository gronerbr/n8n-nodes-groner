// Interceptor para capturar requests HTTP do n8n
const https = require('https');
const http = require('http');

// Interceptar requests HTTPS
const originalHttpsRequest = https.request;
https.request = function(...args) {
  const [options, callback] = args;

  console.log('🌐 HTTPS REQUEST:', {
    method: options.method || 'GET',
    hostname: options.hostname,
    port: options.port || 443,
    path: options.path,
    headers: options.headers
  });

  const req = originalHttpsRequest.apply(this, args);

  req.on('response', (res) => {
    console.log('✅ HTTPS RESPONSE:', {
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      headers: res.headers
    });
  });

  req.on('error', (err) => {
    console.log('❌ HTTPS ERROR:', err.message);
  });

  return req;
};

// Interceptar requests HTTP
const originalHttpRequest = http.request;
http.request = function(...args) {
  const [options, callback] = args;

  console.log('🌐 HTTP REQUEST:', {
    method: options.method || 'GET',
    hostname: options.hostname,
    port: options.port || 80,
    path: options.path,
    headers: options.headers
  });

  const req = originalHttpRequest.apply(this, args);

  req.on('response', (res) => {
    console.log('✅ HTTP RESPONSE:', {
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      headers: res.headers
    });
  });

  req.on('error', (err) => {
    console.log('❌ HTTP ERROR:', err.message);
  });

  return req;
};

console.log('🔍 HTTP Interceptor ativado!');
