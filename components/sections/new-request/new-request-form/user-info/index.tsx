import { LocationMarkerIcon } from '@heroicons/react/outline';
import { FieldInputProps, FormikErrors, FormikTouched } from 'formik';
import React from 'react';

interface IUserInfo {
  // eslint-disable-next-line no-unused-vars
  getFieldProps: (nameOrOptions: any) => FieldInputProps<any>;
  touched: FormikTouched<{
    phone: string;
    location: string;
  }>;
  errors: FormikErrors<{
    phone: string;
    location: string;
  }>;
  setFieldValue: (
    _field: string,
    _value: any,
    _shouldValidate?: boolean | undefined
  ) =>
    | Promise<void>
    | Promise<
        FormikErrors<{
          phone: string;
          location: string;
          quantity: string;
          itemName: string;
          unit: string;
          tempratureRange: string;
        }>
      >;
}

const UserInfo: React.FC<IUserInfo> = ({
  getFieldProps,
  errors,
  touched,
  setFieldValue,
}) => {
  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (n) => {
          console.log(n);
          setFieldValue(
            'location',
            `${n.coords.latitude}, ${n.coords.longitude}`
          );
        },
        (err) => console.log(err)
      );
    }
  };

  return (
    <>
      {/* phone */}
      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Your Phone Number
        </label>
        <input
          {...getFieldProps('phone')}
          type="tel"
          name="phone"
          id="phone"
          className="mt-1 p-2 w-full rounded-md border shadow-sm"
        />
        <p className="text-sm text-red-500 text-left mt-1 pl-1 outline-slate-400">
          {touched.phone && `${errors.phone ? errors.phone : ''}`}
        </p>
      </div>

      {/* location */}
      <div className="col-span-6">
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700"
        >
          Item's Location (<span className="text-red-500">note:*</span>Please
          ensure you are at the item's location before sharing your location)
        </label>

        <div className="flex flex-col md:flex-row md:items-center w-full space-x-4 mt-2">
          <div
            onClick={getLocation}
            className="col-span-6 flex items-center space-x-2 cursor-pointer text-blue-500"
          >
            <LocationMarkerIcon className="h-6" />
            <span className="hover:underline">Get Current Location</span>
          </div>

          <div className="mt-2">
            <input
              {...getFieldProps('location')}
              type="text"
              disabled={true}
              name="location"
              id="location"
              className="col-span-6 p-2 w-full rounded-md border shadow-sm"
            />
            <p className="col-span-6 text-sm text-red-500 text-left mt-1 pl-1 outline-slate-400">
              {touched.location && `${errors.location ? errors.location : ''}`}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
