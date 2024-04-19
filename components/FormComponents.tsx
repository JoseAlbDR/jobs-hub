import { Control } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';

type CustomFormFieldProps = {
  name: string;
  control: Control<any>;
};

export const CustomFormField = ({ control, name }: CustomFormFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nombre de usuario</FormLabel>
          <FormControl>
            <Input placeholder="shacdn" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export const CustomFormSelect = () => {};
