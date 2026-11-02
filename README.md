# COFFE LOVERS

Experiência editorial sobre café, criada para acompanhar a pausa de quem visita
uma cafeteria. Aplicação React + Vite + TypeScript, em português brasileiro,
com seis momentos integrados em uma única página.

## Executar

Use Node.js 22.12 ou superior (verificado com Node.js 24.18.0) e npm.

```sh
npm install
npm run dev
```

Abra o endereço exibido pelo Vite, normalmente `http://localhost:5173`.
Se o PowerShell bloquear `npm.ps1`, utilize `npm.cmd` no lugar de `npm`.

## Verificar e gerar produção

```sh
npm run typecheck
npm run build
npm run preview
```

O build executa também a verificação TypeScript e gera `dist/`. O preview serve
esse resultado localmente, normalmente em `http://localhost:4173`.
Para instalações reproduzíveis após o clone, use `npm ci`.

## Estrutura

```text
src/
  assets/                 # Imagens e fontes, quando adicionadas
  components/
    Section/              # Contêiner semântico compartilhado + CSS Module
    SiteHeader/           # Marca e navegação por âncoras + CSS Module
  data/
    coffeeContent.ts      # Curiosidades, jornada, perfis e notas aromáticas
    siteContent.ts        # Textos das seções e navegação
  hooks/                  # Hooks compartilhados, quando necessários
  sections/
    Hero/
    Curiosidades/
    Jornada/
    Perfis/
    Aromas/
    Encerramento/
  styles/
    global.css            # Base responsiva, foco e movimento reduzido
    tokens.css            # Paleta, tipografia e espaçamento
  types/
    coffee.ts             # Contratos de conteúdo
  App.tsx                 # Composição da experiência
  main.tsx                # Entrada React
index.html                # Idioma e metadados
vite.config.ts
tsconfig*.json
package.json
package-lock.json
```

## Limites desta etapa

Esta é a fundação técnica, com conteúdo introdutório e estilos mínimos. A direção
visual completa, fotografias, fontes, quiz, revelações e animações serão tratados
nos próximos prompts. Os links existentes navegam para seções reais; conteúdos
ainda sem interação aparecem como texto, sem controles simulados.

Os perfis são descrições editoriais. As notas aromáticas são vocabulário sensorial,
não ingredientes adicionados. Curiosidades científicas ou históricas deverão
receber fontes verificadas ao serem desenvolvidas.

CSS Modules isolam os estilos dos componentes. Variáveis CSS centralizam o design
system; por enquanto, as famílias tipográficas usam fallbacks locais, sem downloads.
Não são necessárias bibliotecas de animação, ícones ou roteamento nesta etapa.

## Conferência manual

- Confira as seis seções e as âncoras do cabeçalho em uma única rolagem.
- Navegue com Tab: o primeiro link permite pular para o conteúdo; o foco é visível.
- Confira a largura de 360 a 430 px, sem rolagem horizontal.
- Ative a preferência de movimento reduzido: a navegação deixa de usar rolagem suave.
  O projeto ainda não inclui outras animações.
