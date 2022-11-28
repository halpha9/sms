import { useToast } from 'providers/toast';
import React from 'react';
import { useSession } from '../providers/session';
import ErrorToast from './error-toast';
import NavBar from './navbar';
import Spinner from './spinner';
import SuccessToast from './success-toast';

const zIndex = { zIndex: 9999999 };

function Layout({ children }: { children: React.ReactNode }) {
  const { loading } = useSession();

  const { toast, toastData } = useToast();

  return (
    <>
      {!loading ? (
        <>
          <div className="fixed inset-0  bg-white flex-1 flex flex-col transition-all z-0 overflow-hidden outline-none">
            <NavBar />
            <div className={'relative flex-1 overflow-y-scroll'}>{children}</div>
          </div>

          <div
            aria-live="assertive"
            className={`fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-end sm:justify-end`}
            style={zIndex}
          >
            <div
              className={`max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-none ring-1 ring-black ring-opacity-5 overflow-hidden transition-all duration-100 ${
                toast
                  ? 'translate-y-0 opacity-100 sm:translate-x-0'
                  : 'translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2'
              }`}
            >
              <div>
                {toast && toastData?.type === 'success' && <SuccessToast />}
                {toast && toastData?.type === 'error' && <ErrorToast />}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 bg-slate-900 w-screen h-screen items-center justify-center">
          <Spinner width={100} height={100} />
        </div>
      )}
    </>
  );
}

export default Layout;
