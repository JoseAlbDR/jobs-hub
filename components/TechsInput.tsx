import React, { Dispatch, SetStateAction, useState } from 'react';
import { FormItem, FormLabel } from './ui/form';

import { Button } from './ui/button';
import { Badge } from './ui/badge';

import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Command, CommandGroup, CommandInput, CommandItem } from './ui/command';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TechInputProps {
  techs: string[];
  setTechs: Dispatch<SetStateAction<string[]>>;
  currentTechs: string[];
}

const TechsInput = ({ techs, setTechs, currentTechs }: TechInputProps) => {
  const [tech, setTech] = useState<string>('');
  const [open, setOpen] = useState(false);

  const handleAddTech = () => {
    if (tech === '' || techs.includes(tech) || techs.length >= 6) return;
    setTechs((techs) => [...techs, tech]);
    setTech('');
  };

  const handleDeleteTech = (tech: string) => {
    const newTechs = techs.filter((current) => tech !== current);
    setTechs(newTechs);
  };

  return (
    <>
      <FormItem className={`col-span-2 w-full`}>
        <FormLabel className="capitalize">Tecnologias</FormLabel>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {tech
                ? currentTechs.find((curr) => curr === tech)
                : 'Añade tecnología'}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Command>
              <CommandInput placeholder="Busca Tecnología" />
              <CommandGroup>
                {currentTechs.map((curr) => {
                  console.log(curr);
                  return (
                    <CommandItem
                      key={curr}
                      value={curr}
                      onSelect={(currentValue: string) => {
                        setTech(currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          tech === curr ? 'opacity-100' : 'opacity-0'
                        )}
                      />

                      {tech}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <Button onClick={handleAddTech} type="button">
          Añadir
        </Button>
      </FormItem>
      <div className="flex flex-wrap gap-4">
        {techs.map((tech, index) => (
          <Badge
            key={`${tech}-${index}`}
            onClick={() => handleDeleteTech(tech)}
          >
            {tech}
          </Badge>
        ))}
      </div>
    </>
  );
};

export default TechsInput;
