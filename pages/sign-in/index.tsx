import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { useSession } from "../../providers/session";

type FormType = {
  username: string;
  password: string;
  code?: string;
};

type State = {
  error: string | undefined;
  loading: boolean;
  forgot: boolean;
  reset: boolean;
  register: boolean;
};

const SignIn = () => {
  const router = useRouter();
  const session = useSession();
  const [state, setState] = useState<State>({
    loading: false,
    error: undefined,
    forgot: false,
    reset: false,
    register: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormType>({
    mode: "all",
    reValidateMode: "onChange",
  });

  const signInUser = async (data: FormType) => {
    setState({ ...state, loading: true });
    console.log("signin");
    const { username, password } = data;
    try {
      const signInResult = await Auth.signIn({ username, password });
      router.replace("/");
    } catch (err) {
      console.log(err);
    }
    setState({ ...state, loading: false });
  };

  const handleRegister = async (data: FormType) => {
    const { username, password } = data;
    setState((s) => ({ ...s, error: undefined, loading: true }));
    try {
      await Auth.signUp(username, password);
    } catch (error) {
      let errorMessage;
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setState({ ...state, loading: false, error: errorMessage });
    }
  };

  const forgotPassword = async (data: FormType) => {
    const { username } = data;

    try {
      setState((s) => ({ ...s, error: undefined, loading: true }));
      await session.forgotPassword(username);
      setState((s) => ({ ...s, loading: false, forgot: false, reset: true }));
    } catch (error) {
      let errorMessage;
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setState({ ...state, loading: false, error: errorMessage });
    }
  };

  const resetPassword = async (data: FormType) => {
    const { username, password, code } = data;
    try {
      setState((s) => ({ ...s, error: undefined, loading: true }));
      await session.resetPassword(username, code!, password);
      setState((s) => ({ ...s, loading: false, forgot: false, reset: false }));
    } catch (error) {
      let errorMessage;
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setState({ ...state, loading: false, error: errorMessage });
    }
  };

  const submit = async (data: FormType) => {
    if (state.forgot) {
      return forgotPassword(data);
    }
    if (state.reset) {
      return resetPassword(data);
    }
    if (state.register) {
      return handleRegister(data);
    }
    return signInUser(data);
  };

  const actionText = state.forgot
    ? "Reset Password"
    : state.register
    ? "Create Account"
    : "Sign In";

  return (
    <div className="w-screen h-screen bg-slate-800 flex-col items-center">
      <form className="space-y-6" onSubmit={handleSubmit(submit)}>
        <div className="max-w-lg w-full space-y-8 mx-auto lg:px-8 flex flex-col">
          <input
            className={`block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-slate-500 focus:border-slate-500 ${
              errors.username ? "border-red-500" : "border-gray-300"
            } rounded-md`}
            type="text"
            placeholder="Username"
            autoFocus
            autoComplete="email"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <span className="text-red-500 pt-2 text-sm block">
              Email is required
            </span>
          )}
          {state.reset && (
            <input
              className={`block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-slate-500 focus:border-slate-500 ${
                errors.code ? "border-red-500" : "border-gray-300"
              } rounded-md`}
              type="text"
              placeholder="***"
              {...register("code")}
            />
          )}
          {!state.forgot && (
            <input
              className={`block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-slate-500 focus:border-slate-500 ${
                errors.username ? "border-red-500" : "border-gray-300"
              } rounded-md`}
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
          )}
          {errors.password && (
            <span className="text-red-500 pt-2 text-sm block">
              Password is required
            </span>
          )}
        </div>
      </form>
      <div className="flex flex-col justify-center items-center mt-4">
        <div className="w-full">
          <button
            onClick={handleSubmit(submit)}
            disabled={!isValid || state.loading}
            className="block w-full shadow py-3 px-4 bg-slate-600 placeholder-gray-500 focus:ring-slate-500 focus:border-slate-500"
            type="submit"
          >
            <p className="text-slate-300 font-medium">
              {state.loading ? "Loading..." : actionText}
            </p>
          </button>
        </div>
        {!state.forgot && !state.reset && !state.register && (
          <p
            onClick={() => setState((s) => ({ ...s, forgot: true }))}
            className="text-slate-200 text-lg font-medium"
          >
            Reset Password
          </p>
        )}
        <div className="w-full">
          <button
            onClick={() =>
              setState((s) => ({
                ...s,
                register: !s.register,
                forgot: false,
                reset: false,
              }))
            }
            className="block w-full shadow py-3 px-4 bg-slate-500 placeholder-gray-500 focus:ring-slate-500 focus:border-slate-500"
            type="submit"
          >
            <p className="text-slate-300 font-light text-small">
              {state.register
                ? "Already have an account?"
                : "Don't have an account?"}
            </p>
            <p className="text-slate-300 font-medium">
              {state.register ? "Sign in" : "Sign up today"}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
