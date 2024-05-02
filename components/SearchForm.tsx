'use client';
import {
  JobContract,
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
import TechsInput from './TechsInput';
import { useQuery } from '@tanstack/react-query';
import { getUniqueTechTags } from '@/utils/actions';
import { useErrorNotification } from '@/hooks/useErrorNotification';
import { useEffect, useState } from 'react';

const SearchForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const params = Object.fromEntries(searchParams);
  const [techs, setTechs] = useState<string[]>([]);

  const {
    data: currentTechs,
    isError,
    error,
  } = useQuery({
    queryFn: getUniqueTechTags,
    queryKey: ['techs'],
  });

  useErrorNotification({
    isError,
    title: 'Error cargando tecnologias',
    description: error?.message || 'Error desconocido',
  });

  const form = useForm<SearchFormType>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      search: params?.search || '',
      mode: (params?.mode as JobMode) || JobMode.All,
      status: (params?.status as JobStatus) || JobStatus.All,
      type: (params?.type as JobType) || JobType.All,
      contract: (params?.contract as JobContract) || JobContract.All,
    },
  });

  useEffect(() => {
    if (params.techs?.split('-').includes('todas')) return;
    setTechs(params.techs?.split('-') || []);
  }, [params.techs]);

  const onSubmit = ({
    search,
    mode,
    status,
    type,
    contract,
  }: SearchFormType) => {
    let newParams = new URLSearchParams();
    search && newParams.set('search', search || '');
    newParams.set('mode', mode);
    newParams.set('type', type);
    newParams.set('status', status);
    newParams.set('contract', contract);
    newParams.set('techs', techs.join('-') || 'todas');

    router.push(`${pathname}?${newParams.toString()}`);
  };

  const handleResetForm = () => {
    const resetParams = new URLSearchParams();
    form.reset();
    resetParams.set('mode', 'todos');
    resetParams.set('type', 'todos');
    resetParams.set('status', 'todos');
    resetParams.set('contract', 'todos');
    resetParams.set('techs', 'todas');

    form.setValue('search', '');
    form.setValue('mode', JobMode.All);
    form.setValue('type', JobType.All);
    form.setValue('status', JobStatus.All);
    form.setValue('contract', JobContract.All);
    setTechs([]);

    router.push(`${pathname}?${resetParams.toString()}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="form-custom px-5">
        <header className="header-custom">
          <h2 className="h2-custom">Buscar</h2>
        </header>
        <main className="main-custom">
          <section className={`section-custom invalid-md-flex-row`}>
            <article className="article-custom">
              <CustomFormField
                name="search"
                control={form.control}
                label="puesto"
                className="w-full"
              />
            </article>

            <article className="article-custom gap-1">
              <CustomFormSelect
                name="status"
                control={form.control}
                label="estado"
                items={Object.values(JobStatus)}
                type="search"
                className="w-full"
              />
              <CustomFormSelect
                name="mode"
                control={form.control}
                label="jornada"
                items={Object.values(JobMode)}
                type="search"
                className="w-full"
              />
              <CustomFormSelect
                name="contract"
                control={form.control}
                label="contrato"
                items={Object.values(JobContract)}
                type="search"
                className="w-full"
              />
              <CustomFormSelect
                name="type"
                control={form.control}
                label="tipo"
                items={Object.values(JobType)}
                type="search"
                className="w-full"
              />
            </article>
            <article className="article-custom">
              <TechsInput
                techs={techs}
                setTechs={setTechs}
                currentTechs={currentTechs || []}
                type="search"
              />
            </article>
            <article className={`article-custom gap-5 justify-end`}>
              <Button type="submit" className="btn-custom">
                Buscar
              </Button>
              <Button
                type="reset"
                className="btn-custom"
                onClick={handleResetForm}
              >
                Reset
              </Button>
            </article>
          </section>
        </main>
      </form>
    </Form>
  );
};

export default SearchForm;
