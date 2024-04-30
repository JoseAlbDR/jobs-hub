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
import { Form, FormItem, FormLabel } from '@/components/ui/form';
import { CustomFormField, CustomFormSelect } from './FormComponents';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
import { createJobAction, getUniqueTechTags } from '@/utils/actions';
import { IconFilePlus } from '@tabler/icons-react';
import { useState } from 'react';
import TechsInput from './TechsInput';

const CreateJobForm = () => {
  const [techs, setTechs] = useState<string[]>([]);

  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: '',
      company: '',
      location: '',
      link: '',
      status: JobStatus.Pending,
      mode: JobMode.FullTime,
      type: JobType.Presential,
      contract: JobContract.Permanent,
    },
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const { data: currentTechs } = useQuery({
    queryFn: getUniqueTechTags,
    queryKey: ['techs'],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) =>
      createJobAction({ ...values, techs }),
    onSuccess: (data) => {
      if (!data) {
        toast({
          description: 'Hubo un error creando el trabajo',
          variant: 'destructive',
        });
        return;
      }
      toast({ description: 'Trabajo creado' });
      queryClient.invalidateQueries({
        queryKey: ['jobs'],
      });
      queryClient.invalidateQueries({
        queryKey: ['stats'],
      });
      queryClient.invalidateQueries({
        queryKey: ['charts'],
      });
      queryClient.invalidateQueries({
        queryKey: ['techs'],
      });

      router.push('/jobs');
    },
  });

  const onSubmit = (values: CreateAndEditJobType) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="form-custom px-5 max-sm:w-screen"
      >
        <header className="header-custom">
          <h2 className="h2-custom">nuevo trabajo</h2>
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

          <section className="section-custom flex flex-col">
            <TechsInput
              techs={techs}
              setTechs={setTechs}
              currentTechs={currentTechs || []}
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
            <IconFilePlus stroke={2} /> {isPending ? 'creando' : 'añadir'}
          </Button>
        </footer>
      </form>
    </Form>
  );
};

export default CreateJobForm;
