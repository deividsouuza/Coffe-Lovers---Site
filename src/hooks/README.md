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

Animações futuras em JavaScript devem observar `prefers-reduced-motion`, remover
event listeners e desconectar observers no cleanup de seus efeitos.
