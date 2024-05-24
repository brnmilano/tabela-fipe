import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface useCommonProps {
  children: ReactNode;
}

interface CommonContextData {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const CommonContext = createContext({} as CommonContextData);

function CommonProvider({ children }: useCommonProps) {
  const [loading, setLoading] = useState(true);

  return (
    <CommonContext.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
}

function useCommon() {
  return useContext(CommonContext);
}

export { useCommon, CommonProvider };
