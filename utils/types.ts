import * as z from 'zod';

export type JobType = {
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

export enum JobLocation {
  Presential = 'presencial',
  Remote = 'remoto',
  Hybrid = 'hibrido',
}
