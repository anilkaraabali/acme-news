import type { GetServerSideProps } from 'next';

import { SignUpProps } from '@/features/auth/sign-up/layout';
import { pick } from 'radash';

export const getServerSideProps = (async (ctx) => ({
  props: {
    messages: pick(
      (await import(`../../messages/${ctx.locale}.json`)).default,
      ['Common', 'Auth']
    ),
  },
})) satisfies GetServerSideProps<SignUpProps>;

export { default } from '@/features/auth/sign-up/layout';
