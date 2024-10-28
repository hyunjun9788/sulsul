import Image from 'next/image';

import OnehundredQa from '@/app/(routes)/solved/components/onehundred-qa';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import NoDataCard from '@/entities/practice/components/no-data-card';
import { BestCommentsSection } from '@/entities/solved/components/best-comments-section';
import { MyActivitySection } from '@/entities/solved/components/my-activity-section';
import { TogetherSolvedSection } from '@/entities/solved/components/together-solved-section';
import { WeekRankingSection } from '@/entities/solved/components/week-ranking-section';
import { cn } from '@/lib/utils';
import { formatDate } from '@/shared/helpers/date-helpers';

export const Solved = async () => {
  const pivotDate = formatDate({ formatCase: 'YYYY-MM-DD' });
  const authInfo = await auth();

  const { userId = 0, accessToken = '' } = authInfo?.user.auth || {};

  return (
    <main className="flex w-full gap-6">
      <div className="hidden lg:flex lg:w-[282px] lg:flex-col lg:gap-[30px] ">
        <MyActivitySection
          userId={userId || 0}
          accessToken={accessToken || ''}
        />
        <WeekRankingSection
          accessToken={accessToken || ''}
          pivotDate={pivotDate}
        />

        <Image
          src="/images/gift-banner.svg"
          width={282}
          height={147}
          alt="banner"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 px-4 md:px-0 lg:px-0 mobile:w-[50%]">
        <TogetherSolvedSection pivotDate={pivotDate} />
        <OnehundredQa accessToken={accessToken} />
      </div>
      <div className="hidden lg:mt-[6px] lg:flex lg:w-[282px] lg:flex-col lg:gap-2">
        <div className="flex items-center gap-1">
          <Image
            src="/images/icons/icon-pin.svg"
            width={24}
            height={24}
            alt="icon"
          />
          <h3 className="text-lg font-bold">지난주 BEST 답변</h3>
        </div>
        <div
          className={cn(
            'relative flex w-full flex-col items-center rounded-md border border-gray-200 bg-white pb-[27px] pt-[30px] shadow-base',
            !accessToken && 'min-h-[478px]',
          )}
        >
          {accessToken && <BestCommentsSection accessToken={accessToken} />}
          {!accessToken && (
            <NoDataCard
              content="로그인 후 볼 수 있어요"
              className="border-none text-base font-medium text-gray-400 shadow-none"
            />
          )}
        </div>
      </div>
    </main>
  );
};
