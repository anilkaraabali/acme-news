import Cookies from 'js-cookie';
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { USER_CATEGORIES_COOKIE_KEY, USER_STORAGE_KEY } from './constant';
import { IUser } from './types';

interface UserContextType {
  setCategories: (categories: string[]) => void;
  setUser: (user: IUser) => void;
  user: IUser | null;
}

const UserContext = createContext<UserContextType>({
  setCategories: () => null,
  setUser: () => null,
  user: null,
});

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUserState] = useState<IUser | null>(null);

  const setUser = (newUser: IUser) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    }
    setUserState(newUser);
  };

  const setCategories = (categories: string[]) => {
    Cookies.set(USER_CATEGORIES_COOKIE_KEY, JSON.stringify(categories), {
      expires: 365,
    });
    setUserState((prev) => (prev ? { ...prev, categories } : null));
  };

  useEffect(() => {
    const categories = Cookies.get(USER_CATEGORIES_COOKIE_KEY);

    setUserState((prev) =>
      prev
        ? { ...prev, categories: categories ? JSON.parse(categories) : [] }
        : null
    );
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);

      setUserState(storedUser ? JSON.parse(storedUser) : null);
    }
  }, []);

  return (
    <UserContext.Provider value={{ setCategories, setUser, user }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = (): UserContextType => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};

export { UserProvider, useUser };
