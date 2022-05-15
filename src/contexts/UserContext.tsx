import React, {createContext, useContext, useState, ReactNode} from 'react';
import {User} from '../api/types';

// UserContext의 값은 [값, 업데이트 함수] 타입을 지님
type UserContextState = [User | null, (user: User | null) => void];

const UserContext = createContext<UserContextState | null>(null);

export function UserContextProvider({children}: {children: ReactNode}) {
  const userState = useState<User | null>(null);

  return (
    <UserContext.Provider value={userState}>{children}</UserContext.Provider>
  );
}

export function useUserState() {
  const userState = useContext(UserContext);
  if (!userState) {
    throw new Error('UserContext is not used');
  }

  return userState;
}
