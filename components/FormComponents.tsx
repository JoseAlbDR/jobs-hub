import { Control } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';

type CustomFormFieldProps = {
  name: string;
  control: Control<any>;
  label: string;
  type?: 'input' | 'area';
  className?: string;
};

export const CustomFormField = ({
  control,
  name,
  label,
  type = 'input',
  className = '',
}: CustomFormFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`${type === 'area' && 'col-span-2'} ${className}`}>
          <FormLabel className="capitalize">{label}</FormLabel>
          <FormControl>
            {type === 'input' ? <Input {...field} /> : <Textarea {...field} />}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

type CustomFormSelectProps = {
  name: string;
  control: Control<any>;
  items: string[];
  label: string;
  type?: string;
  className?:string;
};

export const CustomFormSelect = ({
  name,
  control,
  items,
  label,
  type = 'create',
  className = ''
}: CustomFormSelectProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`${className}`}>
          <FormLabel className="capitalize">{label}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue className="capitalize" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.map((item) =>
                type === 'search' ? (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ) : (
                  item !== 'todos' && (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  )
                )
              )}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
