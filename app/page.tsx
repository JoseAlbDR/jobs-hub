import * as React from 'react';
import Image from 'next/image';
import LandingImgBlack from '../assets/main-black.svg';
import LandingImgWhite from '../assets/main-white.svg';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import DarkLogo from '@/components/DarkLogo';
import LightLogo from '@/components/LightLogo';

export default function Home() {
  return (
    <main className="flex flex-col  items-center">
      <section className=" mx-auto flex">
        <article className="w-10/12 ">
          <DarkLogo />
          <LightLogo />
          <h1 className="capitalize text-4xl md:text-5xl font-bold ">
            Aplicación <br />
            de <span className="text-primary">seguimiento</span> de trabajos
          </h1>
          <p className="leading-loose max-w-lg mt-4 text-pretty">
            Bienvenido a JobsHub, tu herramienta todo en uno para registrar las
            ofertas de trabajo a las que has aplicado. Simplifica el seguimiento
            de tus solicitudes y avanza en tu búsqueda laboral de manera
            ordenada. ¡Registra tus aplicaciones hoy y mantén el control de tu
            progreso profesional!
          </p>
        </article>
        <article className="w-1/2 flex justify-end">
          <Image
            src={LandingImgWhite}
            alt="landing img"
            className="self-end w-10/12 hidden lg:hidden lg:dark:block"
            priority
          />
          <Image
            src={LandingImgBlack}
            alt="landing img"
            className="self-end w-10/12 hidden lg:block lg:dark:hidden"
            priority
          />
        </article>
      </section>
      <section>
        <Button
          asChild
          className={`self-end capitalize bg-primary-accent font-sans gap-2 text-black mt-5 w-56 h-16 text-3xl font-bold rounded-lg`}
        >
          <Link href="add-job">Empezar</Link>
        </Button>
      </section>
    </main>
  );
}
