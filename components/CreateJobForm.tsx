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

  const onSubmit = (values: CreateAndEditJobType) => {
    console.log({ values });
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
          <Button type="submit" className="self-end capitalize">
            añadir trabajo
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateJobForm;
