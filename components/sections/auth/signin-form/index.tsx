import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Form, FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as Yup from 'yup';
import { useAuthContext } from '../../../../lib/context/auth-context';
import { auth } from '../../../../lib/firebase/config';
import { IAlert } from '../../../../types';

const SigninForm = () => {
  const userCtx = useAuthContext();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [formAlert, setFormAlert] = useState<IAlert | undefined>(undefined);

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Provide a valid email')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: `${router.query.email ? router.query.email : ''}`,
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      if (userCtx?.user?.uid) return router.push('/');

      setFormAlert(undefined);

      // const firebaseClient = await getFirebaseClient();
      // if (!firebaseClient) return;

      // const { auth, db } = firebaseClient;

      try {
        const { email, password } = values;
        const userCred = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        if (!userCred.user.emailVerified) {
          router.push({
            pathname: '/auth/verify',
            query: { email },
          });
          return;
        }

        // const payload = {
        //   uid: userCred.user.uid,
        //   displayName: `${router.query.displayName}`,
        //   email: userCred.user.email,
        //   photoURL: '',
        //   phone: '',
        //   location: '',
        //   createdAt: userCred.user.metadata.creationTime,
        // };

        // const docRef = doc(db, 'users', userCred.user.uid);
        // const docSnap = await getDoc(docRef);

        // if (!docSnap.exists()) {
        //   createUser(docRef, payload);
        // }

        // if (router.query.email) {
        //   console.log('From verification link...');

        //   if (!docSnap.exists()) {
        //     createUser(docRef, payload);
        //   }
        // }

        setFormAlert({
          message: 'Signed in succesfully!',
          severity: 'success',
        });

        setTimeout(() => {
          setFormAlert(undefined);
        }, 4000);

        if (router.pathname.includes('/auth'))
          return router.push(
            `${router.query.returnTo ? router.query.returnTo : '/'}`
          );
      } catch (error: { code: string } | any) {
        const errCode = error.code || '';
        console.log(errCode);

        let message: string;

        switch (errCode) {
          case 'auth/wrong-password':
            message = 'Invalid password!';
            break;
          case 'auth/user-not-found':
            message = 'User does not exist';
            break;
          default:
            message = 'Something went wrong. Please try again!';
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

          <div className="mb-4">
            <input
              {...getFieldProps('email')}
              type="text"
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

          <div className="text-blue-600 text-center cursor-pointer">
            Forgot password?
          </div>

          <button
            type="submit"
            className="mt-8 bg-indigo-500 text-white px-6 py-2 text-center rounded-md hover:bg-indigo-400 transition ease-in duration-200 active:scale-90"
          >
            {isSubmitting ? 'Signing...' : 'Sign in'}
          </button>
        </div>
      </Form>
    </FormikProvider>
  );
};

export default SigninForm;
