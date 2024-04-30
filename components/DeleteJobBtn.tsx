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
import { IconAlertTriangle } from '@tabler/icons-react';

const DeleteJobBtn = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteJobAction(id),
    onSuccess: (data) => {
      if (!data) {
        toast({
          description: 'Hubo un error borrando el trabajo',
          variant: 'destructive',
        });
        return;
      }
      toast({ description: 'Trabajo borrado' });
      queryClient.invalidateQueries({
        queryKey: ['jobs'],
      });
      queryClient.invalidateQueries({
        queryKey: ['job', data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ['stats'],
      });
      queryClient.invalidateQueries({
        queryKey: ['charts'],
      });
      queryClient.invalidateQueries({
        queryKey: ['techs'],
      });
    },
  });

  const handleDeleteJob = () => {
    mutate(id);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          disabled={isPending}
          className="rounded-sm"
        >
          Borrar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='flex gap-2 items-center justify-center '><IconAlertTriangle stroke={2} className='stroke-destructive size-10'/> ¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription className='flex justify-center pb-5 text-foreground font-medium'>
            Ya no habrá marcha atrás
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel  className='rounded-sm border-primary-accent text-foreground'>Cancelar</AlertDialogCancel>
          <AlertDialogAction className='rounded-sm bg-destructive text-slate-100' onClick={handleDeleteJob}>
            {isPending ? 'Borrando...' : 'Aceptar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteJobBtn;
