import Image from 'next/image';
import Logo from '../assets/horizontal-black.svg';
import LandingImg from '../assets/main-black.svg';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { buttonClassName } from '@/utils/tagStylesConfig';
export default function Home() {
  return (
    <main className='flex flex-col  items-center'>
      <section className=" mx-auto flex">
       
        <article className='w-10/12 '>
          <Image
          src={Logo}
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
            expedita voluptatibus, cumque libero et nesciunt itaque omnis quidem
            aliquam, unde cupiditate! Pariatur, quidem aperiam tempora excepturi
            similique eius fugit quas!
          </p>
         
        </article>
        <article className='w-1/2 flex justify-end'>
 <Image src={LandingImg} alt="landing img" className=" hidden self-end lg:block w-10/12 " />
        </article>
      </section>
      <section><Button asChild className={`${buttonClassName} mt-5 w-56 h-16 text-3xl font-bold rounded-lg`}>
            <Link href="add-job">Empezar</Link>
          </Button></section>
    </main>
  );
}
