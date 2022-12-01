import { PlusIcon } from '@heroicons/react/24/outline';
import { useToast } from 'providers/toast';
import React from 'react';
import { useForm } from 'react-hook-form';
import Spinner from '../../components/spinner';

interface FormType {
  first_name: string;
  last_name: string;
  email: string;
}

interface State {
  loading: boolean;
  error: string | undefined;
  edit: boolean;
}

function Profile() {
  const { setToast } = useToast();
  const [state, setState] = React.useState<State>({
    loading: true,
    error: undefined,
    edit: false
  });

  const data = null;
  const isLoading = false;
  const { register, handleSubmit } = useForm<FormType>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      email: (data && data.user?.email) || '',
      first_name: (data && data.user?.first_name) || '',
      last_name: (data && data.user?.last_name) || ''
    }
  });

  const action = async (info: FormType) => {
    if (!state.edit) {
      setState(s => ({ ...s, edit: true }));
    } else if (state.edit) {
      await saveChanges(info);
    }
  };

  const saveChanges = async (info: FormType) => {
    try {
      setState(s => ({ ...s, edit: false }));
      // if (res) {
      //   setToast(true, {
      //     type: 'success',
      //     title: 'Profile Updated',
      //     message: ''
      //   });
      // }
    } catch (err) {
      console.log(err);
      setToast(true, {
        type: 'error',
        title: 'Error Updating Profile',
        message: err.message
      });
    }
  };

  const actionText = state.edit ? 'Save Changes' : 'Edit Profile';
  return (
    <>
      {!isLoading && data ? (
        <div className="w-screen h-screen bg-slate-800 flex-col items-center">
          <div className="flex-col space-y-2 w-full items-center justify-center flex h-full">
            <div className="w-32 h-32 bg-orange-500 rounded-full mb-12 flex items-center justify-center text-4xl font-medium relative shadow-lg">
              <div className="bg-slate-600 p-2 rounded-full absolute  -right-1 -bottom-1 shadow hover:bg-slate-500 group transition-all cursor-pointer">
                {/* <CameraIcon className=" w-8 h-8 text-slate-400" /> */}
                <PlusIcon className=" w-6 h-6 text-slate-400 group-hover:text-slate-300" />
              </div>
              {data && data.user?.first_name[0]}
            </div>
            <div className="w-1/2 flex-col flex space-y-8">
              <input
                disabled={!state.edit}
                type="text"
                {...register('first_name')}
                className="appearance-none block w-full px-3 py-2 border border-slate-300 bg-slate-700 rounded-md shadow-sm placeholder-slate-400 text-slate-300  focus:outline-none focus:ring-slate-500 focus:border-slate-500"
              />
              <input
                disabled={!state.edit}
                type="text"
                {...register('last_name')}
                className="appearance-none block w-full px-3 py-2 border border-slate-300 bg-slate-700 rounded-md shadow-sm placeholder-slate-400 text-slate-300 focus:outline-none focus:ring-slate-500 focus:border-slate-500"
              />
              <input
                disabled={!state.edit}
                type="text"
                {...register('email')}
                className="appearance-none block w-full px-3 py-2 border border-slate-300 bg-slate-700 rounded-md shadow-sm placeholder-slate-400 text-slate-300 focus:outline-none focus:ring-slate-500 focus:border-slate-500"
              />
            </div>
            <div className="flex space-x-6 py-8">
              {state.edit && (
                <button
                  onClick={() => setState(s => ({ ...s, edit: false }))}
                  className="rounded-lg bg-slate-600 p-2 px-6 text-red-600"
                >
                  Cancel
                </button>
              )}
              <button onClick={handleSubmit(action)} className="rounded-lg bg-slate-700 p-2 px-6 text-slate-400">
                {actionText}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-screen h-screen bg-slate-800 flex-col items-center">
          <Spinner />
        </div>
      )}
    </>
  );
}

export default Profile;
