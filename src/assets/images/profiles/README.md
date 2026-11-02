# Imagens próprias · Perfis

Três assets criados com a ferramenta integrada `image_gen` da skill imagegen,
sem CLI de geração. Os originais foram preservados no diretório de geração;
os seis derivados consumidos pelo site ficam nesta pasta.

| Perfil | Arquivo | Dimensões | Peso |
| --- | --- | --- | --- |
| Suave | `suave-480.webp` | 480 × 600 | 37.802 bytes |
| Suave | `suave-960.webp` | 960 × 1200 | 107.544 bytes |
| Intenso | `intenso-480.webp` | 480 × 600 | 24.038 bytes |
| Intenso | `intenso-960.webp` | 960 × 1200 | 76.994 bytes |
| Aromático | `aromatico-480.webp` | 480 × 600 | 35.656 bytes |
| Aromático | `aromatico-960.webp` | 960 × 1200 | 112.784 bytes |

Os assets não contêm textos, interface ou marcas. Flores, chocolate e frutas
são referências visuais de atmosfera, fora da bebida. O conteúdo HTML explica
que notas sensoriais não representam ingredientes adicionados.

A otimização usou Pillow como ferramenta temporária, com redimensionamento e
compressão WebP. O projeto não recebeu dependências novas. Thumbnails são
decorativos, e a imagem principal ativa tem alt descritivo; imagens inativas
ficam fora da árvore de acessibilidade. Os arquivos são locais, responsivos
e carregados com lazy loading.

## Prompts finais

### suave

```text
Use case: photorealistic-natural. Asset type: original editorial still-life photograph for a premium coffee website's "Suave e delicado" atmosphere selector. Portrait 4:5 composition. Scene: a small ivory ceramic coffee cup filled with warm black coffee, on a warm cream linen tablecloth, a delicate airy stem of small white flowers nearby, soft window daylight and gentle natural shadows. Framing: intimate, close, asymmetric but balanced composition; cup in lower center, flowers along left side, generous breathing room above. Palette: warm cream #F6EEE5, beige #E6D3BF, muted caramel #C69A73 and soft natural whites. Real tactile porcelain and linen weave, shallow depth of field, cinematic editorial quality, tender quiet morning mood and lightness. This is a conceptual sensory atmosphere, not a recipe: flowers are beside the cup, never in the coffee. Constraints: image only, no text, no logo, no watermark, no UI, no people, no hands, no artificial glow or synthetic gradient. Keep the cup completely inside frame, no spilled coffee.
```

### intenso

```text
Use case: photorealistic-natural. Asset type: original editorial still-life photograph for a premium coffee website's "Intenso e marcante" atmosphere selector. Portrait 4:5 composition. Scene: a small dark espresso-brown ceramic cup with rich golden crema, on a dark matte brown table, two irregular pieces of dark chocolate beside it and a few roasted coffee beans. Framing: cinematic macro still life, cup slightly off-center in the lower half, slightly elevated viewpoint showing crema, tactile dark chocolate in near foreground, cup fully in frame. Lighting: low-key warm directional side light, subtle warm rim highlights, deep natural shadows, shallow depth of field, authentic photographic depth. Palette: espresso #2B130D, roasted brown #5A2E1F, caramel #C69A73, restrained gold crema. Mood: grounded, enveloping, distinctive and intimate. Chocolate is only a sensory visual reference beside the cup, never mixed into coffee. Constraints: image only, no text, no logo, no watermark, no UI, no people, no hands, no artificial glow, no synthetic gradients.
```

### aromatico

```text
Use case: photorealistic-natural. Asset type: original editorial still-life photograph for a premium coffee website's "Aromático e surpreendente" atmosphere selector. Portrait 4:5 composition. Scene: a handcrafted caramel-colored ceramic coffee cup containing black coffee, on an olive green linen tablecloth, a small ripe peach and a few fresh red berries to one side, one delicate tiny white blossom nearby. Framing: fresh editorial close-up viewed slightly above, cup right of center and fully inside frame, fruit in lower-left foreground, generous airy breathing space above. Lighting: soft warm late-afternoon daylight, layered realistic shadows, tactile ceramic and fabric weave, shallow depth of field and authentic photographic depth. Palette: olive #7D8168, caramel #C69A73, warm beige, restrained natural fruit reds and peach tones. Mood: curious, sensory, inviting discovery. Fruit and flowers are visual aroma references outside the cup, not ingredients added to coffee. Constraints: image only, no text, no logo, no watermark, no UI, no people, no hands, no neon effects or artificial gradients.
```
