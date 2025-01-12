/* eslint-disable no-console */
import { NextPageWithLayout } from '@/pages/_app';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Divider, Form, Input } from '@nextui-org/react';
import Image from 'next/image';
import { AbstractIntlMessages, useTranslations } from 'next-intl';
import LoginSVG from 'public/icons/auth/login.svg';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';

import { LoginHeader } from './header';

type FormData = {
  email: string;
};

interface LoginProps {
  messages: AbstractIntlMessages;
}

function Login() {
  const t = useTranslations();

  const [isLoading, setIsLoading] = useState(false);

  const schema: ZodType<FormData> = z.object({
    email: z
      .string()
      .min(1, { message: t('Common.form.required') })
      .email(t('Common.form.email.errorMessage')),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setIsLoading(true);

      // Send data to your API
      console.log('data', data);

      reset();
    } catch (error) {
      console.error('Login error', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex h-screen w-screen flex-col px-5 pb-4'>
      <LoginHeader />
      <div className='flex w-full grow justify-center rounded-xl bg-content2 dark:bg-content1'>
        <div className='h-[calc(100%-50px)] w-full overflow-hidden pt-4 md:pt-12 lg:flex lg:gap-x-3'>
          <div className='flex w-full items-start justify-center px-4 lg:w-1/2 lg:items-center'>
            <div className='min-h-[500px] max-w-[400px]'>
              <div className='flex w-full flex-col items-center justify-center gap-12'>
                <div className='flex flex-col gap-2'>
                  <h1 className='text-3xl font-medium tracking-tight lg:text-4xl'>
                    {t('Auth.login.title')}
                  </h1>
                  <p className='mt-2 text-default-500'>
                    {t('Auth.login.description')}
                  </p>
                </div>
                <div className='flex w-full flex-col gap-4'>
                  <Button
                    className='bg-background'
                    fullWidth
                    size='lg'
                    startContent={
                      <Image
                        alt='Continue with Google'
                        height={24}
                        src='/icons/socials/google.svg'
                        width={24}
                      />
                    }
                    variant='bordered'
                  >
                    {t('Auth.login.cta.google')}
                  </Button>
                  <Button
                    className='bg-background'
                    fullWidth
                    size='lg'
                    startContent={
                      <Image
                        alt='Continue with Facebook'
                        height={24}
                        src='/icons/socials/facebook.svg'
                        width={24}
                      />
                    }
                    variant='bordered'
                  >
                    {t('Auth.login.cta.facebook')}
                  </Button>
                  <Divider className='my-4' />
                  <Form
                    className='gap-4'
                    onSubmit={handleSubmit(onSubmit)}
                    validationBehavior='aria'
                  >
                    <Controller
                      control={control}
                      name='email'
                      render={({ field }) => (
                        <Input
                          {...field}
                          classNames={{
                            inputWrapper: 'bg-background',
                          }}
                          errorMessage={errors.email?.message}
                          isInvalid={!!errors.email?.message}
                          isRequired
                          placeholder={t('Common.form.email.placeholder')}
                          size='lg'
                          type='email'
                          variant='faded'
                        />
                      )}
                    />
                    <Button
                      color='primary'
                      fullWidth
                      isLoading={isLoading}
                      size='lg'
                      type='submit'
                      variant='shadow'
                    >
                      {t('Auth.login.cta.email')}
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
          <aside className='relative hidden items-center justify-center md:w-1/2 lg:flex'>
            <div className='z-10 p-4'>
              <LoginSVG />
            </div>
            <div className='absolute inset-x-0 overflow-hidden'>
              <svg
                fill='none'
                height='600'
                viewBox='0 0 704 600'
                width='100%'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect fill='#ECB462' height='600' rx='150' width='996' />
              </svg>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export type { LoginProps };
export default Login;

Login.getLayout = (page: NextPageWithLayout) => page;
