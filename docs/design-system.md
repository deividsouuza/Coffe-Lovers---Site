# Design system · COFFE LOVERS

Identidade editorial baseada em contraste, espaço e tipografia. Esta etapa aplica
o sistema à estrutura existente; o Hero já possui composição própria, documentada
em [hero.md](hero.md). As demais seções aguardam seus próximos prompts.
A imagem de referência não estava disponível nesta
conversa; a direção segue o briefing textual e a paleta fornecida.

## Tokens e temas

`src/styles/tokens.css` é a fonte única de decisões visuais. Tokens de marca
(`--color-*`) alimentam os tokens semânticos `--surface`, `--ink`, `--ink-muted`,
`--accent`, `--border` e `--focus`. Evite cores literais nos componentes.

| Papel | Creme | Espresso |
| --- | --- | --- |
| Fundo | `#F6EEE5` | `#2B130D` |
| Texto | `#2B130D` | `#F6EEE5` |
| Texto secundário | `#72594B` | `#D8C2AE` |
| Acento e foco | `#5A2E1F` | `#C69A73` |

Caramelo, bege e oliva completam a paleta. Use caramelo e oliva como acentos;
não como texto pequeno sobre creme. Sombras são discretas e não substituem
hierarquia, espaçamento ou bordas.

```tsx
<Section content={siteContent.aromas} tone="espresso" divider>
  {/* Conteúdo da seção */}
</Section>
```

`data-tone="espresso"` também pode ser aplicado a outros contêineres para herdar
texto, bordas e foco adequados à superfície escura. As seções são irmãs, sem
aninhamento de temas.

## Tipografia e leitura

- Cormorant Garamond 400–600: marca e títulos, com fallback Georgia.
- DM Sans 400–700: leitura, navegação e controles, com fallback do sistema.
- WOFF2 variável local, subconjunto latino e `font-display: swap`.
- H1: 2,75–5,75rem; H2: 2,25–4,125rem; H3: 1,625–2rem.
- Corpo: 1rem, entrelinha 1,8. Introdução: 1,0625–1,1875rem.
- `.eyebrow`: rótulo curto em caixa alta; `.lead`: introdução com largura de leitura.

Preserve um H1 na página e títulos em ordem semântica. As listas existentes
mantêm sua semântica; o sistema não as converte em cartões.

## Layout e responsividade

`.container` centraliza conteúdo até 76rem, com margens fluidas de 1,25–5rem.
O texto de leitura é limitado a 38rem. Os espaços usam a escala `--space-*`,
com distância entre seções de 4–8rem.

Mobile é o padrão. A navegação de desktop entra em 64rem (1024 px com fonte
padrão), breakpoint também observado por `useDialogMenu`. Se alterar esse valor,
atualize os tokens, o CSS do header, o estilo global e o hook em conjunto.

O header é sticky e aceita quebra de linha com texto ampliado. `useHeaderOffset`
mede sua altura real; `scroll-padding-top` mantém os destinos abaixo dele. Seções
possuem `tabIndex={-1}` para receber foco programático sem entrar na ordem de Tab.

## Ações e indicadores

```tsx
<Action href="#curiosidades">Comece sua descoberta</Action>
<Action href="#inicio" variant="secondary" icon="arrow-up">Voltar ao início</Action>
<Action onClick={handleReveal} variant="text">Revelar detalhe</Action>
```

O último exemplo só deve ser usado com comportamento implementado. `Action`
renderiza uma âncora quando recebe `href`, ou um botão com `type="button"`.
Os controles têm altura mínima de 44 px (48 px em `Action`). Setas, sublinhados,
hover, active e foco comunicam interação, sem brilho ou sombra intensa.

`OrganicDivider` oferece filetes curvos e um grão em SVG. É decorativo e oculto
para leitores de tela. `PhotoDivider` oferece um intervalo fotográfico com
carregamento lazy e arquivos responsivos, separado das seis seções.

## Menu e acessibilidade

O menu usa `<dialog>.showModal()`, que torna o fundo inerte. O botão informa
`aria-expanded`, `aria-controls` e `aria-haspopup`. O diálogo tem nome acessível.
O foco inicial vai para Fechar, Tab e Shift+Tab circulam pelos controles, e Escape
fecha pelo comportamento nativo. Fechar devolve o foco ao acionador; navegar
move o foco para a seção. A rolagem do documento é restaurada no fechamento.

Foco usa contorno de 2 px adaptado ao tema. A seleção usa bege e espresso.
`prefers-reduced-motion` desativa a rolagem suave, transições e deslocamentos.
O Hero usa uma composição própria, com movimentos leves e controle de pausa.
Os detalhes de implementação e validação estão em [hero.md](hero.md).
