import { Button, ButtonGroup } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { FC, useEffect, useState } from 'react';
import { LiaDesktopSolid, LiaMoonSolid, LiaSunSolid } from 'react-icons/lia';

const ThemeSwitch: FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  const { setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  // Prevent Hydration Mismatch
  if (!isMounted) return <div className='size-6' />;

  return (
    <ButtonGroup radius='full' variant='flat'>
      <Button
        aria-label='Light theme'
        isIconOnly
        onPress={() => setTheme('light')}
        title='Light theme'
      >
        <LiaSunSolid size={20} />
      </Button>
      <Button
        aria-label='System theme'
        isIconOnly
        onPress={() => setTheme('system')}
        title='System theme'
      >
        <LiaDesktopSolid size={20} />
      </Button>
      <Button
        aria-label='Dark theme'
        isIconOnly
        onPress={() => setTheme('dark')}
        title='Dark theme'
      >
        <LiaMoonSolid size={20} />
      </Button>
    </ButtonGroup>
  );
};

export { ThemeSwitch };
