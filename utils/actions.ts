'use server';

import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { CreateAndEditJobType, JobData, createAndEditJobSchema } from './types';
import prisma from './db';

const authenticateAndRedirect = (): string => {
  const { userId } = auth();
  if (!userId) redirect('/');
  return userId;
};

export const createJobAction = async (
  values: CreateAndEditJobType
): Promise<JobData | null> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const userId = authenticateAndRedirect();
  try {
    createAndEditJobSchema.parse(values);
    const job = await prisma.job.create({ data: { ...values, userId } });
    return job;
  } catch (error) {
    console.log(error);
    return null;
  }
};
