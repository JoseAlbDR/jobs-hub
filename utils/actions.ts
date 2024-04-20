'use server';

import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import {
  CreateAndEditJobType,
  JobData,
  JobMode,
  JobStatus,
  JobType,
  createAndEditJobSchema,
} from './types';
import prisma from './db';
import { Prisma } from '@prisma/client';

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
    const job = await prisma.job.create({
      data: {
        ...values,
        position: values.position.toLowerCase(),
        company: values.company.toLowerCase(),
        location: values.location.toLowerCase(),
        userId,
      },
    });
    return job;
  } catch (error) {
    console.log(error);
    return null;
  }
};

type GetAllJobsActionTypes = {
  search?: string;
  status?: JobStatus;
  mode?: JobMode;
  type?: JobType;
  limit?: number;
  page?: number;
};

export const getAllJobsAction = async ({
  search,
  status,
  mode,
  type,
  page = 1,
  limit = 10,
}: GetAllJobsActionTypes): Promise<{
  jobs: JobData[];
  count: number;
  page: number;
  totalPages: number;
}> => {
  const userId = authenticateAndRedirect();

  try {
    let whereClause: Prisma.JobWhereInput = {
      userId,
    };

    if (search)
      whereClause = {
        ...whereClause,
        OR: [
          {
            position: {
              contains: search,
            },
          },
          {
            company: {
              contains: search,
            },
          },
          {
            location: {
              contains: search,
            },
          },
        ],
      };

    if (status && status !== 'todos')
      whereClause = {
        ...whereClause,
        status,
      };

    if (mode && mode !== 'todos')
      whereClause = {
        ...whereClause,
        mode,
      };

    if (type && type !== 'todos')
      whereClause = {
        ...whereClause,
        type,
      };

    const jobs: JobData[] = await prisma.job.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return { jobs, count: 0, page: 1, totalPages: 0 };
  } catch (error) {
    console.log(error);
    return { jobs: [], count: 0, page: 1, totalPages: 0 };
  }
};