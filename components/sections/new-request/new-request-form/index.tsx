import { PlusIcon } from '@heroicons/react/outline';
import { serverTimestamp } from 'firebase/firestore';
import { Form, FormikProvider, useFormik } from 'formik';
import { geohashForLocation } from 'geofire-common';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Suspense, useState } from 'react';
import * as Yup from 'yup';
import { useAuthContext } from '../../../../lib/context/auth-context';
import { getFirebaseClient } from '../../../../lib/firebase/config';
import generateId from '../../../../lib/helpers/generate-id';
import getQueryPromises from '../../../../lib/helpers/get-query-promises';
import { IAlert } from '../../../../types';
import UserInfo from './user-info';

const Item = dynamic(() => import('./item'), { suspense: true });
const AlertComponent = dynamic(() => import('../../../ui/alert'));

export interface IItemDetails {
  id: string;
  itemName: string;
  quantity: string;
  unit: string;
  temprange: string;
}

interface INewRequestForm {}

const NewRequestForm: React.FC<INewRequestForm> = () => {
  const router = useRouter();
  const userCtx = useAuthContext();
  const [showItem, setShowItem] = useState(false);
  const [formAlert, setFormAlert] = useState<IAlert | undefined>(undefined);

  const userRequestSchema = Yup.object().shape({
    phone: Yup.string().required('Phone number is required'),
    location: Yup.string().required('Location is required'),
    itemName: Yup.string().required('Item name is required'),
    quantity: Yup.string().required('Quantity is required'),
    unit: Yup.string().required('Unit is required'),
    tempratureRange: Yup.string().required('Temprature range is required'),
  });

  const formik = useFormik({
    initialValues: {
      phone: userCtx?.user.phone || '',
      location: '',
      quantity: '',
      itemName: '',
      unit: 'litres',
      tempratureRange: '10°C to 15°C (dry foods)',
    },
    validationSchema: userRequestSchema,
    onSubmit: async (values) => {
      setFormAlert(undefined);

      // check if there's a user
      if (!userCtx?.user) return;

      const { itemName, location, phone, quantity, tempratureRange, unit } =
        values;
      const [lat, lng] = location.split(',');
      const geohash = geohashForLocation([+lat, +lng]);

      const { displayName, email, photoURL } = userCtx.user;

      try {
        // ==== dynamically importing the firbase needed
        const firebaseClient = await getFirebaseClient();
        const { db, collection, getDocs, doc, setDoc, getDoc } = firebaseClient;

        const facilitiesRef = collection(db, 'facilities');
        const promises = getQueryPromises(lat, lng, facilitiesRef);

        let snapshots = [];

        for (const q of promises) {
          console.log('<======= iterating..');
          const snap = await getDocs(q);
          if (snap.size > 0) snapshots.push(snap);
          console.log('done=======>');
        }

        const createdAt = serverTimestamp();

        snapshots.forEach((snap) => {
          snap.forEach(async (facility) => {
            const requestId = `${facility.id}${
              userCtx.user.uid
            }${generateId()}`;
            console.log(`Sending request to ${facility.id} ===>`);
            const payloadForFacility = {
              requestId,
              userId: userCtx.user.uid,
              createdAt,
              itemInfo: {
                itemName,
                quantity,
                unit,
                tempratureRange,
              },
              userInfo: {
                displayName,
                email,
                phone,
                photoURL,
                location: {
                  lat,
                  lng,
                  geohash,
                },
              },
            };
            const docRefFacility = doc(
              db,
              'facilities',
              facility.id,
              'requests',
              requestId
            );
            console.log('payloadForFacility ====>', payloadForFacility);
            const docSnapFacility = await getDoc(docRefFacility);
            console.log(`facility ${docSnapFacility.exists()}`);

            if (!docSnapFacility.exists())
              await setDoc(docRefFacility, payloadForFacility);

            // adding request to user's document
            console.log(`adding request to user ${userCtx.user.uid}`);
            const payloadForUser = {
              requestId,
              facilityId: facility.id,
              createdAt,
              itemInfo: {
                itemName,
                quantity,
                unit,
                tempratureRange,
              },
              facilityInfo: {
                featuredPhoto: facility.data().featuredPhoto,
                location: {
                  geohash: facility.data().geohash,
                  lat: facility.data().lat,
                  lng: facility.data().lng,
                },
                operatorInfo: {
                  displayName: facility.data().operatorInfo.displayName,
                  email: facility.data().operatorInfo.email,
                  phone: facility.data().operatorInfo.phone,
                },
              },
            };
            const docRefUser = doc(
              db,
              'users',
              userCtx.user.uid,
              'requests',
              requestId
            );
            console.log('payloadForUser ====>', payloadForUser);
            const docSnapUser = await getDoc(docRefUser);
            console.log(`users ${docSnapUser.exists()}`);
            if (!docSnapUser.exists()) await setDoc(docRefUser, payloadForUser);

            console.log('Done...adadadadadadd');
          });
        });

        setFormAlert({
          message: 'Application sent successfully',
          severity: 'success',
        });

        setTimeout(() => {
          setFormAlert(undefined);
          router.push('/requests');
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const {
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue,
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <div className="bg-white md:shadow-md rounded-md">
          <div className="grid grid-cols-6 gap-6 px-4 md:px-8 py-5">
            <div className="col-span-6 headingxs">Request Space</div>

            <UserInfo
              errors={errors}
              getFieldProps={getFieldProps}
              touched={touched}
              setFieldValue={setFieldValue}
            />

            {/* line------- */}
            <div className="col-span-6 py-4">
              <div className="border-t border-gray-200"></div>
            </div>
            {/* end of line----- */}

            {showItem ? (
              <Suspense fallback={`Loading...`}>
                <Item
                  getFieldProps={getFieldProps}
                  touched={touched}
                  errors={errors}
                />
              </Suspense>
            ) : (
              <div
                className="col-span-6 mt-1 flex items-center justify-between rounded-md border-2 border-dashed border-gray-300 px-6 py-2 cursor-pointer"
                onClick={() => setShowItem(true)}
              >
                <div className="font-bold">Add Item</div>
                <PlusIcon className="h-6 text-black" />
              </div>
            )}
          </div>

          <div className=" bg-gray-50 px-4 py-3 sm:px-8 mt-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="grid place-items-center">
                {formAlert && <AlertComponent alertObject={formAlert} />}
              </div>
              <button
                disabled={!showItem}
                type="submit"
                className={` rounded-sm border border-transparent bg-teal-600 py-2 px-4 text-md font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                  showItem
                    ? 'cursor-pointer opacity-100'
                    : 'cursor-not-allowed opacity-80'
                }`}
              >
                {isSubmitting ? 'Requesting...' : 'Request Space'}
              </button>
            </div>
          </div>
        </div>
      </Form>
    </FormikProvider>
  );
};

export default NewRequestForm;
