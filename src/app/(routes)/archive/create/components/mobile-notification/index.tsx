'use client';

import Image from 'next/image';

import { Button } from '@/components/ui/button';

const MobileNotification = () => {
  const copiedLink = 'https://www.sulsul-interview.kr';

  return (
    <div className="hidden mobile:block">
      <div className="mt-[32px] flex size-full flex-col items-center justify-start">
        <Image
          src="/images/mobile-title.png"
          width={255}
          height={180}
          alt="mobile-title"
        />
        <div className="flex flex-col items-center">
          <span className="text-3xl font-semibold">
            PC버전으로 접속해주세요
          </span>
          <span className="font-normal text-gray-500">
            면접질문 예측은 PC 환경에서 가능해요.
          </span>
        </div>
        <Button
          variant={'black'}
          className="mt-6 py-[8.5px] font-medium"
          onClick={() => {
            navigator.clipboard.writeText(copiedLink);
          }}
        >
          <Image
            className="mr-1"
            src="/images/icons/icon-link-white.svg"
            width={24}
            height={24}
            alt="icon"
          />
          술술 링크 복사
        </Button>
        <Image
          className="mt-[129px]"
          src="/images/mobile-direct.svg"
          width={327}
          height={220}
          alt="mobile-direct"
        />
      </div>
    </div>
  );
};

export default MobileNotification;
