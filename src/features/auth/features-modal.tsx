import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

interface AuthFeaturesModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const AuthFeaturesModal: FC<AuthFeaturesModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const t = useTranslations();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader />
            <ModalBody>
              <Image
                alt='Illustration representing the sign-up process.'
                height={276}
                src='/illustrations/login.webp'
                width={512}
              />
              <ul className='flex list-disc flex-col gap-2 pl-6'>
                <li
                  dangerouslySetInnerHTML={{
                    __html: t.raw('Auth.featureModal.followSources'),
                  }}
                />
                <li
                  dangerouslySetInnerHTML={{
                    __html: t.raw('Auth.featureModal.seeForYou'),
                  }}
                />
                <li
                  dangerouslySetInnerHTML={{
                    __html: t.raw('Auth.featureModal.getLocalNews'),
                  }}
                />
              </ul>
            </ModalBody>
            <ModalFooter>
              <Button color='primary' onPress={onClose} variant='light'>
                {t('Common.cta.noThanks')}
              </Button>
              <Button as={NextLink} color='primary' href='/login'>
                {t('Common.cta.signIn')}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export type { AuthFeaturesModalProps };
export { AuthFeaturesModal };
