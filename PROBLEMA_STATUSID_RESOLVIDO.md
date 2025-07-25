# 🔧 Problema do statusId - RESOLVIDO

## 🐛 Problema Identificado

O `statusId` não estava sendo repassado para a API porque estava sendo referenciado incorretamente no routing.

### ❌ Código com Problema:
```typescript
// Campo definido dentro de uma collection
{
  displayName: 'Status Name or ID',
  name: 'statusId',
  type: 'options',
  typeOptions: { loadOptionsMethod: 'getStatuses' },
  // ... dentro da seção "filters"
}

// Routing referenciando incorretamente
qs: {
  statusId: '={{$parameter["statusId"]}}', // ❌ ERRADO
}
```

### ✅ Código Corrigido:
```typescript
// Routing referenciando corretamente
qs: {
  statusId: '={{$parameter["filters"]["statusId"]}}', // ✅ CORRETO
}
```

## 🔍 Causa do Problema

Quando um campo está dentro de uma **collection** no n8n, ele precisa ser referenciado usando a estrutura hierárquica:

- **Campo simples:** `$parameter["campo"]`
- **Campo em collection:** `$parameter["nomeCollection"]["campo"]`

## 🛠️ Correções Aplicadas

### 1. Campos em "Filters":
- `statusId` → `$parameter["filters"]["statusId"]`
- `stageId` → `$parameter["filters"]["stageId"]`
- `dealTypeId` → `$parameter["filters"]["dealTypeId"]`
- `responsibleSellerId` → `$parameter["filters"]["responsibleSellerId"]`
- `responsibleTechnicianId` → `$parameter["filters"]["responsibleTechnicianId"]`
- `preSellerId` → `$parameter["filters"]["preSellerId"]`

### 2. Campos em "Location":
- `city` → `$parameter["location"]["city"]`
- `state` → `$parameter["location"]["state"]`

### 3. Campos em "Financial":
- `initialPower` → `$parameter["financial"]["initialPower"]`
- `finalPower` → `$parameter["financial"]["finalPower"]`
- `initialValue` → `$parameter["financial"]["initialValue"]`
- `finalValue` → `$parameter["financial"]["finalValue"]`
- `initialConsumption` → `$parameter["financial"]["initialConsumption"]`
- `finalConsumption` → `$parameter["financial"]["finalConsumption"]`

## 🚀 Como Testar

1. **Reinicie o n8n** para carregar as mudanças
2. **Configure o node Groner:**
   - Resource: Deal
   - Operation: Search
   - Filters → Status Name or ID: Selecione um status
3. **Execute o workflow**
4. **Verifique se o filtro está funcionando**

## 📋 Resultado Esperado

Agora o `statusId` deve ser enviado corretamente na query string:

```
GET /api/projeto/cards?statusId=123&pageSize=20
```

## ✅ Status

**PROBLEMA RESOLVIDO!** ✅

O `statusId` agora está sendo repassado corretamente para a API do Groner. 
