import { readFileSync } from "fs";
import { join } from "path";

let cachedContext: string | null = null;

function loadContextMd(): string {
    if (cachedContext) {
        return cachedContext;
    }

    const contextPath = join(process.cwd(), "context.md");
    cachedContext = readFileSync(contextPath, "utf-8");
    return cachedContext;
}

const JSON_OUTPUT_INSTRUCTIONS = `
---

Formato de saída (obrigatório):

Ignore a estrutura em markdown descrita acima. Siga todas as regras de conteúdo do contexto, mas retorne APENAS JSON válido conforme o schema.

Mapeamento dos campos:
- Nome da paleta → title
- Paleta (5 cores: Background, Primary, Text, Secondary, Accent) → colors[] com label=função, name=nome da cor, hash=HEX (#FFFFFF)
- Contraste → contrast[] com label=combinação, contrast=ratio, situation=Aprovado ou Não recomendado
- Sobre a paleta → description (até 500 caracteres, um parágrafo)
- Pontos positivos → points.positive
- Pontos de atenção → points.negative
- Referências (exatamente 3) → references[] com title, type, why, url

Regras de referências (obrigatório):
- Cite apenas referências reais (marcas, projetos, artigos, sites) que você conhece com certeza
- url é obrigatória nas 3 referências — nunca deixe vazia
- Use a homepage oficial ou o artigo real (https://...) quando conhecer com certeza
- NUNCA invente, adivinhe, monte ou complete caminhos de URL (ex.: /about/colors)
- Se não souber o path exato, use só o domínio oficial: https://marca.com

Regras do JSON:
- Todas as strings em uma linha só (sem quebra de linha literal dentro do JSON)
- Não use markdown nem texto fora do JSON
`.trim();

export function getSystemPrompt(): string {
    return `${loadContextMd()}\n\n${JSON_OUTPUT_INSTRUCTIONS}`;
}
