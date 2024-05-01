import { useToast } from '@/components/ui/use-toast';
import { useEffect } from 'react';

interface Payload {
  isError: boolean;
  title: string;
  description: string;
  status?: string;
}

export const useErrorNotification = ({
  isError,
  title,
  description,
  status = 'error',
}: Payload) => {
  const { toast } = useToast();

  useEffect(() => {
    if (isError) {
      toast({
        title,
        description,
        variant: `${status === 'error' ? 'destructive' : 'default'}`,
      });
    }
  }, [isError]);
};
