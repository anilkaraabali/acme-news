import { Logo } from '@/components/logo';
import { siteConfig } from '@/config';
import { AuthFeaturesModalAsync, useUser } from '@/features/auth';
import { DynamicTranslationKey } from '@/types';
import { Link } from '@nextui-org/link';
import {
  Avatar,
  Button,
  Divider,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  useDisclosure,
} from '@nextui-org/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { LiaArrowRightSolid, LiaSearchSolid } from 'react-icons/lia';

const Header = () => {
  const t = useTranslations();
  const router = useRouter();
  const { user } = useUser();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      classNames={{
        item: [
          'flex',
          'relative',
          'h-full',
          'items-center',
          "data-[active=true]:after:content-['']",
          'data-[active=true]:after:absolute',
          'data-[active=true]:after:bottom-0',
          'data-[active=true]:after:left-0',
          'data-[active=true]:after:right-0',
          'data-[active=true]:after:h-[2px]',
          'data-[active=true]:after:rounded-[2px]',
          'data-[active=true]:after:bg-primary',
        ],
        wrapper: 'flex-col gap-0',
      }}
      height={112}
      isBordered
      maxWidth='xl'
      onMenuOpenChange={setIsMenuOpen}
    >
      <div className='flex h-16 w-full items-center justify-between'>
        <NavbarContent justify='start'>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className='md:hidden'
          />
          <NavbarBrand>
            <Logo />
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className='basis-1/3' justify='center'>
          <Input
            classNames={{
              base: 'max-w-full h-10',
              input: 'text-small',
              inputWrapper:
                'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
              mainWrapper: 'h-full',
            }}
            placeholder='Type to search...'
            size='sm'
            startContent={<LiaSearchSolid size={18} />}
            type='search'
          />
        </NavbarContent>

        <NavbarContent justify='end'>
          {user ? (
            <Avatar color='primary' isBordered name={user.fullName} />
          ) : (
            <Button
              as={NextLink}
              color='primary'
              endContent={<LiaArrowRightSolid size={20} />}
              href='/login'
              variant='shadow'
            >
              {t('Common.cta.signIn')}
            </Button>
          )}
        </NavbarContent>
      </div>
      <div className='hidden h-12 w-full justify-start lg:flex'>
        <NavbarContent className='hidden gap-8 md:flex' justify='center'>
          {siteConfig.navItems.highlights.map((item) => {
            const authRequired =
              ['following', 'forYou'].includes(item.translationKey) && !user;

            return (
              <NavbarItem
                isActive={router.asPath === item.href}
                key={item.href}
              >
                <NextLink
                  className='data-[active=true]:text-primary'
                  color='foreground'
                  href={authRequired ? '#' : item.href}
                  onClick={authRequired ? onOpen : undefined}
                >
                  {t(
                    `Common.categories.${
                      item.translationKey
                    }` as DynamicTranslationKey
                  )}
                </NextLink>
              </NavbarItem>
            );
          })}
          <Divider className='h-6' orientation='vertical' />
          {siteConfig.navItems.categories.map((item) => (
            <NavbarItem isActive={router.asPath === item.href} key={item.href}>
              <NextLink
                className='data-[active=true]:text-primary'
                color='foreground'
                href={item.href}
              >
                {t(
                  `Common.categories.${
                    item.translationKey
                  }` as DynamicTranslationKey
                )}
              </NextLink>
            </NavbarItem>
          ))}
        </NavbarContent>
      </div>

      {isOpen && (
        <AuthFeaturesModalAsync isOpen={isOpen} onOpenChange={onOpenChange} />
      )}

      <NavbarMenu>
        <div className='mx-4 mt-2 flex flex-col gap-2'>
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link color='foreground' href='#' size='lg'>
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </Navbar>
  );
};

export { Header };
