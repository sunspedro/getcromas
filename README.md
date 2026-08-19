# GetCromas

Gerador de paletas de cores com IA a partir de um briefing textual. Descreva o projeto — segmento, sensação, estilo — e receba uma paleta de 5 cores com funções definidas, análise de contraste WCAG, pontos positivos/atenção e referências visuais.

## Funcionalidades

- **Briefing livre** — descreva o projeto em linguagem natural
- **Paleta estruturada** — 5 cores com papéis: Background, Primary, Text, Secondary e Accent
- **Contraste WCAG** — combinações avaliadas com ratio e situação (aprovado/não recomendado)
- **Análise da paleta** — descrição, pontos positivos, pontos de atenção e referências
- **Modal de contraste** — visualização interativa das combinações de cores
- **Animações** — transições na home, loading e resultados (Motion)

## Stack

| Camada | Tecnologia |
|--------|------------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| UI | React 19, SCSS modular |
| Animações | [Motion](https://motion.dev) |
| IA | [OpenRouter](https://openrouter.ai) (modelos free com fallback) |
| Deploy | Vercel (Speed Insights) |

## Pré-requisitos

- Node.js 20+
- Conta no [OpenRouter](https://openrouter.ai) com API key

## Configuração

1. Clone o repositório e instale dependências:

```bash
git clone <url-do-repo>
cd getcromas
npm install
```

2. Crie um arquivo `.env.local` na raiz:

```env
OPENROUTER_API_KEY=sua_chave_aqui

# Opcionais
OPENROUTER_MODEL=nvidia/nemotron-3-super-120b-a12b:free
OPENROUTER_MAX_TOKENS=4096
OPENROUTER_SITE_URL=http://localhost:3000
OPENROUTER_SITE_NAME=GetCromas
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Servidor de produção |
| `npm run lint` | ESLint |

## Estrutura do projeto

```
src/
├── app/                  # App Router (layout, page, API route)
│   └── api/palette/      # POST /api/palette
├── api/                  # Lógica da API (OpenRouter, validação, parse)
├── components/
│   ├── home/             # Home: intro, busca, modal de ajuda, loading
│   ├── results/          # Resultados: cores, contraste, pontos, referências
│   └── general/          # Componentes compartilhados (FloatModal)
├── assets/scss/          # Estilos SCSS modularizados
│   ├── abstracts/        # Variáveis
│   ├── base/             # Reset, tipografia
│   ├── components/       # Modais
│   └── pages/            # Home e resultados
└── types/                # Tipos TypeScript (Palette, JSON schema)
```

## Fluxo

1. Usuário envia briefing na home (`SearchInput`)
2. `POST /api/palette` valida o briefing e chama OpenRouter
3. IA retorna JSON estruturado (schema strict) com paleta completa
4. App exibe `ResultsView` com cores, contraste, resumo e referências

O prompt de sistema e as regras de geração estão em `src/api/systemPrompt.ts` e `context.md`.

## Deploy

Compatível com [Vercel](https://vercel.com). Configure as variáveis de ambiente `OPENROUTER_*` no painel do projeto antes do deploy.

```bash
npm run build
```

## Licença

Projeto privado.
