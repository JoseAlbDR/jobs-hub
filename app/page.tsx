'use client';
import * as React from 'react';
import Image from 'next/image';
import LogoBlack from '../assets/horizontal-black.svg';
import LogoWhite from '../assets/horizontal-white.svg';
import LandingImgBlack from '../assets/main-black.svg';
import LandingImgWhite from '../assets/main-white.svg';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { buttonClassName } from '@/utils/tagStylesConfig';
import { useTheme } from 'next-themes';
import { getBackgroundColor } from '@/utils/getBackgroundColor';
export default function Home() {
    const { setTheme, theme } = useTheme();
     
  
  return (
   
    <main className='flex flex-col  items-center'>
      <section className=" mx-auto flex">
       
        <article className='w-10/12 '>
          <Image
          src={getBackgroundColor(theme) ==='dark'? LogoWhite :LogoBlack}
          alt="app logo"
          className="my-5 self-center"
          width={250}
          height={100}
        />
          <h1 className="capitalize text-4xl md:text-5xl font-bold ">
            Aplicación <br/>de <span className="text-primary">seguimiento</span> de
            trabajos
          </h1>
          <p className="leading-loose max-w-lg mt-4 text-pretty">
            Bienvenido a JobsHub, tu herramienta todo en uno para registrar las ofertas de trabajo a las que has aplicado. Simplifica el seguimiento de tus solicitudes y avanza en tu búsqueda laboral de manera ordenada. ¡Registra tus aplicaciones hoy y mantén el control de tu progreso profesional!
          </p>
         
        </article>
        <article className='w-1/2 flex justify-end'>
 <Image src={getBackgroundColor(theme)==='dark'? LandingImgWhite : LandingImgBlack} alt="landing img" className=" hidden self-end lg:block w-10/12 " />
        </article>
      </section>
      <section><Button asChild className={`${buttonClassName} mt-5 w-56 h-16 text-3xl font-bold rounded-lg`}>
            <Link href="add-job">Empezar</Link>
          </Button></section>
    </main>
  
  );
}
