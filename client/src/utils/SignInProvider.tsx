import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface SignInContextProps {
  signin: boolean;
  setSignin: Dispatch<SetStateAction<boolean>>;
}

export const SignInContext = createContext<SignInContextProps | undefined>(undefined);
interface SignInProviderProps {
  children: ReactNode;
}

const SignInProvider: React.FC<SignInProviderProps> = ({ children }) => {
  const [signin, setSignin] = useState(false);

  return (
    <SignInContext.Provider value={{ signin, setSignin }}>
      {children}
    </SignInContext.Provider>
  );
};

export default SignInProvider;
