# 🚀 Upload widget server

Servidor de suporte ao widget de upload de imagens, criado com **Node.js** e **TypeScript**, com armazenamento local (pode ser facilmente adaptado para S3, Firebase etc.).

---

## 🛠 Estrutura do Projeto

- `src/` – Código-fonte em TypeScript:
  - `app.ts` – Configuração principal do servidor Express.
  - `routes/upload.ts` – Rota para upload de arquivos.
  - `controllers/` – Lógica de armazenamento, validações, limitações de tamanho, extensão etc.
- `.env.example` – Exemplo de variáveis de ambiente:
  - `PORT` – Porta que o servidor vai escutar.
  - `UPLOAD_DIR` – Diretório onde os uploads serão salvos.
- `tsconfig.json` – Configurações do compilador TypeScript.
- `package.json` e `pnpm-lock.yaml` – Dependências e scripts.

---

## 📦 Funcionalidades

- ✅ Aceita upload via `multipart/form-data`.
- ✅ Verifica tamanho e tipo de arquivo (ex: apenas `.jpg`, `.png`, `.gif`).
- ✅ Salva arquivos com nome único no diretório especificado.
- ✅ Retorna JSON com URL/path do arquivo enviado ou mensagem de erro.

---

## ⚙️ Como executar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/mauricioyansen/ftr-upload-widget-server.git
cd ftr-upload-widget-server
```

### 2. Instale as dependências

Usando `pnpm`:

```bash
pnpm install
```

ou com `npm`:

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo de exemplo e edite conforme necessário:

```bash
cp .env.example .env
```

Exemplo de `.env`:

```env
PORT=3000
UPLOAD_DIR=./uploads
```

Crie a pasta de uploads:

```bash
mkdir -p uploads
```

### 4. Inicie o servidor

- Modo de desenvolvimento:

```bash
pnpm dev
```

- Modo de produção:

```bash
pnpm build
pnpm start
```

### 5. Teste o upload

Você pode testar com `curl`:

```bash
curl -F "file=@/caminho/para/arquivo.jpg" http://localhost:3000/upload
```

Resposta esperada:

```json
{
  "url": "/uploads/uniquenome-123abc.jpg"
}
```

---

## 🧩 Integração com Frontend

- Faça um `POST` para: `http://localhost:3000/upload`
- O corpo deve ser `multipart/form-data` com o campo `file`.
- Após a resposta, utilize o campo `url` para exibir ou armazenar a imagem.

---

## 📌 Sugestões de melhorias

- Armazenamento em nuvem (ex: Amazon S3).
- Validação de autenticação (JWT, API keys).
- Redimensionamento ou compressão de imagens.
- Exclusão/listagem de arquivos enviados.
- Limites de upload por usuário.

---

## ✅ Checklist de uso

| Etapa                        | Comando                                    |
|-----------------------------|---------------------------------------------|
| Clonar projeto              | `git clone … && cd ftr-upload-widget-server` |
| Instalar dependências       | `pnpm install`                              |
| Configurar variáveis        | `cp .env.example .env` + editar             |
| Criar pasta de uploads      | `mkdir -p uploads`                          |
| Iniciar servidor            | `pnpm dev` ou `pnpm start`                  |
| Testar upload               | `curl -F file=@minha.jpg localhost:3000/upload` |

---

## 🎯 Conclusão

Com este servidor simples você tem uma API funcional para upload de imagens com mínimo esforço. Basta rodar conforme explicado acima e integrar ao seu frontend.

---

> Feito com ❤️ por [Mauricio Yansen](https://github.com/mauricioyansen)
