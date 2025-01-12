import type { GetServerSideProps } from 'next';

import { LoginProps } from '@/features/auth/login/layout';
import { pick } from 'radash';

export const getServerSideProps = (async (ctx) => ({
  props: {
    messages: pick(
      (await import(`../../messages/${ctx.locale}.json`)).default,
      ['Common', 'Auth']
    ),
  },
})) satisfies GetServerSideProps<LoginProps>;

export { default } from '@/features/auth/login/layout';
