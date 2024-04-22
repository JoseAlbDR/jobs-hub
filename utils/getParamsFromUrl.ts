import { ReadonlyURLSearchParams } from 'next/navigation';
import { JobMode, JobStatus, JobType } from './types';

export const getParamsFromUrl = (
  searchParams: ReadonlyURLSearchParams
): {
  search: string;
  status: JobStatus;
  mode: JobMode;
  type: JobType;
  currPage: number;
} => {
  const params = Object.fromEntries(searchParams);
  const search = params.search || '';
  const status = (params.status || 'todos') as JobStatus;
  const mode = (params.mode || 'todos') as JobMode;
  const type = (params.type || 'todos') as JobType;
  const currPage = +params.page || 1;

  return { search, status, mode, type, currPage };
};
