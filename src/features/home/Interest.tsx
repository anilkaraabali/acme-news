import { Button } from '@nextui-org/react';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { useUser } from '../auth';

const Interest: FC = () => {
  const t = useTranslations();
  const { user } = useUser();

  return (
    <section
      className='mt-4 flex w-full flex-col items-center justify-center gap-2 text-center'
      id='interest'
    >
      <h2 className='text-xl text-primary-700'>
        {user ? t('Home.interest.title') : t('Home.interest.noAuthTitle')}
      </h2>
      <Button
        as={user ? undefined : NextLink}
        color='primary'
        href={user ? undefined : '/login'}
        radius='full'
      >
        {user ? t('Home.interest.cta') : t('Common.cta.signIn')}
      </Button>
    </section>
  );
};

export { Interest };
