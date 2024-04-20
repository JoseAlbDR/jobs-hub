import * as z from 'zod';

export type JobData = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  position: string;
  company: string;
  location: string;
  link?: string | null;
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
    .min(2, { message: 'El puesto debe de tener al menos 2 caracteres' })
    .transform((value) => value.toLowerCase()),
  company: z
    .string()
    .min(2, {
      message: 'El nombre de la empresa debe de tener al menos 2 caracteres',
    })
    .transform((value) => value.toLowerCase()),
  location: z
    .string()
    .min(2, {
      message: 'La ubicación debe de tener al menos 2 caracteres',
    })
    .transform((value) => value.toLowerCase()),
  link: z.string().url('La url no es válida').optional().or(z.literal('')),
  note: z
    .string()
    .min(5, { message: 'La nota debe tener al menos 5 caracteres' })
    .optional()
    .or(z.literal('')),
  status: z.nativeEnum(JobStatus),
  mode: z.nativeEnum(JobMode),
  type: z.nativeEnum(JobType),
});

export const searchFormSchema = z.object({
  search: z.string().optional(),
  status: z.nativeEnum(JobStatus),
  mode: z.nativeEnum(JobMode),
  type: z.nativeEnum(JobType),
});

export type CreateAndEditJobType = z.infer<typeof createAndEditJobSchema>;
export type SearchFormType = z.infer<typeof searchFormSchema>;
