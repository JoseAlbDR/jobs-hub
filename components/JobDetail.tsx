'use client';
import { getSingleJobAction } from '@/utils/actions';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import JobInfo from './JobInfo';
import { CalendarDaysIcon, MapPin } from 'lucide-react';
import { iconStatus } from '@/utils/iconStatus';
import { IconBuildingSkyscraper, IconClockHour2,IconDeviceLaptop, IconFileCertificate, IconFileDescription, IconFileInfo, IconLink } from '@tabler/icons-react';

import DeleteJobBtn from './DeleteJobBtn';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import Link from 'next/link';

const JobDetail = ({ jobId }: { jobId: string }) => {

  const { data } = useQuery({
    queryKey: ['job', jobId],
    queryFn: () => getSingleJobAction(jobId),
  });




  console.log({ data });

  return (
    data &&
      <div className="flex flex-col gap-5 my-5 mx-5 ">
        <header className="header-custom flex justify-between">
          <h2 className="h2-custom">detalles del trabajo</h2>
          <span className='flex gap-2 '>

 <JobInfo
          text={new Date(data.createdAt).toLocaleDateString()}
          icon={<CalendarDaysIcon className="stroke-primary-accent stroke-1" />}
          className="justify-end  "
        />
        <Badge className="w-32 justify-center self-start" variant={data.status}>
          <JobInfo icon={iconStatus(data.status)} text={data.status} />
        </Badge>
          </span>
         
        </header>
        <main className='main-custom'>
        
       <section className=''> 
        <CardTitle className="capitalize text-2xl">{data?.position}</CardTitle>
        <CardDescription className="capitalize flex justify-between flex-col">
          {data?.link ? (
            <a
              href={data.link}
              target="_blank"
              className="flex items-center gap-1"
            >
              <IconLink stroke={1} className="stroke-primary-accent" />{' '}
              {data.company}
            </a>
          ) : (
            data?.company
          )}
        </CardDescription>
       </section>
       
        <section className='pb-10'>
          
                  <span className='flex gap-2 pb-2'><IconFileDescription
                  stroke={1}
                  className="stroke-primary-accent"/> Detalles:</span>
                  <section className='section-custom'>{data.note}</section>
                  
          
        </section>
        <section className='pb-10'>
          <span className='flex gap-2 pb-2'><IconFileInfo
                  stroke={1}
                  className="stroke-primary-accent"/> Info del puesto:</span>
         <section className="section-custom">
          <JobInfo
            icon={
              <IconClockHour2 stroke={1} className="stroke-primary-accent" />
            }
            text={data.mode}
            className='w-full'
          />
          <JobInfo
            icon={
              <IconFileCertificate
                stroke={1}
                className="stroke-primary-accent"
              />
            }
            text={data.contract}
            className='w-full'
          />
          <JobInfo
            icon={
              <IconBuildingSkyscraper
                stroke={1}
                className="stroke-primary-accent"
              />
            }
            text={data.type}
            className='w-full'
          />
          <JobInfo
            icon={<MapPin className="stroke-primary-accent stroke-1" />}
            text={data.location}
            className='w-full'
          />
        </section>
        </section>
        <section className='flex gap-2'><IconDeviceLaptop stroke={1} className='stroke-primary-accent' /> Tecnologías</section>
        <section className="section-custom flex flex-wrap gap-2">
          {data.techs.map((tech, index) => {
            return <Badge key={`${tech}-${index}`}>{tech}</Badge>;
          })}
        </section>
      

      
        </main>
   
        <footer className="flex gap-4 justify-end border-t-2 border-primary-accent pt-5">
        
        <Button
          asChild
          className={'border-2 border-primary-accent bg-transparent rounded-sm'}
          variant="outline"
        >
          <Link href={`/job/${data.id}/edit`}>Editar</Link>
        </Button>
        <DeleteJobBtn id={data.id} />
        </footer>
     </div>

   );
};

export default JobDetail;
