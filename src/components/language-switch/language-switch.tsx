import {
  Button,
  Code,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { LiaAngleDownSolid, LiaGlobeSolid } from 'react-icons/lia';

const locales = [
  {
    label: 'English',
    value: 'en',
  },
  {
    label: 'Türkçe',
    value: 'tr',
  },
];

interface LanguageSwitchProps {
  triggerButtonProps?: React.ComponentProps<typeof Button>;
}

const LanguageSwitch: FC<LanguageSwitchProps> = ({ triggerButtonProps }) => {
  const { locale, route } = useRouter();

  const activeLocale = locales.find((l) => l.value === locale);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          aria-label='Language switch'
          endContent={<LiaAngleDownSolid size={16} />}
          startContent={<LiaGlobeSolid size={24} />}
          title='Language switch'
          variant='bordered'
          {...triggerButtonProps}
        >
          {activeLocale?.label}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label='Language selection menu'
        id='language-dropdown-menu'
        variant='faded'
      >
        {locales.map((locale) => (
          <DropdownItem
            aria-label={locale.label}
            as={NextLink}
            href={route}
            isDisabled={locale.value === 'tr'}
            key={locale.value}
            startContent={<LiaGlobeSolid size={24} />}
            title={
              <>
                {locale.label}{' '}
                {locale.value === 'tr' && (
                  <Code color='secondary'>Coming soon</Code>
                )}
              </>
            }
            variant='flat'
          />
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export type { LanguageSwitchProps };
export { LanguageSwitch };
