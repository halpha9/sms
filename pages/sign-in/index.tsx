import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useSession } from '../../providers/session';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';

interface FormType {
  username: string;
  password: string;
  code?: string;
}

interface State {
  error: string | undefined;
  loading: boolean;
  forgot: boolean;
  reset: boolean;
  register: boolean;
}

const SignIn = () => {
  const router = useRouter();
  const { signIn, signUp, forgotPassword, resetPassword } = useSession();
  const [state, setState] = useState<State>({
    loading: false,
    error: undefined,
    forgot: false,
    reset: false,
    register: false
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<FormType>({
    mode: 'all',
    reValidateMode: 'onChange'
  });

  const signInUser = async (data: FormType) => {
    setState({ ...state, loading: true });
    const { username, password } = data;
    try {
      await signIn(username, password);
      router.replace('/');
    } catch (err) {
      console.log(err);
    }
    setState({ ...state, loading: false });
  };

  const handleRegister = async (data: FormType) => {
    const { username, password } = data;
    setState(s => ({ ...s, error: undefined, loading: true }));
    try {
      await signUp(username, password);
    } catch (error) {
      let errorMessage;
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setState({ ...state, loading: false, error: errorMessage });
    }
  };

  const forgot = async (data: FormType) => {
    const { username } = data;

    try {
      setState(s => ({ ...s, error: undefined, loading: true }));
      await forgotPassword(username);
      setState(s => ({ ...s, loading: false, forgot: false, reset: true }));
    } catch (error) {
      let errorMessage;
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setState({ ...state, loading: false, error: errorMessage });
    }
  };

  const resetPssword = async (data: FormType) => {
    const { username, password, code } = data;
    try {
      setState(s => ({ ...s, error: undefined, loading: true }));
      await resetPassword(username, code, password);
      setState(s => ({ ...s, loading: false, forgot: false, reset: false }));
    } catch (error) {
      let errorMessage;
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setState({ ...state, loading: false, error: errorMessage });
    }
  };

  const submit = async (data: FormType) => {
    console.log(data);
    if (state.forgot) {
      return await forgot(data);
    }
    if (state.reset) {
      return await resetPssword(data);
    }
    if (state.register) {
      return await handleRegister(data);
    }
    return await signInUser(data);
  };

  const actionText = state.forgot ? 'Reset Password' : state.register ? 'Create Account' : 'Sign In';

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8 dark:bg-slate-800 bg-gray-50 flex-1">
      <ChatBubbleLeftEllipsisIcon className="w-64 h-64 pb-20 text-gray-300 dark:text-slate-500" />
      <div className="p-14 dark:bg-slate-700 bg-white w-6/12 rounded-xl shadow">
        <form className="space-y-6" onSubmit={handleSubmit(submit)}>
          <div className="max-w-lg w-full space-y-8 mx-auto lg:px-8 flex flex-col">
            <input
              className={`block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-slate-500 focus:border-slate-500 dark:bg-slate-500 ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              } rounded-md`}
              type="text"
              placeholder="Username"
              autoFocus
              autoComplete="email"
              {...register('username', { required: true })}
            />
            {errors.username && <span className="text-red-500 pt-2 text-sm block">Email is required</span>}
            {state.reset && (
              <input
                className={`block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-slate-500 focus:border-slate-500 dark:bg-slate-500 ${
                  errors.code ? 'border-red-500' : 'border-gray-300'
                } rounded-md`}
                type="text"
                placeholder="***"
                {...register('code')}
              />
            )}
            {!state.forgot && (
              <input
                className={`block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-slate-500 focus:border-slate-500 dark:bg-slate-500 ${
                  errors.username ? 'border-red-500' : 'border-gray-300'
                } rounded-md`}
                type="password"
                placeholder="Password"
                {...register('password', { required: true })}
              />
            )}
            {errors.password && <span className="text-red-500 pt-2 text-sm block">Password is required</span>}
          </div>
        </form>
        <div className="flex flex-col justify-center items-center mt-8 space-y-4">
          <button
            onClick={handleSubmit(submit)}
            disabled={!isValid || state.loading}
            className="max-w-3xl rounded-xl block w-full shadow py-3 px-4 dark:bg-slate-600 dark:placeholder-gray-500 dark:focus:ring-slate-500 dark:focus:border-slate-500"
            type="submit"
          >
            <p className="dark:text-slate-300 text-gray-400 font-medium">{state.loading ? 'Loading...' : actionText}</p>
          </button>
          {!state.forgot && !state.reset && !state.register && (
            <p
              onClick={() => setState(s => ({ ...s, forgot: true }))}
              className="dark:text-slate-200 text-gray-400 text-lg font-medium"
            >
              Reset Password
            </p>
          )}
          <button
            onClick={() =>
              setState(s => ({
                ...s,
                register: !s.register,
                forgot: false,
                reset: false
              }))
            }
            className="max-w-3xl rounded-xl block w-full shadow py-3 px-4 bg-gray-200  dark:bg-slate-500 dark:placeholder-gray-500  dark:focus:ring-slate-500 dark:focus:border-slate-500"
            type="submit"
          >
            <p className="dark:text-slate-300 text-gray-400 font-light text-small">
              {state.register ? 'Already have an account?' : "Don't have an account?"}
            </p>
            <p className="dark:text-slate-300 text-gray-400 font-medium">
              {state.register ? 'Sign in' : 'Sign up today'}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
