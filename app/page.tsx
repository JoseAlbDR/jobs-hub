import Image from 'next/image';
import Logo from '../assets/logo.svg';
import LandingImg from '../assets/main.svg';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
export default function Home() {
  return (
    <main>
      <header className="max-w-6xl mx-auto px-4 sm:px-8 py-6">
        <Image src={Logo} alt="app logo" />
      </header>
      <section className="max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-20 grid lg:grid-cols-[1fr,400px] items-center">
        <div>
          <h1 className="capitalize text-4xl md:text-7xl font-bold">
            Aplicación de <span className="text-primary">seguimiento</span> de
            trabajos
          </h1>
          <p className="leading-loose max-w-md mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
            expedita voluptatibus, cumque libero et nesciunt itaque omnis quidem
            aliquam, unde cupiditate! Pariatur, quidem aperiam tempora excepturi
            similique eius fugit quas!
          </p>
          <Button asChild className="mt-4">
            <Link href="add-job">Empezar</Link>
          </Button>
        </div>
        <Image src={LandingImg} alt="landing img" className="hidden lg:block" />
      </section>
    </main>
  );
}
