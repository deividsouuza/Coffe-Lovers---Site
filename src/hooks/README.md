# Hooks

Hooks compartilhados usam nomes iniciados por `use`.

`useDialogMenu` integra o diálogo nativo do menu mobile: abertura, fechamento,
foco cíclico com Tab e Shift+Tab, navegação para a seção e bloqueio temporário da
rolagem do documento. Ao entrar no desktop (64rem), fecha o menu e foca a marca.
O evento `close` sincroniza o estado após Escape e o navegador restaura o foco
do acionador. O cleanup restaura a rolagem e remove o listener de breakpoint.

`useHeaderOffset` observa a altura real do header com ResizeObserver e atualiza
`--header-offset`, preservando a visibilidade das âncoras com zoom e quebra de linhas.
O observer e a variável inline são removidos no cleanup.

`useHeroMotion` observa movimento reduzido e pausa manual. Uma variável CSS
recebe a progressão real de scroll por listener passivo e requestAnimationFrame
sob demanda. IntersectionObserver e visibilitychange interrompem trabalho fora
da viewport ou em aba oculta. O cleanup cancela frames e remove os listeners.

`useRevealOnScroll` aplica uma única revelação de entrada aos artigos marcados com
`data-discovery-reveal`. O conteúdo permanece visível sem a animação. O hook usa
IntersectionObserver e Web Animations API, evita animar um artigo com foco e
cancela os movimentos ativos se a preferência de movimento reduzido for ativada.
Observer, listener e animações são limpos no unmount.

`useJourneyScroll` carrega o motor GSAP/ScrollTrigger quando a jornada se aproxima
ou recebe foco. Atualiza React apenas na mudança da etapa ativa; a progressão
contínua é aplicada pelo motor ao DOM. Seu cleanup cancela o observer inicial,
remove o listener de foco e reverte o motor. Um import concluído depois do unmount
não cria instâncias. A medição e os detalhes de ciclo de vida estão em
`src/animations/createJourneyAnimation.ts` e `docs/jornada.md`.

`useCoffeeProfile` mantém a escolha sensorial e a preferência de lembrar no
dispositivo. A inicialização aceita somente três IDs conhecidos, e as operações
de localStorage são protegidas por try/catch. Sem opt-in, não escreve dados.
Ao desativar a memória, remove apenas sua própria chave. Falhas no armazenamento
não impedem a seleção em React e são informadas pelo componente de memória.

`useAromaExplorer` permite alternar entre seis aromas ou limpar a escolha. Mantém
referências dos acionadores para devolver o foco ao fechar o painel e trata Escape
apenas dentro da seção. A seleção fica em memória, sem persistência nem listeners
globais. As animações de conexão e painel são CSS e respeitam movimento reduzido.

`useFarewellMotion` observa a moldura da fotografia final e executa um único
movimento de 4,5 segundos na foto e no vapor com Web Animations API. Cancela os
movimentos ao sair da tela, ocultar a aba ou ativar movimento reduzido. Nada fica
oculto antes do observer. O cleanup cancela animações, desconecta o observer e
remove os listeners. Não há loop nem atualização React por frame.

Animações futuras em JavaScript devem observar `prefers-reduced-motion`, remover
event listeners e desconectar observers no cleanup de seus efeitos.
