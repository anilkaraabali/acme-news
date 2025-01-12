/* eslint-disable no-console */
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Form, Input } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { LiaEyeSlash, LiaEyeSolid } from 'react-icons/lia';
import { v4 as uuidv4 } from 'uuid';
import { ZodType, z } from 'zod';

import { useUser } from '../user';

type FormData = {
  email: string;
  fullName: string;
  password: string;
  terms: boolean;
};

const SignUpForm = () => {
  const t = useTranslations();
  const router = useRouter();
  const { setUser } = useUser();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const schema: ZodType<FormData> = z.object({
    email: z
      .string()
      .min(1, { message: t('Common.form.required') })
      .email(t('Common.form.email.errorMessage')),
    fullName: z
      .string()
      .min(2, { message: t('Common.form.fullName.errorMessage') }),
    password: z
      .string()
      .min(8, { message: t('Common.form.password.errorMessage.minLength') }),
    terms: z.boolean().refine((value) => value, {
      message: t('Auth.signUp.terms.required'),
    }),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      terms: false,
    },
    resolver: zodResolver(schema),
  });

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');

      return;
    }

    const token = await executeRecaptcha('signUp');

    return token;
  }, [executeRecaptcha]);

  const onSubmit: SubmitHandler<FormData> = useCallback(
    async (data) => {
      try {
        setIsLoading(true);
        const token = await handleReCaptchaVerify();

        // Send data to your API
        console.log('data', data, 'recaptcha token', token);

        setUser({
          ...data,
          id: uuidv4(),
        });
        reset();

        router.push('/');
      } catch (error) {
        console.error('Sign up error', error);
      } finally {
        setIsLoading(false);
      }
    },
    [handleReCaptchaVerify, reset]
  );

  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  return (
    <Form
      className='max-w-64 gap-4'
      onSubmit={handleSubmit(onSubmit)}
      validationBehavior='aria'
    >
      <Controller
        control={control}
        name='fullName'
        render={({ field }) => (
          <Input
            {...field}
            errorMessage={errors.fullName?.message}
            isInvalid={!!errors.fullName?.message}
            isRequired
            placeholder={t('Common.form.fullName.placeholder')}
            size='lg'
            type='text'
            variant='faded'
          />
        )}
      />
      <Controller
        control={control}
        name='email'
        render={({ field }) => (
          <Input
            {...field}
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
      <Controller
        control={control}
        name='password'
        render={({ field }) => (
          <Input
            {...field}
            endContent={
              <button
                aria-label='toggle password visibility'
                className='focus:outline-none'
                onClick={toggleVisibility}
                type='button'
              >
                {isVisible ? (
                  <LiaEyeSlash
                    className='pointer-events-none text-default-400'
                    size={24}
                  />
                ) : (
                  <LiaEyeSolid
                    className='pointer-events-none text-default-400'
                    size={24}
                  />
                )}
              </button>
            }
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password?.message}
            isRequired
            placeholder={t('Common.form.password.placeholder')}
            size='lg'
            type={isVisible ? 'text' : 'password'}
            variant='faded'
          />
        )}
      />
      <Controller
        control={control}
        name='terms'
        render={({ field }) => (
          <Checkbox
            {...field}
            name='terms'
            size='sm'
            value={field.value.toString()}
          >
            <span
              dangerouslySetInnerHTML={{
                __html: t.raw('Auth.signUp.terms.label'),
              }}
            />
          </Checkbox>
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
        {t('Auth.signUp.cta.createAccount')}
      </Button>
      <div
        className='mt-7 text-xs text-default-400'
        dangerouslySetInnerHTML={{ __html: t.raw('Common.recaptcha.info') }}
      />
    </Form>
  );
};

export { SignUpForm };
