import React, { Dispatch, SetStateAction, useState } from 'react';
import { FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface TechInputProps {
  techs: string[];
  setTechs: Dispatch<SetStateAction<string[]>>;
}

const TechsInput = ({ techs, setTechs }: TechInputProps) => {
  const [tech, setTech] = useState<string>('');

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
        <Input
          name="techs"
          onChange={(e) => setTech(e.target.value)}
          value={tech}
        />
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
