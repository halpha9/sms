import { CognitoUser, ISignUpResult } from "amazon-cognito-identity-js";
import { Auth } from "aws-amplify";
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface State {
  client?: ApolloClient<NormalizedCacheObject> | null;
  role?: string;
  token?: string;
  loading: boolean;
  user?: ExtendedUser;
  claims?: { [key: string]: string };
}

export interface ExtendedUser extends CognitoUser {
  imageUrl?: string;
  attributes: { [key: string]: any };
  pool: { [key: string]: any };
}

export interface SessionContextValue extends State {
  signUp: (
    username: string,
    password: string
  ) => Promise<ISignUpResult | undefined>;
  signIn: (
    username: string,
    password: string
  ) => Promise<{ [key: string]: string }>;
  signOut: (navigation?: any) => Promise<void>;
  forgotPassword: (email: string) => Promise<any>;
  resetPassword: (
    email: string,
    code: string,
    password: string
  ) => Promise<string>;
  updateAttributes: (
    user: CognitoUser,
    attributes: { [key: string]: string }
  ) => Promise<string>;
}

const initialState: State = {
  loading: true,
};

export const SessionContext = createContext(
  initialState as SessionContextValue
);

type SessionProps = {
  children: React.ReactNode;
};

const currentUser = async () => {
  try {
    const data = await Auth.currentAuthenticatedUser({ bypassCache: true });
    if (!data) {
      return {};
    }
    const { idToken } = data.signInUserSession;

    const claims =
      idToken.payload && idToken.payload["https://hasura.io/jwt/claims"]
        ? JSON.parse(idToken.payload["https://hasura.io/jwt/claims"])
        : {};

    const token = idToken.jwtToken;

    const userData = {
      user: data,
      claims,
      token,
      role: claims && claims["x-hasura-role"],
    };

    return userData;
  } catch (err) {
    console.log("User not authenticated", err);
    if (window.location.pathname !== "/sign-in") {
      window.location.href = "/sign-in";
    }
    return {};
  }
};

function SP({ children }: SessionProps) {
  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    async function start() {
      const userData = await currentUser();
      // @ts-ignore
      if (userData) {
        setState((s) => ({
          ...s,
          ...userData,
        }));
      } else {
        setState((s) => ({
          ...s,
          loading: false,
        }));
      }
    }

    start().catch(console.error);
  }, []);

  const signUp = async (username: string, password: string) => {
    try {
      const result = await Auth.signUp({
        username,
        password,
        attributes: {
          email: username,
          "custom:owner": "1",
        },
      });
      if (result) {
        await signIn(username, password);
        return result;
      }
    } catch (error) {
      console.log("error signing up:", error);
    }
  };

  const signIn = async (username: string, password: string) => {
    try {
      const result = await Auth.signIn(username, password);
      const userData = await currentUser();
      setState((s) => ({
        ...s,
        ...userData,
      }));
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async (navigation?: any) => {
    try {
      await Auth.signOut({ global: true });
      setState((s) => ({
        ...s,
        user: undefined,
        token: undefined,
        role: undefined,
        claims: undefined,
      }));
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      const result = await Auth.forgotPassword(email);
      return result;
    } catch (error) {
      console.log("error sending forgot password code: ", error);
    }
  };

  const resetPassword = async (
    email: string,
    code: string,
    password: string
  ) => {
    try {
      const result = await Auth.forgotPasswordSubmit(email, code, password);
      await signIn(email, password);
      return result;
    } catch (error) {
      console.log("error resetting password: ", error);
    }
  };

  const updateAttributes = async (
    user: CognitoUser,
    attributes: { [key: string]: string }
  ) => {
    try {
      const result = await Auth.updateUserAttributes(user, attributes);
      return result;
    } catch (error) {
      console.log("error updating attributes: ", error);
    }
  };

  const value = {
    ...state,
    signUp,
    signIn,
    signOut,
    forgotPassword,
    resetPassword,
    updateAttributes,
  };

  return (
    // @ts-ignore
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export const SessionProvider = SP;

export const useSession = () => useContext(SessionContext);

export default SessionProvider;
