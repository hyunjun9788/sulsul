'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface ResumeSelection {
  title: string;
  companyName: string;
  archiveId: number;
  selectedArchiveIds: number[];
  setSelectArchiveIds: Dispatch<SetStateAction<number[]>>;
  focusedResume: number;
  setFocusedResume: Dispatch<SetStateAction<number>>;
}

export default function MyResumeSelection({
  title,
  companyName,
  selectedArchiveIds,
  archiveId,
  focusedResume,
  setFocusedResume,
}: ResumeSelection) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    selectedArchiveIds.includes(archiveId) || focusedResume === archiveId
      ? setChecked(true)
      : setChecked(false);
  }, [selectedArchiveIds, focusedResume]);

  const handleCheck = () => {
    setFocusedResume(archiveId);
  };

  return (
    <div
      className={cn(
        'flex flex-row pt-1.5 pl-6 pb-3 border-b border-t-0 border-solid-gray-100',
        checked ? 'bg-blue-100 border-b-white' : 'bg-white',
      )}
      onClick={handleCheck}
    >
      <div className="flex w-[506px] flex-col">
        <div className="flex flex-row items-center font-semibold">
          <div className="size-11 rounded-full  group-hover:bg-blue-100">
            <Checkbox className="m-2.5 size-5 p-[2px]" checked={checked} />
          </div>
          <div
            className={cn(
              'text-base w-[462px] max-h-[50px] line-clamp-2',
              checked
                ? 'text-blue-500 font-semibold'
                : 'text-black font-normal',
            )}
          >
            {title}
          </div>
        </div>
        <span
          className={cn(
            'ml-11 h-8 w-fit items-center rounded-sm px-2.5 py-2 text-2xs text-gray-500',
            checked ? 'bg-white' : 'bg-gray-100',
          )}
        >
          {companyName}
        </span>
      </div>
      <button className="ml-4">
        <ChevronRight
          className={
            focusedResume === archiveId ? 'text-blue-800' : 'invisible'
          }
        />
      </button>
    </div>
  );
}
