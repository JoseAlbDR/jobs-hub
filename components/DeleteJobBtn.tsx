import React from 'react';
import { Button } from './ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { useToast } from './ui/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteJobAction } from '@/utils/actions';

const DeleteJobBtn = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteJobAction(id),
    onSuccess: (data) => {
      if (!data) {
        toast({ description: 'Hubo un error borrando el trabajo' });
      }
      toast({ description: 'Trabajo borrado' });
      queryClient.invalidateQueries({
        queryKey: ['jobs'],
      });
      queryClient.invalidateQueries({
        queryKey: ['stats'],
      });
      queryClient.invalidateQueries({
        queryKey: ['charts'],
      });
    },
  });

  const handleDeleteJob = () => {
    mutate(id);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Borrar</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Ya no habrá marcha atras
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteJob}>
            {isPending ? 'Borrando...' : 'Aceptar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteJobBtn;
