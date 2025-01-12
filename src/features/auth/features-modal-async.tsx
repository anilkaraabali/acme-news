import dynamic from 'next/dynamic';

import { AuthFeaturesModalProps } from './features-modal';

const AuthFeaturesModalAsync = dynamic<AuthFeaturesModalProps>(
  () => import('./features-modal').then((mod) => mod.AuthFeaturesModal),
  { ssr: false }
);

export { AuthFeaturesModalAsync };
