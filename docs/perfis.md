# Qual tipo de Coffe Lover é você?

Uma escolha sensorial e afetiva, sem questionário, pontuação ou recomendação de
produtos. O visitante seleciona a atmosfera com que se identifica naquele momento.
Nenhum perfil vem marcado na primeira visita; a imagem inicial é apenas um convite.

## As três atmosferas

| Perfil | Identidade | Referências sensoriais |
| --- | --- | --- |
| Suave e delicado | Creme, luz suave, flores e contorno em arco | Flores brancas, jasmim e camomila |
| Intenso e marcante | Espresso profundo, chocolate e enquadramento mais firme | Chocolate amargo, cacau e castanhas |
| Aromático e surpreendente | Oliva, caramelo, frutas e recorte circular | Frutas amarelas, frutas vermelhas e flores |

São associações editoriais, não avaliações científicas de personalidade ou notas
atribuídas a um café servido no estabelecimento. A interface diferencia referências
sensoriais de ingredientes adicionados.

## Seleção e composição

O seletor é um fieldset com três rádios nativos. Cada opção possui imagem, forma
e identidade próprias, sem três cartões genéricos. No mobile, as três escolhas
ficam lado a lado e o painel visual vem logo abaixo; no desktop, escolhas, imagem
principal e descrição formam uma composição editorial em três colunas.

A seleção altera a imagem ativa, as tonalidades locais, o motivo em SVG, o título,
a descrição, as notas e o texto afetivo. Sublinhado, marca de seleção e a palavra
Selecionado comunicam o estado. O foco visível é independente da seleção.

As imagens fazem crossfade e o texto e o motivo têm uma entrada curta. As cores
de fundo e de leitura mudam em conjunto, sem interpolação que prejudique o
contraste entre claro e escuro. Com movimento reduzido, as trocas são imediatas;
nenhuma interação depende de animationend ou transitionend.

O foco permanece na escolha. As setas do teclado percorrem os rádios nativamente,
Espaço seleciona e uma mensagem curta anuncia o perfil e suas notas. Imagens
inativas ficam fora da árvore de acessibilidade. A ação final navega para Aromas,
sem implementar a próxima seção.

## Persistência opcional

Lembrar minha escolha neste dispositivo inicia desativado. Sem essa opção, as
seleções ficam somente no estado React e não são escritas no armazenamento.

- Chave: `coffe-lovers:profile:v1`.
- Valor: apenas `suave`, `intenso` ou `aromatico`, em texto simples.
- Nenhum nome, identificador pessoal, horário, pontuação ou histórico é armazenado.
- Ao ativar, o perfil atual é salvo; se ainda não houver escolha, a próxima será salva.
- Ao trocar de perfil com a memória ativa, o mesmo registro é atualizado.
- Ao desativar, apenas essa chave é removida, preservando a escolha na visita atual.
- Um valor válido restaura escolha e memória ao recarregar. Valores desconhecidos
  ou malformados são ignorados; não são interpretados como HTML ou JSON.
- Acesso bloqueado ou falha ao salvar não interrompem a seleção. O estado visível
  informa que não foi possível guardar. Falhas ao remover também são comunicadas.

Não há sincronização entre abas nem envio da preferência a um servidor.

## Arquivos

- `src/sections/Perfis/Perfis.tsx`: composição e integração do estado.
- `ProfileSelector.tsx`: opções e navegação nativa por teclado.
- `ProfileScene.tsx`: camadas fotográficas responsivas e legenda.
- `ProfileDescription.tsx`: texto sensorial, notas e mensagem afetiva.
- `ProfileMotif.tsx`: desenhos SVG de flores, chocolate e frutos.
- `ProfileMemory.tsx`: opção de memória e mensagens de persistência.
- `Perfis.module.css`: temas locais, responsividade, foco e movimento reduzido.
- `src/hooks/useCoffeeProfile.ts`: seleção, validação e localStorage com tratamento de falhas.
- `src/data/profileContent.ts`: conteúdo tipado, fotografias e mensagens.
- `src/data/coffeeContent.ts`: mantém a exportação anterior de `coffeeProfiles`.
- `src/data/siteContent.ts` e `src/types/coffee.ts`: título e contratos atualizados.
- `src/assets/images/profiles/`: seis WebP próprios, com 24–38 kB nas versões menores.

Os assets foram criados com imagegen integrado e otimizados localmente. Caminhos,
pesos e prompts finais estão em
[assets de Perfis](../src/assets/images/profiles/README.md). Nenhuma dependência foi adicionada.

## Verificações

- TypeScript e build de produção passaram.
- Chrome headless em 360, 390, 430, 768, 1024, 1440 e 1920 px, com os três perfis.
- Estado inicial sem opção marcada, escolha única, troca repetida, imagem ativa,
  texto correspondente, notas e foco conferidos.
- Espaço, setas nos dois sentidos e retorno circular entre os rádios verificados.
- Toque mobile simulado e persistência após reload conferidos para os três perfis.
- Memória desativada não escreve a chave; ativação salva somente o ID; desativação
  apaga a chave, mantendo a seleção até reload e preservando outras chaves.
- Ativação antes da escolha, restauração, dados inválidos e localStorage bloqueado
  verificados, com seleção continuando funcional.
- Todas as escolhas passaram com animações e transições desligadas, além da
  preferência de movimento reduzido. Texto ampliado a 200% sem overflow.
- Análise automática axe com regras WCAG A/AA sem violações nas três atmosferas
  em 360, 390 e 1440 px; capturas inspecionadas em mobile e desktop.
- Link para Aromas e preservação das seis seções conferidos, sem erros de runtime.

Testes em navegador não equivalem a testes em aparelhos físicos ou auditoria
manual com leitores de tela. Aromas e Encerramento permanecem no escopo anterior.
