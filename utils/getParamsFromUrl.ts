import { ReadonlyURLSearchParams } from 'next/navigation';
import { JobContract, JobMode, JobStatus, JobType } from './types';

export const getParamsFromUrl = (
  searchParams: ReadonlyURLSearchParams
): {
  search: string;
  status: JobStatus;
  mode: JobMode;
  type: JobType;
  contract: JobContract;
  currPage: number;
  techs: string[];
} => {
  const params = Object.fromEntries(searchParams);
  const search = params.search || '';
  const status = (params.status || 'todos') as JobStatus;
  const mode = (params.mode || 'todos') as JobMode;
  const type = (params.type || 'todos') as JobType;
  const contract = (params.contract || 'todos') as JobContract;
  const currPage = +params.page || 1;
  const techs = params.techs?.split('-') || ['todas'];

  return { search, status, mode, type, contract, currPage, techs };
};
