'use client';
import {
  HTMLAttributes,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Video } from '@/components/shared/video';
import { cn } from '@/lib/utils';

export const MobileSteps = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [isIntersecting, setIntersecting] = useState<boolean[]>([]);
  useEffect(() => {
    const observers = videoRefs.current.map((video, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIntersecting((prev) => {
            const newState = [...prev];
            newState[index] = entry.isIntersecting;
            return newState;
          });
        },
        {
          threshold: 1,
        },
      );
      if (video) {
        observer.observe(video);
      }
      return observer;
    });
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (isIntersecting[index]) {
          video.play();
        } else {
          video.pause();
        }
      }
    });
  }, [isIntersecting]);
  return (
    <div className={cn('px-6 pb-[50px] bg-white', className)} {...props}>
      <div className="py-[50px] text-center text-4xl font-bold text-gray-800">
        <h2>술술과 함께하는</h2>
        <h2>면접 완성 프로젝트</h2>
      </div>
      <Video
        src="/videos/step-1.mp4"
        title="step1"
        className="w-full rounded-md"
        loop
        muted
        videoRef={(el) => {
          videoRefs.current[0] = el;
        }}
      />
      <div className="mb-16 mt-5">
        <h4 className="text-base font-bold text-blue-500">STEP 01</h4>
        <h3 className="text-3xl font-bold text-gray-800">면접질문 예측하기</h3>
        <div className="mt-[12px] text-sm text-gray-600">
          <p>면접은 지원자가 제출한 서류를 바탕으로 이루어져요.</p>
          <p>내 자소서를 입력하면 나를 위한 면접 예상질문이 생성돼요.</p>
        </div>
      </div>
      <Video
        src="/videos/step-2.mp4"
        title="step1"
        className="w-full rounded-md"
        loop
        muted
        videoRef={(el) => {
          videoRefs.current[1] = el;
        }}
      />
      <div className="mb-16 mt-5">
        <h4 className="text-base font-bold text-blue-500">STEP 02</h4>
        <h3 className="text-3xl font-bold text-gray-800">
          나만의 답변 정리하기
        </h3>
        <div className="mt-[12px] text-sm text-gray-600">
          <p>질문에 대한 답변을 작성하고 키워드 노트로 핵심 키워드를</p>
          <p>정리해보세요. 작성한 답변에 대한 피드백도 받을 수 있어요.</p>
        </div>
      </div>
      <Video
        src="/videos/step-3.mp4"
        title="step1"
        className="w-full rounded-md bg-white"
        loop
        muted
        videoRef={(el) => {
          videoRefs.current[2] = el;
        }}
      />
      <div className="mt-5">
        <h4 className="text-base font-bold text-blue-500">STEP 03</h4>
        <h3 className="text-3xl font-bold text-gray-800">실전 연습하기</h3>
        <div className="mt-[12px] text-sm text-gray-600">
          <p>잘 답변할 수 있는 면접질문과 그렇지 못한 질문을 구분하고</p>
          <p>스스로 질문에 대한 답변을 해보며 실전에 대비하세요.</p>
        </div>
      </div>
    </div>
  );
};
