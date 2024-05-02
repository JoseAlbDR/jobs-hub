import React, { Dispatch, SetStateAction, useState } from 'react';
import { FormItem, FormLabel } from './ui/form';

import { Button } from './ui/button';
import { Badge } from './ui/badge';

import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { useToast } from './ui/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { IconCodePlus } from '@tabler/icons-react';

interface TechInputProps {
  techs: string[];
  setTechs: Dispatch<SetStateAction<string[]>>;
  currentTechs: string[];
  type?: string;
}

const TechsInput = ({
  techs,
  setTechs,
  currentTechs,
  type = 'create',
}: TechInputProps) => {
  const [tech, setTech] = useState<string>('');
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleAddTech = () => {
    if (tech === '' || techs.includes(tech)) {
      setTech('');
      return;
    }

    if (techs.length >= 6)
      return toast({
        description: 'No se pueden añadir más de 6 habilidades',
        variant: 'destructive',
      });

    setTechs((techs) => [...techs, tech]);
    setTech('');
  };

  const handleDeleteTech = (tech: string) => {
    const newTechs = techs.filter((current) => tech !== current);
    setTechs(newTechs);
  };

  return (
    <div className="flex flex-col gap-3 items-start justify-center w-full ">
      <FormLabel>Habilidades</FormLabel>
      <div className="flex flex-col sm:flex-row gap-5 justify-between flex-wrap  w-full">
        <div className="flex gap-2 items-baseline justify-start ">
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
                  : `${
                      type === 'create' ? 'Añade habilidad' : 'Busca habilidad'
                    }`}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Command>
                {type === 'create' ? (
                  <CommandInput
                    placeholder="Añade Habilidad"
                    onChangeCapture={(e) => setTech(e.currentTarget.value)}
                  />
                ) : (
                  <CommandInput placeholder="Busca Habilidad" />
                )}

                <CommandList>
                  <CommandGroup>
                    {currentTechs.map((curr) => {
                      return (
                        <CommandItem
                          key={curr}
                          value={curr}
                          onSelect={(currentValue: string) => {
                            setTech(currentValue === tech ? '' : currentValue);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4 text-white',
                              tech === curr ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                          {curr}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Button onClick={handleAddTech} type="button" className="btn-custom">
            <IconCodePlus stroke={1} />
          </Button>
        </div>
        <div className="flex flex-wrap gap-4">
          {techs.map((tech, index) => (
            <Badge
              onClick={() => handleDeleteTech(tech)}
              variant={'canDeleted'}
              key={`${tech}-${index}`}
            >
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger>{tech}</TooltipTrigger>
                  <TooltipContent sideOffset={20}>
                    <p>Haz click para borrar</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechsInput;
