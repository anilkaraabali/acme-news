import { Error, ErrorProps } from '@/components/error';
import { NextPage } from 'next';
import { pick } from 'radash';

const CustomError: NextPage<ErrorProps> = (props) => <Error {...props} />;

CustomError.getInitialProps = async ({ locale, res }): Promise<ErrorProps> => ({
  messages: pick((await import(`messages/${locale}.json`)).default, [
    'Common',
    'Error',
  ]),
  statusCode: res?.statusCode || 500,
});

export default CustomError;
