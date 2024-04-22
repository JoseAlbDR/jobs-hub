import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

import { Skeleton } from './ui/skeleton';
import { Separator } from './ui/separator';

const JobLoadingCard = () => {
  return (
    <Card className="bg-muted flex flex-col gap-3 h-[416px]">
      <CardHeader>
        <CardTitle className="capitalize">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </CardTitle>
        <CardDescription className="capitalize">
          <Skeleton className="h-4 w-[125px]" />
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="flex gap-2 flex-col flex-1 pt-6">
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <Skeleton className="h-4 w-[125px]" />
          <Skeleton className="h-4 w-[125px]" />
          <Skeleton className="h-4 w-[125px]" />
          <Skeleton className="h-4 w-[125px]" />
          <Skeleton className="h-4 w-[125px]" />
        </div>
        <Skeleton className="h-4 w-[71px]" />
        <Skeleton className="h-4 w-[250px]" />
      </CardContent>
      <Separator />
      <CardFooter className="flex gap-4">
        <Skeleton className="h-4 w-[71px]" />
        <Skeleton className="h-4 w-[71px]" />
      </CardFooter>
    </Card>
  );
};

export default JobLoadingCard;
