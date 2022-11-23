import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
import { useSession } from "../../providers/session";
import { useRouter } from "next/router";

type State = {
  username: string;
  password: string;
};

type FormType = {
  username: string;
  password: string;
};

const SignIn = () => {
  const router = useRouter();

  const { user } = useSession();

  if (user) {
    return router.replace("/");
  }

  const { register, handleSubmit } = useForm<FormType>({
    mode: "all",
    reValidateMode: "onChange",
  });

  const { register: registerUser, handleSubmit: submitregister } =
    useForm<FormType>({
      mode: "all",
      reValidateMode: "onChange",
    });

  const submit = async (data: FormType) => {
    const { username, password } = data;
    try {
      const signInResult = await Auth.signIn({ username, password });
      console.log(signInResult);
      router.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  const registerSubmit = async (data: FormType) => {
    const { username, password } = data;
    try {
      const result = await Auth.signUp({
        username,
        password,
        attributes: {
          email: username,
          "custom:owner": "1",
        },
      });
      const signInResult = await Auth.signIn({ username, password });
      console.log(result);
      console.log(signInResult);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-screen h-screen">
      <div>
        <form onSubmit={handleSubmit(submit)}>
          <input
            className="border border-gray-300 p-1 px-4 rounded-lg"
            type="text"
            placeholder="Username"
            {...register("username", { required: true })}
          />

          <input
            className="border border-gray-300 p-1 px-4 rounded-lg"
            type="text"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          <button
            className="border border-gray-300 p-1 px-4 rounded-lg"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>

      <div>
        <form onSubmit={submitregister(registerSubmit)}>
          <input
            className="border border-gray-300 p-1 px-4 rounded-lg"
            type="text"
            placeholder="Username"
            {...registerUser("username", { required: true })}
          />

          <input
            className="border border-gray-300 p-1 px-4 rounded-lg"
            type="text"
            placeholder="Password"
            {...registerUser("password", { required: true })}
          />
          <button
            className="border border-gray-300 p-1 px-4 rounded-lg"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
