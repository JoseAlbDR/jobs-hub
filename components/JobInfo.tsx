import React from 'react';

type JobInfoProps = {
  text: string;
  icon: React.ReactNode;
};

const JobInfo = ({ text, icon }: JobInfoProps) => {
  return (
    <div className="flex gap-x-2 items-center">
      {icon} <span className="capitalize">{text}</span>
    </div>
  );
};

export default JobInfo;
