# API de Gerenciamento de Usuários

Este projeto é uma API RESTful desenvolvida com Node.js, TypeScript e MongoDB, com autenticação via JWT.  
Ela permite o **cadastro, login, listagem, visualização e atualização de usuários**.  
As senhas são armazenadas com segurança (hash), e apenas o próprio usuário pode editar seus dados.

---
### 1. Clone o repositório
```bash
git clone https://github.com/RodrigoFontes377/desafio-fox-back.git
cd desafio-fox-back
```

### 2. Instale as dependências
```bash
pnpm install
```

### 3. Crie o arquivo .env na raiz do projeto

#### Para MongoDB local:
```env
MONGO_URI=mongodb://localhost:27017/usersdb
JWT_SECRET=seuSegredoJWTaqui
```

#### Para MongoDB Atlas:
1. Acesse https://cloud.mongodb.com
2. Crie um cluster gratuito
3. Clique em “Connect” → “Connect your application”
4. Copie a connection string e substitua os valores:
```env
MONGO_URI=mongodb+srv://SEU_USUARIO:SUA_SENHA@SEU_CLUSTER.mongodb.net/usersdb?retryWrites=true&w=majority
JWT_SECRET=seuSegredoJWTaqui
```
5. Adicione seu IP em **Network Access** no painel do Atlas para liberar acesso ao banco.

---

### 4. Inicie a aplicação
```bash
pnpm dev
```

---

## Rotas da API Testadas no Postman

### POST – Cadastrar um novo usuário  
**URL:** `http://localhost:3000/api/users/register`  
**Body:**
```json
{
  "nome": "Lucas Almeida",
  "telefone": "21987654321",
  "email": "lucas@email.com",
  "senha": "senha123",
  "nomeUsuario": "lucasalmeida"
}
```

---

### POST – Login do usuário  
**URL:** `http://localhost:3000/api/users/login`  
**Body:**
```json
{
  "email": "lucas@email.com",
  "senha": "senha123"
}
```

**Resposta:**
```json
{
  "token": "JWT_TOKEN_AQUI"
}
```

---

### 🔒 As rotas abaixo exigem token JWT no header:
```http
Authorization: Bearer SEU_TOKEN_AQUI
```

---

### GET – Listar todos os usuários  
**URL:** `http://localhost:3000/api/users`

---

### GET – Ver usuário por ID  
**URL:** `http://localhost:3000/api/users/:id`  
**Exemplo:**  
`http://localhost:3000/api/users/65f123abc456def7890ghij1`

---

### PUT – Atualizar usuário  
**URL:** `http://localhost:3000/api/users/:id`  
**Body:**
```json
{
  "nome": "Lucas Atualizado",
  "telefone": "21900000000"
}
```

---

## Segurança

- Senhas são criptografadas com **bcryptjs**
- O token JWT tem validade de **1 hora**
- Somente o **próprio usuário** pode atualizar seus dados
