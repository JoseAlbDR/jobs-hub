import React from 'react';
import { Button } from './ui/button';
import { generateGoogleCalendarLink } from '@/utils/generateGoogleCalendarLink';
import { CreateAndEditJobType, JobData } from '@/utils/types';

const GoogleCalendarLink = ({
  date,
  job,
}: {
  date: Date | undefined;
  job: JobData | CreateAndEditJobType | null;
}) => {
  const startDate = date ? new Date(date) : new Date();
  startDate.setHours(10, 0, 0, 0);

  const endDate = new Date(startDate);
  endDate.setHours(11, 0, 0, 0);

  const url = generateGoogleCalendarLink({
    title: `${job?.position || 'Puesto desconocido'} en ${
      job?.company || 'empresa desconocida'
    } `,
    description: job?.note || 'Sin detalles',
    location: job?.location || 'Desconocido',
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
