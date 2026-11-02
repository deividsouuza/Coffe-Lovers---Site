import { SiteHeader } from './components/SiteHeader/SiteHeader';
import { PhotoDivider } from './components/PhotoDivider/PhotoDivider';
import { Hero } from './sections/Hero/Hero';
import { Curiosidades } from './sections/Curiosidades/Curiosidades';
import { Jornada } from './sections/Jornada/Jornada';
import { Perfis } from './sections/Perfis/Perfis';
import { Aromas } from './sections/Aromas/Aromas';
import { Encerramento } from './sections/Encerramento/Encerramento';

export function App() {
  return (
    <>
      <a className="skipLink" href="#conteudo">Pular para o conteúdo</a>
      <SiteHeader />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <Curiosidades />
        <Jornada />
        <PhotoDivider />
        <Perfis />
        <Aromas />
        <Encerramento />
      </main>
    </>
  );
}
