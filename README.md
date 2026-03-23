# 🐦 Mini Twitter

Uma mini rede social desenvolvida como desafio técnico para o processo seletivo da **B2Bit**. O projeto permite que usuários se cadastrem, façam login, publiquem posts, curtam publicações e interajam com outros usuários.

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Finalidade |
|---|---|
| **React 19** | Biblioteca principal para construção da interface |
| **TypeScript** | Tipagem estática para maior segurança e produtividade |
| **Vite** | Bundler e servidor de desenvolvimento |
| **Tailwind CSS** | Estilização utilitária com suporte a tema claro/escuro |
| **Axios** | Requisições HTTP para o backend |
| **TanStack Query** | Gerenciamento de estado do servidor, cache e scroll infinito |
| **React Hook Form** | Controle de formulários de forma performática |
| **Zod** | Validação de schemas nos formulários |
| **React Router DOM** | Navegação entre páginas |
| **React Hot Toast** | Notificações de feedback ao usuário |
| **Vitest** | Framework de testes unitários |
| **React Testing Library** | Testes de componentes React |
| **Lucide React** | Ícones da interface |

---

## ✅ Funcionalidades Implementadas

### 🔐 Autenticação
- Registro de novo usuário com validação de e-mail
- Login com armazenamento de JWT no `localStorage`
- Logout com invalidação do token no backend
- Rotas protegidas — redireciona para `/login` se não autenticado

### 📝 Posts
- Timeline paginada com scroll infinito
- Busca dinâmica de posts por título
- Criação de post com título, conteúdo e imagem (URL)
- Edição de posts próprios
- Exclusão de posts próprios
- Botões de editar/deletar visíveis apenas para o autor do post
- Tratamento do erro 403 em ações não autorizadas

### ❤️ Interações
- Curtir e descurtir posts com atualização visual imediata (Optimistic Update)
- Contador de likes atualizado em tempo real

---

## ⭐ Extras Implementados

- ✅ **Scroll Infinito** — carregamento automático de posts ao chegar no final da lista
- ✅ **Modo Dark/Light** — alternância de tema com persistência no `localStorage`
- ✅ **Estado Global** — Context API para gerenciar tema e dados do usuário autenticado
- ✅ **Testes Unitários** — Vitest + React Testing Library cobrindo os componentes principais

---

## 📁 Estrutura do Projeto

```
src/
├── components/       # Componentes reutilizáveis (PostCard, CreatePost, Button, Input...)
├── contexts/         # Context API (AuthContext)
├── hooks/            # Hooks customizados (useAuth)
├── lib/              # Configuração do Axios com interceptor de token
├── pages/            # Páginas da aplicação (home, login, register)
├── services/         # Funções de comunicação com a API (authService, postService)
├── styles/           # Estilos globais e variáveis de tema CSS
├── types/            # Interfaces e tipos TypeScript
└── validations/      # Schemas de validação com Zod
```

---

## 🛠️ Como Rodar o Projeto

### Pré-requisitos
- Node.js 18+
- pnpm
- Docker (para o backend)

### 1. Clone o repositório

```bash
git clone https://github.com/Freitas024/mini-twitter.git
cd mini-twitter
```

### 2. Suba o backend com Docker

```bash
cd mini-twitter-backend
docker-compose up -d
```

O backend estará disponível em `http://localhost:3000`.

Para popular o banco com dados iniciais:
```bash
docker exec -it <nome_do_container> bun run seed
```

### 3. Instale as dependências do frontend

```bash
pnpm install
```

### 4. Inicie o servidor de desenvolvimento

```bash
pnpm dev
```

O frontend estará disponível em `http://localhost:5173`.

---

## 🧪 Rodando os Testes

```bash
pnpm test
```

---

## 💡 Decisões Técnicas

- **TanStack Query com `useInfiniteQuery`** — escolhido para implementar o scroll infinito de forma nativa, gerenciando cache por página automaticamente.
- **Optimistic Update no like** — como o backend não retorna o campo `likedByMe` na listagem de posts, o estado visual do like é atualizado imediatamente no cache local sem aguardar a resposta da API, proporcionando melhor experiência ao usuário.
- **Context API em vez de Zustand** — para o escopo do projeto, a Context API nativa do React foi suficiente para gerenciar o tema e os dados do usuário, evitando dependências desnecessárias.
- **Interceptor no Axios** — o token JWT é injetado automaticamente em todas as requisições via interceptor, eliminando a necessidade de passar o header manualmente em cada chamada.
- **Zod + React Hook Form** — a integração via `zodResolver` permite definir as regras de validação em um único lugar e reutilizá-las tanto na validação do formulário quanto na tipagem TypeScript via `z.infer`.

---

## 👨‍💻 Desenvolvido por

**Vinicius de Freitas e Silva**
