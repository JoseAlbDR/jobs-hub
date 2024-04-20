'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  JobStatus,
  JobMode,
  CreateAndEditJobType,
  createAndEditJobSchema,
  JobType,
} from '@/utils/types';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { CustomFormField, CustomFormSelect } from './FormComponents';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
import { createJobAction } from '@/utils/actions';

const CreateJobForm = () => {
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: '',
      company: '',
      location: '',
      link: '',
      status: JobStatus.Pending,
      mode: JobMode.FullTime,
      type: JobType.Remote,
    },
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) => createJobAction(values),
    onSuccess: (data) => {
      if (!data) {
        toast({ description: 'Hubo un error creando el trabajo' });
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
        className="bg-muted p-8 rounded"
      >
        <h2 className="capitalize font-semibold text-4xl mb-6">
          añadir trabajo
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
          <CustomFormField
            name="position"
            control={form.control}
            label="puesto"
          />
          <CustomFormField
            name="company"
            control={form.control}
            label="empresa"
          />
          <CustomFormField
            name="location"
            control={form.control}
            label="ubicacion"
          />
          <CustomFormField name="link" control={form.control} label="URL" />
          <CustomFormSelect
            name="status"
            control={form.control}
            label="estado"
            items={Object.values(JobStatus)}
          />
          <CustomFormSelect
            name="mode"
            control={form.control}
            label="jornada"
            items={Object.values(JobMode)}
          />
          <CustomFormSelect
            name="type"
            control={form.control}
            label="tipo"
            items={Object.values(JobType)}
          />
          <CustomFormField
            name="note"
            control={form.control}
            label="Nota"
            type="area"
          />
          <Button
            type="submit"
            className="self-end capitalize"
            disabled={isPending}
          >
            {isPending ? 'creando' : 'añadir trabajo'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateJobForm;
