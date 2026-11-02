# Mapa de aromas · COFFE LOVERS

Seção com o título “O CAFÉ ESCONDE MUITO MAIS DO QUE VOCÊ IMAGINA.”,
composição livre em espresso e um painel editorial em creme. O grão central
reaproveita `CoffeeBean`; seis ilustrações próprias representam chocolate,
caramelo, castanhas, frutas cítricas, flores e especiarias. O mapa não usa a
ilustração da roda de sabores nem novos arquivos fotográficos ou bibliotecas.

## Organização

- `src/data/aromaContent.ts`: textos, exemplos, convites, fontes, acentos e
  coordenadas percentuais compartilhadas pelos acionadores e pelas curvas.
- `src/types/coffee.ts`: IDs válidos e contrato das notas aromáticas.
- `src/sections/Aromas/Aromas.tsx`: composição, instrução, anúncio de estado,
  explicação científica, fontes e continuidade para a pausa final.
- `AromaMap.tsx`: seis botões nativos, grão e affordances visuais.
- `AromaConnections.tsx`: curvas SVG orgânicas e conexão ativa.
- `AromaIllustration.tsx`: desenhos originais reutilizados no mapa e no painel.
- `AromaPanel.tsx`: região nomeada com ilustração, descrição e fechamento.
- `Aromas.module.css`: composição responsiva, estados e animações.
- `src/hooks/useAromaExplorer.ts`: seleção, fechamento e restauração do foco.

Integrações atualizadas: `src/data/coffeeContent.ts` reexporta as novas notas e
`src/data/siteContent.ts` recebe o título e a introdução. `README.md`,
`docs/design-system.md`, `src/hooks/README.md` e `src/assets/README.md` registram
o estado desta etapa. Não houve alteração nas dependências ou nas outras seções.

## Comportamento e acessibilidade

Nenhum aroma inicia selecionado. Toque, clique, Enter ou Espaço abrem a descrição.
Selecionar outro aroma atualiza o painel e a conexão; selecionar novamente o aroma
ativo fecha a informação. O botão Fechar e Escape também fecham e devolvem o foco
ao acionador, que volta à área visível. Escape é tratado apenas dentro da seção.
A escolha permanece somente em memória durante a visita.

Os botões expõem `aria-pressed`, `aria-expanded` e `aria-controls`. O painel
controlado permanece no DOM, com `hidden` quando fechado e nome pelo próprio
título quando aberto. Uma região de status anuncia a seleção e a descrição;
o foco permanece no mapa ao selecionar. O foco global adapta-se à superfície
creme do painel. SVGs decorativos não repetem conteúdo no leitor de tela.

No mobile, o mapa ocupa a largura disponível e o painel vem abaixo. A partir de
48rem, o painel fica ao lado do mapa. As áreas de toque têm pelo menos 76 × 100 px;
o botão de fechamento tem 44 × 44 px. As coordenadas proporcionais mantêm as
conexões alinhadas sem medir pixels por frame. Não há scroll preso ou zoom exigido.

A conexão selecionada aparece por opacidade em 650 ms. O conteúdo do painel usa
uma breve revelação de opacidade e 5 px de deslocamento. As animações terminam
após cada seleção; nenhuma fica em loop. `prefers-reduced-motion` as desativa,
assim como as transições dos controles. A interação não depende das animações.
Os SVGs mantêm traços finos com `non-scaling-stroke` nas conexões.

## Conteúdo e referências

As descrições curtas são paráfrases do vocabulário sensorial, e os convites de
observação são editoriais. Não prometem que toda bebida terá as seis notas.
A explicação visível informa que reconhecer uma nota não demonstra, por si só,
a adição daquele ingrediente ao café. As percepções podem variar.

Fontes consultadas em 2 de novembro de 2026 e vinculadas na interface:

- [World Coffee Research · Sensory Lexicon](https://worldcoffeeresearch.org/resources/sensory-lexicon):
  referências dos atributos sensoriais. O léxico inclui atributos de cacau,
  caramelização, nozes, cítricos, flores e especiarias; a interface agrupa
  referências em linguagem acessível, sem propor uma classificação científica nova.
- [Specialty Coffee Association · How to Use the Flavor Wheel in Eight Steps](https://sca.coffee/sca-news/how-to-use-the-flavor-wheel-in-eight-steps-ab2hy):
  uso de referências familiares para observar e descrever a experiência sensorial.

O mapa e os desenhos são originais. Os links servem como referência do conteúdo;
nenhuma arte ou texto extenso dessas publicações é incorporado.

## Verificações

`npm.cmd run build` executa TypeScript e gera a versão de produção. QA sobre o
preview em Chrome headless com Playwright e axe, instalados somente no diretório
temporário do sistema, sem adicionar dependências ao projeto.

- Oito larguras: 320, 360, 390, 430, 768, 1024, 1440 e 1920 px.
- Todos os seis estados: seleção única, painel correto, exemplos e seis
  ilustrações distintas; conexões, alternância e fechamento pelo aroma ativo.
- Enter, Espaço, Escape, fechamento pelo botão e foco devolvido ao acionador.
- Toque simulado em viewport de 390 × 844 px e âncora para a próxima seção.
- Áreas de toque, ausência de sobreposição entre acionadores e de overflow.
- Texto ampliado a 200% em 390 px com todos os estados, sem overflow.
- Análise axe WCAG A/AA e boas práticas para os seis estados em 360, 390 e 1440 px,
  sem violações nas amostras.
- Movimento reduzido, término da animação de conexão e funcionamento com todas
  as animações/transições desligadas.
- Seis seções principais preservadas e nenhum erro de execução no navegador.
- Inspeção visual de capturas mobile e desktop.

Para conferir: `npm.cmd run dev`, navegue até `#aromas` e explore cada referência.
As ferramentas automáticas não substituem uma auditoria com leitores de tela
nem testes em aparelhos físicos. Encerramento permanece fora desta etapa.
