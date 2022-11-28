import React from 'react';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';

interface FormType {
  username: string;
  password: string;
}

function Register() {
  const { register: registerUser, handleSubmit: submitregister } = useForm<FormType>({
    mode: 'all',
    reValidateMode: 'onChange'
  });

  const registerSubmit = async (data: FormType) => {
    const { username, password } = data;
    try {
      const result = await Auth.signUp({
        username,
        password,
        attributes: {
          email: username,
          'custom:owner': '1'
        }
      });
      const signInResult = await Auth.signIn({ username, password });
      console.log(result);
      console.log(signInResult);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full h-full bg-slate-800">
      <form onSubmit={submitregister(registerSubmit)}>
        <input
          className="border border-gray-300 p-1 px-4 rounded-lg"
          type="text"
          placeholder="Username"
          {...registerUser('username', { required: true })}
        />

        <input
          className="border border-gray-300 p-1 px-4 rounded-lg"
          type="text"
          placeholder="Password"
          {...registerUser('password', { required: true })}
        />
        <button className="border border-gray-300 p-1 px-4 rounded-lg" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
