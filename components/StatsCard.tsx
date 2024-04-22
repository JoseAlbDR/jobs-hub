import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import { redirect } from 'next/navigation';
import { Button } from './ui/button';
import Link from 'next/link';

interface StatsCardProps {
  title: string;
  value: number;
  color: string;
}

const StatsCard = ({ title, value, color }: StatsCardProps) => {
  return (
    <Link href={`/jobs?status=${title}`}>
      <Card className={`${color} opacity-85`}>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="capitalize text-white">{title}</CardTitle>
          <CardDescription className="text-4xl font-extrabold text-white mt-[0px!important]">
            {value}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default StatsCard;
