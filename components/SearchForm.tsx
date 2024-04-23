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
import { articleClassName, buttonClassName, formClassName, h2ClassName, headerClassName, mainClassName, sectionClassName } from '@/utils/tagStylesConfig';

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
      contract: (params?.contract as JobContract) || JobContract.All,
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

  const handleResetForm = () => {
    const resetParams = new URLSearchParams();
    form.reset();
    resetParams.set('mode', 'todos');
    resetParams.set('type', 'todos');
    resetParams.set('status', 'todos');
    resetParams.set('contract', 'todos');

    form.setValue('search', '');
    form.setValue('mode', JobMode.All);
    form.setValue('type', JobType.All);
    form.setValue('status', JobStatus.All);
    form.setValue('contract', JobContract.All);

    router.push(`${pathname}?${resetParams.toString()}`);
  };
  
  return (
    <Form {...form}>
      <form
         onSubmit={form.handleSubmit(onSubmit)}
         className={formClassName}
      >
         <header className={headerClassName}>
            <h2 className={h2ClassName}>Buscar</h2>
         </header>
         <main className={mainClassName}>
          <section className={`${sectionClassName} md:flex-col`}>

            <article className={articleClassName}>
               <CustomFormField
            name="search"
            control={form.control}
            label="puesto"
            className='w-full'
          />
            </article>

            <article className={articleClassName}>
               <CustomFormSelect
            name="status"
            control={form.control}
            label="estado"
            items={Object.values(JobStatus)}
            type="search" 
            className='w-full'
          />
          <CustomFormSelect
            name="mode"
            control={form.control}
            label="jornada"
            items={Object.values(JobMode)}
            type="search"
            className='w-full'
          />
          <CustomFormSelect
            name="contract"
            control={form.control}
            label="contrato"
            items={Object.values(JobContract)}
            type="search"
            className='w-full'
          />
          <CustomFormSelect
            name="type"
            control={form.control}
            label="tipo"
            items={Object.values(JobType)}
            type="search"
            className='w-full'
          />
            </article>
         <article className={`${articleClassName} justify-end`}>
<Button type="submit" className={buttonClassName}>
            Buscar
          </Button>
          <Button
            type="reset"
            className={buttonClassName}
            
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
