import { SiteHeader } from './components/SiteHeader/SiteHeader';
import { SiteFooter } from './components/SiteFooter/SiteFooter';
import { PhotoDivider } from './components/PhotoDivider/PhotoDivider';
import { Hero } from './sections/Hero/Hero';
import { Curiosidades } from './sections/Curiosidades/Curiosidades';
import { Jornada } from './sections/Jornada/Jornada';
import { Perfis } from './sections/Perfis/Perfis';
import { Aromas } from './sections/Aromas/Aromas';
import { Encerramento } from './sections/Encerramento/Encerramento';
import { useRevealOnScroll } from './hooks/useRevealOnScroll';

export function App() {
  const narrativeRef = useRevealOnScroll();
  return (
    <>
      <a className="skipLink" href="#conteudo">Pular para o conteúdo</a>
      <SiteHeader />
      <main ref={narrativeRef} id="conteudo" tabIndex={-1}>
        <Hero />
        <Curiosidades />
        <Jornada />
        <PhotoDivider />
        <Perfis />
        <Aromas />
        <Encerramento />
      </main>
      <SiteFooter />
    </>
  );
}
