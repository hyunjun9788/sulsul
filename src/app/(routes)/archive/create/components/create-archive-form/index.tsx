'use client';

import {
  HTMLAttributes,
  MouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { throttle } from 'lodash-es';

import { Form } from '@/components/ui/form';
import { useCreateArchive } from '@/entities/archives/hooks';
import { useCurrentUser } from '@/entities/users/hooks';
import { cn } from '@/lib/utils';
import { useResetAvailableStore } from '@/store/resetAvailable';

import { useCreateArchiveFormContext } from '../../hooks/use-create-archive-form';
import { ContentLength } from './content-length';
import { CompanyNameField } from './fields/company-name-field';
import { ContentField } from './fields/content-field';
import { TitleField } from './fields/title-field';
import { FormAction } from './form-action';
import { Heading } from './heading';

interface CreateArchiveFormProps extends HTMLAttributes<HTMLDivElement> {}

export const CreateArchiveForm = ({
  className,
  ...props
}: CreateArchiveFormProps) => {
  const { setIsResetAvailable } = useResetAvailableStore();

  const { form } = useCreateArchiveFormContext();
  const { mutate, isPending } = useCreateArchive();
  const { status } = useCurrentUser();

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const scrollYRef = useRef(0);

  const handleMouseMove = useMemo(
    () =>
      throttle((e: MouseEvent) => {
        setMousePosition({
          x: e.clientX,
          y: e.clientY + scrollYRef.current,
        });
      }, 16),
    [],
  );

  const handleScroll = useMemo(
    () =>
      throttle(() => {
        scrollYRef.current = window.scrollY;
      }, 16),
    [],
  );

  const handleSubmit = form.handleSubmit((data) => {
    if (isPending) return;
    mutate(data);
  });

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  //초기화 함수
  const onClickResetContents = () => {
    form.reset({
      title: '',
      companyName: '',
      resume: '',
    });
    setTimeout(() => {
      form.clearErrors(['title', 'companyName', 'resume']);
    }, 0);
    setIsResetAvailable(true);
  };

  return (
    <div className={cn('h-full', className)} {...props}>
      <Form {...form}>
        <form className="h-full" onSubmit={handleSubmit}>
          <Heading />
          <div className="mt-[18px] size-full w-[486px] rounded-md border border-gray-200 bg-white p-[28px] shadow-base">
            <div className="flex size-full flex-col items-start gap-2">
              <div
                className="flex size-full flex-col"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <CompanyNameField className="w-full" />
                <TitleField className="w-full" />
                <ContentField className="size-full flex-1" />
              </div>
              <ContentLength />
              <FormAction
                onClickResetContents={onClickResetContents}
                className="w-full"
              />
            </div>
          </div>
        </form>
      </Form>
      {status === 'unauthenticated' && isHovering && (
        <div
          className="absolute left-4 top-0 rounded-xl bg-gray-800 p-3 text-sm font-medium text-white "
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          }}
        >
          로그인 후 사용할 수 있어요.
        </div>
      )}
    </div>
  );
};
