import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { CustomFormField } from './FormComponents';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'El nombre de usuario debe de tener al 2 caracteres.',
  }),
});

const CreateJobForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomFormField control={form.control} name="username" />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default CreateJobForm;
