# 📋 Como Usar Content.List com o Node Groner

## 🎯 **O que é Content.List?**

O **Content.List** é um node do n8n que permite percorrer (iterar) sobre arrays/listas de dados. É muito útil para processar múltiplos itens retornados por APIs.

## 🔄 **Exemplo Prático: Percorrer Deals**

### **1. Configuração do Workflow:**

```
[Groner: Search Deals] → [Content.List] → [Groner: Edit Deal] → [Resultado]
```

### **2. Passo a Passo:**

#### **Passo 1: Node Groner (Search Deals)**
```
Resource: Deal
Operation: Search
Page Size: 20
Query: (deixe vazio para buscar todos)
```

**Resultado esperado:**
```json
{
  "data": [
    {
      "id": 123,
      "name": "Deal 1",
      "value": 5000,
      "status": "Open"
    },
    {
      "id": 124,
      "name": "Deal 2", 
      "value": 3000,
      "status": "Closed"
    }
  ]
}
```

#### **Passo 2: Node Content.List**
```
Configuration:
- Input Data: {{ $json.data }}
- Output Field Name: deal
```

**O que isso faz:**
- Pega o array `data` do resultado do Groner
- Para cada item do array, cria uma nova execução
- Cada item fica disponível como `{{ $json.deal }}`

#### **Passo 3: Node Groner (Edit Deal)**
```
Resource: Deal
Operation: Edit
Deal ID: {{ $json.deal.id }}
Additional Fields:
  - Note: "Processado em {{ $now }}"
```

## 📊 **Exemplos de Uso**

### **Exemplo 1: Atualizar Status de Todos os Deals**

```
[Groner: Search Deals] → [Content.List] → [Groner: Move Deal]
```

**Configuração Content.List:**
```
Input Data: {{ $json.data }}
Output Field Name: deal
```

**Configuração Move Deal:**
```
Resource: Deal
Operation: Move
Deal ID: {{ $json.deal.id }}
Status Name or ID: "Em Negociação"
```

### **Exemplo 2: Adicionar Tags em Deals**

```
[Groner: Search Deals] → [Content.List] → [Groner: Add Tag]
```

**Configuração Add Tag:**
```
Resource: Deal
Operation: Add Tag
Deal ID: {{ $json.deal.id }}
Tag Name: "Processado"
```

### **Exemplo 3: Enviar WhatsApp para Contatos**

```
[Groner: Search Deals] → [Content.List] → [Groner: Send WhatsApp]
```

**Configuração Send WhatsApp:**
```
Resource: WhatsApp
Operation: Send
Contact ID: {{ $json.deal.contactId }}
Message: "Olá! Seu deal {{ $json.deal.name }} está sendo processado."
```

## 🔧 **Configurações Avançadas**

### **Filtrar Antes de Processar:**

```
[Groner: Search Deals] → [IF] → [Content.List] → [Groner: Edit Deal]
```

**Node IF:**
```
Condition: {{ $json.data.length > 0 }}
```

### **Processar Apenas Deals Específicos:**

```
[Groner: Search Deals] → [Content.List] → [IF] → [Groner: Edit Deal]
```

**Node IF (dentro do Content.List):**
```
Condition: {{ $json.deal.value > 1000 }}
```

### **Limitar Quantidade:**

```
[Groner: Search Deals] → [Content.List] → [Groner: Edit Deal]
```

**Configuração Content.List:**
```
Input Data: {{ $json.data }}
Output Field Name: deal
Max Items: 10  // Processa apenas os primeiros 10
```

## 📋 **Campos Disponíveis nos Deals**

Quando você usa `{{ $json.deal }}`, tem acesso a:

```json
{
  "id": 123,
  "name": "Nome do Deal",
  "value": 5000.00,
  "status": "Open",
  "contactId": 456,
  "responsibleId": 789,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T14:20:00Z",
  "stage": "Proposta",
  "dealType": "Venda",
  "city": "São Paulo",
  "state": "SP"
}
```

## 🚀 **Exemplo Completo: Workflow de Processamento**

### **Objetivo:** Atualizar todos os deals com valor > 1000

```
1. [Groner: Search Deals]
   - Resource: Deal
   - Operation: Search
   - Page Size: 50

2. [Content.List]
   - Input Data: {{ $json.data }}
   - Output Field Name: deal

3. [IF]
   - Condition: {{ $json.deal.value > 1000 }}

4. [Groner: Edit Deal]
   - Resource: Deal
   - Operation: Edit
   - Deal ID: {{ $json.deal.id }}
   - Additional Fields:
     - Note: "Deal de alto valor processado em {{ $now }}"

5. [Groner: Add Tag]
   - Resource: Deal
   - Operation: Add Tag
   - Deal ID: {{ $json.deal.id }}
   - Tag Name: "Alto Valor"
```

## ⚠️ **Dicas Importantes**

### **1. Performance:**
- Use `Page Size` adequado (10-50 itens)
- Evite processar milhares de itens de uma vez

### **2. Rate Limiting:**
- APIs têm limites de requisições
- Use delays entre operações se necessário

### **3. Error Handling:**
```
[Content.List] → [IF] → [Groner: Edit Deal]
                ↓
            [Error Handler]
```

### **4. Logging:**
```
[Groner: Edit Deal] → [Set] → [Log]
```

**Node Set:**
```
Fields to Set:
- processed: "Deal {{ $json.deal.id }} processado"
- timestamp: "{{ $now }}"
```

## 🎯 **Casos de Uso Comuns**

1. **Sincronização:** Atualizar deals em lote
2. **Notificações:** Enviar mensagens para múltiplos contatos
3. **Relatórios:** Processar dados para relatórios
4. **Limpeza:** Remover tags antigas de deals
5. **Migração:** Mover deals entre status

**🎉 Agora você pode processar todos os seus deals automaticamente!** 
