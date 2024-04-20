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
import {
  Briefcase,
  CalendarDays,
  Car,
  MapPin,
  NotebookText,
  RadioTower,
} from 'lucide-react';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';

const JobCard = ({ job }: { job: JobData }) => {
  const date = new Date(job.createdAt).toLocaleDateString();

  return (
    <Card className="bg-muted flex flex-col gap-3">
      <CardHeader>
        <CardTitle className="capitalize">{job.position}</CardTitle>
        <CardDescription className="capitalize">{job.company}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="flex gap-2 flex-col flex-1">
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <JobInfo icon={<Briefcase />} text={job.mode} />
          <JobInfo icon={<MapPin />} text={job.location} />
          <JobInfo icon={<CalendarDays />} text={date} />
          <JobInfo icon={<Car />} text={job.type} />
          <Badge className="w-32 justify-center" variant={job.status}>
            <JobInfo icon={<RadioTower />} text={job.status} />
          </Badge>
        </div>
        {job?.note && (
          <JobInfo icon={<NotebookText />} text={job.note} truncate />
        )}
      </CardContent>
      <Separator />
      <CardFooter className="flex gap-4">
        <Button asChild size="sm">
          <Link href={`/jobs/${job.id}`}>Editar</Link>
        </Button>
        <DeleteJobBtn />
      </CardFooter>
    </Card>
  );
};

export default JobCard;