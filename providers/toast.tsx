import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

interface State {
  toast: boolean;
  toastData: any;
}

export interface ToastContextValue {
  toast: boolean;
  toastData: any;
  setToast: (toast: boolean, toastData?: any) => void;
}

const initialState: State = {
  toast: true,
  toastData: null
};

const ToastContext = createContext(initialState as ToastContextValue);

function TP({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState(initialState);

  const setToast = useCallback(
    (toast: boolean, toastData?: any) => {
      setState(s => ({ ...s, toast, toastData }));
    },
    [setState]
  );

  const value: ToastContextValue = useMemo(() => ({ ...state, setToast }), [setToast, state]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export const ToastProvider = TP;

export const useToast = () => useContext(ToastContext);

export default ToastProvider;
