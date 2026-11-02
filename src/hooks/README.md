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

Animações futuras em JavaScript devem observar `prefers-reduced-motion`, remover
event listeners e desconectar observers no cleanup de seus efeitos.
