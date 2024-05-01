'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  JobStatus,
  JobMode,
  CreateAndEditJobType,
  createAndEditJobSchema,
  JobType,
  JobContract,
} from '@/utils/types';

import { Button } from '@/components/ui/button';
import { Form, FormLabel } from '@/components/ui/form';

import { CustomFormField, CustomFormSelect } from './FormComponents';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
import { getSingleJobAction, updateJobAction } from '@/utils/actions';
import { Badge } from './ui/badge';
import { useEffect, useState } from 'react';
import TechsInput from './TechsInput';
import Link from 'next/link';
import DatePicker from './SelectDate';
import GoogleCalendarLink from './GoogleCalendarLink';

const EditJobForm = ({ jobId }: { jobId: string }) => {
  const [techs, setTechs] = useState<string[]>([]);
  const [date, setDate] = useState<Date>();

  const { data } = useQuery({
    queryKey: ['job', jobId],
    queryFn: () => getSingleJobAction(jobId),
  });

  useEffect(() => {
    setTechs(data?.techs || []);
  }, [data?.techs]);

  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: data?.position || '',
      company: data?.company || '',
      location: data?.location || '',
      link: data?.link || '',
      status: (data?.status as JobStatus) || JobStatus.Pending,
      mode: (data?.mode as JobMode) || JobMode.FullTime,
      type: (data?.type as JobType) || JobType.Presential,
      contract: (data?.contract as JobContract) || JobContract.Permanent,
      note: data?.note || '',
    },
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) =>
      updateJobAction(jobId, { ...values, techs }),
    onSuccess: (data) => {
      if (!data) {
        toast({
          description: 'Hubo un error actualiando el trabajo',
          variant: 'destructive',
        });
        return;
      }
      toast({ description: 'Trabajo actualizado' });
      queryClient.invalidateQueries({
        queryKey: ['jobs'],
      });
      queryClient.invalidateQueries({
        queryKey: ['job', jobId],
      });
      queryClient.invalidateQueries({
        queryKey: ['stats'],
      });

      router.push('/jobs');
    },
  });

  const onSubmit = (values: CreateAndEditJobType) => {
    mutate(values);
  };

  const watchStatus = form.watch('status');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="form-custom px-5">
        <header className="header-custom">
          <h2 className="h2-custom">actualizar trabajo</h2>
        </header>

        <main className="main-custom">
          <section className="section-custom">
            <CustomFormField
              name="position"
              control={form.control}
              label="puesto"
              className="w-full md:w-2/3"
            />
            <CustomFormSelect
              name="status"
              control={form.control}
              label="estado"
              items={Object.values(JobStatus)}
              className="w-full md:w-1/3"
            />
            {watchStatus === 'entrevista' && (
              <div className="flex flex-col">
                <DatePicker date={date} setDate={setDate} />
                <GoogleCalendarLink date={date} job={data!} />
              </div>
            )}
          </section>
          <section className="section-custom">
            <CustomFormField
              name="company"
              control={form.control}
              label="empresa"
              className="w-full"
            />
            <CustomFormField
              name="location"
              control={form.control}
              label="ubicación"
              className="w-full"
            />
            <CustomFormField
              name="link"
              control={form.control}
              label="URL"
              className="w-full"
            />
          </section>

          <section className="section-custom">
            <TechsInput
              techs={techs}
              setTechs={setTechs}
              currentTechs={data?.techs || []}
            />
          </section>

          <section className="section-custom">
            <CustomFormSelect
              name="mode"
              control={form.control}
              label="jornada"
              items={Object.values(JobMode)}
              className="w-full"
            />
            <CustomFormSelect
              name="type"
              control={form.control}
              label="tipo"
              items={Object.values(JobType)}
              className="w-full"
            />
            <CustomFormSelect
              name="contract"
              control={form.control}
              label="contrato"
              items={Object.values(JobContract)}
              className="w-full"
            />
          </section>

          <section className="section-custom">
            <CustomFormField
              name="note"
              control={form.control}
              label="Nota"
              type="area"
              className="w-full "
            />
          </section>
        </main>
        <footer className="flex justify-end">
          <Button type="submit" className="btn-custom" disabled={isPending}>
            {isPending ? 'actualizando' : 'actualizar '}
          </Button>
        </footer>
      </form>
    </Form>
  );
};

export default EditJobForm;
