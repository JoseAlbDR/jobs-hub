'use server';

import { auth } from '@clerk/nextjs';
import dayjs from 'dayjs';
import { redirect } from 'next/navigation';
import {
  CreateAndEditJobType,
  JobContract,
  JobData,
  JobMode,
  JobStatus,
  JobType,
  createAndEditJobSchema,
} from './types';
import prisma from './db';
import { Prisma } from '@prisma/client';
import * as _ from 'lodash';

const authenticateAndRedirect = (): string => {
  const { userId } = auth();
  if (!userId) redirect('/');
  return userId;
};

export const createJobAction = async (
  values: CreateAndEditJobType
): Promise<JobData | null> => {
  const userId = authenticateAndRedirect();
  try {
    createAndEditJobSchema.parse(values);
    const job = await prisma.job.create({
      data: {
        ...values,
        status: values.status as 'pendiente' | 'entrevista' | 'rechazado',
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

export const updateJobAction = async (
  id: string,
  values: CreateAndEditJobType
): Promise<JobData | null> => {
  const userId = authenticateAndRedirect();

  try {
    const job = await prisma.job.update({
      where: { id, userId },
      data: {
        ...values,
        status: values.status as 'pendiente' | 'entrevista' | 'rechazado',
        position: values.position.toLowerCase(),
        company: values.company.toLowerCase(),
        location: values.location.toLowerCase(),
      },
    });
    return job;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteJobAction = async (id: string): Promise<JobData | null> => {
  const userId = authenticateAndRedirect();

  try {
    const job: JobData = await prisma.job.delete({ where: { id, userId } });
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
  contract?: JobContract;
  techs?: string[];
};

export const getUniqueTechTags = async () => {
  const userId = authenticateAndRedirect();

  try {
    const uniqueTechs = await prisma.job.findMany({
      distinct: ['techs'],
      select: { techs: true },
      where: {
        userId,
      },
    });

    return _.uniq(uniqueTechs.map((job) => job.techs).flat());
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getAllJobsAction = async ({
  search,
  status,
  mode,
  type,
  contract,
  techs,
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
              contains: search.toLowerCase(),
            },
          },
          {
            company: {
              contains: search.toLowerCase(),
            },
          },
          {
            location: {
              contains: search.toLowerCase(),
            },
          },
        ],
      };

    if (techs && techs.length > 0 && !techs.includes('todas')) {
      whereClause = {
        ...whereClause,
        techs: {
          hasSome: techs,
        },
      };
    }

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

    if (contract && contract !== 'todos')
      whereClause = {
        ...whereClause,
        contract,
      };

    const skip = (page - 1) * limit;

    const [jobs, count]: [jobs: JobData[], count: number] =
      await prisma.$transaction([
        prisma.job.findMany({
          where: whereClause,
          skip,
          take: limit,
          orderBy: {
            createdAt: 'desc',
          },
        }),
        prisma.job.count({
          where: whereClause,
        }),
      ]);

    const totalPages = Math.ceil(count / limit);

    return { jobs, count, page, totalPages };
  } catch (error) {
    console.log(error);
    return { jobs: [], count: 0, page: 1, totalPages: 0 };
  }
};

export const getSingleJobAction = async (
  id: string
): Promise<JobData | null> => {
  const userId = authenticateAndRedirect();
  let job: JobData | null = null;
  try {
    job = await prisma.job.findUnique({ where: { id, userId } });
  } catch (error) {
    console.log(error);
  }
  if (!job) redirect('/jobs');

  return job;
};

export const getStatsAction = async (): Promise<{
  pendiente: number;
  entrevista: number;
  rechazado: number;
}> => {
  const userId = authenticateAndRedirect();

  try {
    const stats = await prisma.job.groupBy({
      where: {
        userId,
      },
      by: ['status'],
      _count: {
        status: true,
      },
    });

    const statsObject = stats.reduce((acc, curr) => {
      acc[curr.status] = curr._count.status;
      return acc;
    }, {} as Record<string, number>);

    const defaultStats = {
      pendiente: 0,
      entrevista: 0,
      rechazado: 0,
      ...statsObject,
    };

    return defaultStats;
  } catch (error) {
    console.log(error);
    redirect('/jobs');
  }
};

export const getChartsDataAction = async (): Promise<
  Array<{ date: string; count: number }>
> => {
  const userId = authenticateAndRedirect();

  const sixMontAgo = dayjs().subtract(6, 'month').toDate();

  try {
    const jobs = await prisma.job.findMany({
      where: {
        userId,
        createdAt: {
          gte: sixMontAgo,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    let applicationsPerMonth = jobs.reduce((acc, job) => {
      const date = dayjs(job.createdAt).format('MMM YY');
      const existingEntry = acc.find((entry) => entry.date === date);

      if (existingEntry) existingEntry.count += 1;
      else acc.push({ date, count: 1 });

      return acc;
    }, [] as Array<{ date: string; count: number }>);

    return applicationsPerMonth;
  } catch (error) {
    console.log(error);
    redirect('/jobs');
  }
};
