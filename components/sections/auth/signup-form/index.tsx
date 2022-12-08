import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { auth } from '../../../../lib/firebase/config';
import { IAlert } from '../../../../types';

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formAlert, setFormAlert] = useState<IAlert | undefined>(undefined);

  const loginSchema = Yup.object().shape({
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    email: Yup.string()
      .email('Provide a valid email')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setFormAlert(undefined);

      console.log('signing up.......');

      try {
        const { email, password, firstname, lastname } = values;

        // const firebaseClient = await getFirebaseClient();
        // if (!firebaseClient) return;
        // const { auth } = firebaseClient;

        const userCred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const actionCodeSettings = {
          url: `http://localhost:3000/auth/signin/?${new URLSearchParams({
            email,
            displayName: `${firstname} ${lastname}`,
          })}`,
        };

        await sendEmailVerification(userCred.user, actionCodeSettings);

        setFormAlert({
          message: `A verification email has been sent to ${email}`,
          severity: 'success',
        });
      } catch (error: { code: string } | any) {
        const errCode = error.code || '';
        console.log(errCode);

        let message: string;

        switch (errCode) {
          case 'auth/email-already-in-use':
            message = 'User already exist.';
            break;
          default:
            message = 'Something went wrong. Please try again later';
            break;
        }

        setFormAlert({
          message,
          severity: 'error',
        });

        setTimeout(() => {
          setFormAlert(undefined);
        }, 4000);
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        {formAlert?.message.includes('verification') ? (
          <div className="text-lg font-medium text-center">
            {formAlert.message}{' '}
            <span className="text-sm font-normal text-teal-500 italic">
              Check your spam folder if you don't see it in your inbox.
            </span>
          </div>
        ) : (
          <div className="flex flex-col">
            {formAlert && (
              <p
                className={`text-center my-4 ${
                  formAlert.severity === 'error'
                    ? 'text-red-500'
                    : 'text-green-500'
                }`}
              >
                {formAlert.message}
              </p>
            )}

            <div className="flex gap-2 w-full">
              <div className="w-full">
                <input
                  {...getFieldProps('firstname')}
                  type="text"
                  placeholder="First name"
                  className="bg-slate-100 rounded-lg p-4 w-full focus:bg-slate-200 outline-none"
                />
                <p className="text-sm text-red-500 text-left mt-1 pl-1 outline-slate-400">
                  {touched.firstname && errors.firstname}
                </p>
              </div>
              <div className="w-full">
                <input
                  {...getFieldProps('lastname')}
                  type="text"
                  placeholder="Last name"
                  className="bg-slate-100 rounded-lg p-4 w-full focus:bg-slate-200 outline-none"
                />
                <p className="text-sm text-red-500 text-left mt-1 pl-1 outline-slate-400">
                  {touched.lastname && errors.lastname}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <input
                type="email"
                {...getFieldProps('email')}
                placeholder="Email Address"
                className="bg-slate-100 rounded-lg p-4 w-full focus:bg-slate-200 outline-none"
              />
              <p className="text-sm text-red-500 text-left mt-1 pl-1 outline-slate-400">
                {touched.email && errors.email}
              </p>
            </div>

            <div className="mb-4">
              <div className="relative w-full bg-slate-100 focus:bg-slate-200 rounded-lg">
                <input
                  {...getFieldProps('password')}
                  type={`${showPassword ? 'text' : 'password'}`}
                  placeholder="Password"
                  className="bg-slate-100 w-full focus:bg-slate-200 p-4 outline-none"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                  {showPassword ? (
                    <EyeOffIcon
                      onClick={() => setShowPassword(false)}
                      className="h-6 cursor-pointer"
                    />
                  ) : (
                    <EyeIcon
                      onClick={() => setShowPassword(true)}
                      className="h-6 cursor-pointer"
                    />
                  )}
                </div>
              </div>
              <p className="text-sm text-red-500 text-left mt-1 pl-1">
                {touched.password && errors.password}
              </p>
            </div>

            <div className="w-2/3 mx-auto text-center font-normal text-sm">
              By signing up you agree with our{' '}
              <span className="underline text-blue-500 cursor-pointer">
                Terms & Condition
              </span>{' '}
              and{' '}
              <span className="underline text-blue-500 cursor-pointer">
                Privacy policy
              </span>
            </div>

            <button
              type="submit"
              className="mt-8 bg-indigo-500 text-white px-6 py-2 text-center rounded-md hover:bg-indigo-400 transition ease-in duration-200 active:scale-90"
            >
              {isSubmitting ? 'Signing up...' : 'Sign up'}
            </button>
          </div>
        )}
      </Form>
    </FormikProvider>
  );
};

export default SignupForm;
