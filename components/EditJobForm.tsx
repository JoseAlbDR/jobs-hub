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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
import { getSingleJobAction, updateJobAction } from '@/utils/actions';

const EditJobForm = ({ jobId }: { jobId: string }) => {
  const { data, isPending: isLoading } = useQuery({
    queryKey: ['job', jobId],
    queryFn: () => getSingleJobAction(jobId),
  });

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
      note: data?.note || '',
    },
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) =>
      updateJobAction(jobId, values),
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
          actualizar trabajo
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
            {isPending ? 'actualizando' : 'actualizar trabajo'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditJobForm;
