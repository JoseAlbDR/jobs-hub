'use client';
import {
  JobMode,
  JobStatus,
  JobType,
  SearchFormType,
  searchFormSchema,
} from '../utils/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Form } from './ui/form';
import { CustomFormField, CustomFormSelect } from './FormComponents';
import { Button } from './ui/button';

const SearchForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const params = Object.fromEntries(searchParams);

  const form = useForm<SearchFormType>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      search: params?.search || '',
      mode: (params?.mode as JobMode) || JobMode.All,
      status: (params?.status as JobStatus) || JobStatus.All,
      type: (params?.type as JobType) || JobType.All,
    },
  });

  const onSubmit = ({ search, mode, status, type }: SearchFormType) => {
    let newParams = new URLSearchParams();
    search && newParams.set('search', search || '');
    newParams.set('mode', mode);
    newParams.set('type', type);
    newParams.set('status', status);

    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <Form {...form}>
      <form
        className="bg-muted p-8 rounded"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h2 className="capitalize font-semibold text-4xl mb-6">Buscar</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
          <CustomFormField
            name="search"
            control={form.control}
            label="buscar"
          />
          <CustomFormSelect
            name="status"
            control={form.control}
            label="estado"
            items={Object.values(JobStatus)}
            type="search"
          />
          <CustomFormSelect
            name="mode"
            control={form.control}
            label="jornada"
            items={Object.values(JobMode)}
            type="search"
          />
          <CustomFormSelect
            name="type"
            control={form.control}
            label="tipo"
            items={Object.values(JobType)}
            type="search"
          />
          <Button type="submit" className="capitalize self-end">
            Buscar
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SearchForm;
