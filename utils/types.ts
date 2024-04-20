import * as z from 'zod';

export type JobData = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  position: string;
  company: string;
  location: string;
  link: string;
  status: string;
  mode: string;
  type: string;
  note?: string | null;
};

export enum JobStatus {
  All = 'todos',
  Pending = 'pendiente',
  Interview = 'entrevista',
  Declined = 'rechazado',
}

export enum JobMode {
  All = 'todos',
  FullTime = 'completa',
  PartTime = 'parcial',
  Internship = 'practicas',
}

export enum JobType {
  All = 'todos',
  Presential = 'presencial',
  Remote = 'remoto',
  Hybrid = 'hibrido',
}

export const createAndEditJobSchema = z.object({
  position: z
    .string()
    .min(2, { message: 'El puesto debe de tener al menos 2 caracteres' }),
  company: z.string().min(2, {
    message: 'El nombre de la empresa debe de tener al menos 2 caracteres',
  }),
  location: z.string().min(2, {
    message: 'La ubicación debe de tener al menos 2 caracteres',
  }),
  link: z.string().url('La url no es válida'),
  note: z
    .string()
    .min(5, { message: 'La nota debe tener al menos 5 caracteres' })
    .optional(),
  status: z.nativeEnum(JobStatus),
  mode: z.nativeEnum(JobMode),
  type: z.nativeEnum(JobType),
});

export type CreateAndEditJobType = z.infer<typeof createAndEditJobSchema>;
