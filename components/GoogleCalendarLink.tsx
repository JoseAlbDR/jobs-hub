import React from 'react';
import { Button } from './ui/button';
import { generateGoogleCalendarLink } from '@/utils/generateGoogleCalendarLink';
import { JobData } from '@/utils/types';

const GoogleCalendarLink = ({ date, job }: { date: Date; job: JobData }) => {
  const startDate = new Date(date);
  startDate.setHours(10, 0, 0, 0);

  const endDate = new Date(date);
  endDate.setHours(11, 0, 0, 0);

  const url = generateGoogleCalendarLink({
    title: `${job.position} en ${job.company}`,
    description: job.note || '',
    location: job.location,
    startDate,
    endDate,
  });

  return (
    <Button className="btn-custom w-full" asChild>
      <a href={url} target="_blank">
        Añadir a Google Calendar
      </a>
    </Button>
  );
};

export default GoogleCalendarLink;
