import React from 'react';

type JobInfoProps = {
  text: string;
  icon: React.ReactNode;
  truncate?: boolean;
};

const JobInfo = ({ text, icon, truncate = false }: JobInfoProps) => {
  return (
    <div className={`flex gap-x-2 items-center ${truncate ? 'truncate' : ''}`}>
      <span>{icon}</span> <span className="capitalize">{text}</span>
    </div>
  );
};

export default JobInfo;
