import * as z from 'zod';

export type JobData = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  position: string;
  company: string;
  location: string;
  status: string;
  mode: string;
  link: string;
};

export enum JobStatus {
  Pending = 'pendiente',
  Interview = 'entrevista',
  Declined = 'rechazado',
}

export enum JobMode {
  FullTime = 'jornada-completa',
  PartTime = 'jornada-parcial',
  Internship = 'practicas',
}

export enum JobType {
  Presential = 'presencial',
  Remote = 'remoto',
  Hybrid = 'hibrido',
}

export const createdAndEditJobSchema = z.object({
  position: z
    .string()
    .min(2, { message: 'el puesto debe de tener al menos 2 caracteres' }),
  company: z.string().min(2, {
    message: 'el nombre de la empresa debe de tener al menos 2 caracteres',
  }),
  location: z.string().min(2, {
    message: 'la ubicación debe de tener al menos 2 caracteres',
  }),
  link: z.string().url('la url no es válida'),
  status: z.nativeEnum(JobStatus),
  mode: z.nativeEnum(JobMode),
  type: z.nativeEnum(JobType),
});

export type CreateAndEditJobType = z.infer<typeof createdAndEditJobSchema>;
