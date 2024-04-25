import { JobData } from '@/utils/types';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import DeleteJobBtn from './DeleteJobBtn';
import Link from 'next/link';
import JobInfo from './JobInfo';
import { CalendarDaysIcon, MapPin } from 'lucide-react';

import { Badge } from './ui/badge';
import {
  IconBuildingSkyscraper,
  IconClockHour2,
  IconFileCertificate,
  IconFileDescription,
  IconLink,
} from '@tabler/icons-react';

import { iconStatus } from '@/utils/iconStatus';

const JobCard = ({ job }: { job: JobData }) => {
  const date = new Date(job.createdAt).toLocaleDateString();

  return (
    <Card className="bg-muted flex flex-col gap-3">
      <CardHeader>
        <JobInfo
          text={date}
          icon={<CalendarDaysIcon className="stroke-primary-accent stroke-1" />}
          className="justify-end  "
        />
        <Badge className="w-32 justify-center self-start" variant={job.status}>
          <JobInfo icon={iconStatus(job.status)} text={job.status} />
        </Badge>
        <CardTitle className="capitalize text-2xl">{job.position}</CardTitle>
        <CardDescription className="capitalize flex justify-between flex-col">
          {job.link ? (
            <a
              href={job.link}
              target="_blank"
              className="flex items-center gap-1"
            >
              <IconLink stroke={1} className="stroke-primary-accent" />{' '}
              {job.company}
            </a>
          ) : (
            job.company
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex gap-2 flex-col flex-1 ">
        <section>
          {job?.note && (
            <JobInfo
              icon={
                <IconFileDescription
                  stroke={1}
                  className="stroke-primary-accent"
                />
              }
              text={job.note}
              truncate
            />
          )}
        </section>
        <section className="flex justify-between">
          <JobInfo
            icon={
              <IconClockHour2 stroke={1} className="stroke-primary-accent" />
            }
            text={job.mode}
          />
          <JobInfo
            icon={
              <IconFileCertificate
                stroke={1}
                className="stroke-primary-accent"
              />
            }
            text={job.contract}
          />
        </section>
        <section className="flex justify-stretch">
          <JobInfo
            icon={
              <IconBuildingSkyscraper
                stroke={1}
                className="stroke-primary-accent"
              />
            }
            text={job.type}
          />
          <JobInfo
            icon={<MapPin className="stroke-primary-accent stroke-1" />}
            text={job.location}
          />
        </section>
      </CardContent>

      <CardFooter className="flex gap-4 justify-end border-t-2 border-primary-accent pt-5">
        <Button
          asChild
          className={'border-2 border-primary-accent bg-transparent rounded-sm'}
          variant="outline"
        >
          <Link href={`/jobs/${job.id}`}>Editar</Link>
        </Button>
        <DeleteJobBtn id={job.id} />
      </CardFooter>
    </Card>
  );
};

export default JobCard;
