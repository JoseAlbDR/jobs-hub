import React from 'react';

type JobInfoProps = {
  text: string;
  icon: React.ReactNode;
  truncate?: boolean;
  className? : string;
};

const JobInfo = ({ text, icon, truncate = false, className='' }: JobInfoProps) => {
  return (
    <div className={`flex gap-x-2 items-center w-full justify-start ${className} `}>
      <span >{icon}</span> <span className={`${truncate ? 'truncate text-ellipsis ' : 'capitalize'}`}>{text}</span>
    </div>
  );
};

export default JobInfo;
