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
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Button } from './ui/button';
import DeleteJobBtn from './DeleteJobBtn';
import Link from 'next/link';

const JobCard = ({ job }: { job: JobData }) => {
  const date = new Date(job.createdAt).toLocaleDateString();

  return (
    <Card className="bg-muted">
      <CardHeader>
        <CardTitle className="capitalize">{job.position}</CardTitle>
        <CardDescription className="capitalize">{job.company}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent></CardContent>
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
