import { FieldInputProps, FormikErrors, FormikTouched } from 'formik';
import React from 'react';

const temps = [
  '1°C to 3°C (meats and poultry)',
  ' 2°C to 4°C (dairy products)',
  '10°C to 15°C (dry foods)',
  '  –18°C (frozen foods)',
];

interface IItem {
  // eslint-disable-next-line no-unused-vars
  getFieldProps: (nameOrOptions: any) => FieldInputProps<any>;
  touched: FormikTouched<{
    itemName: string;
    quantity: string;
    unit: string;
    tempratureRange: string;
  }>;
  errors: FormikErrors<{
    itemName: string;
    quantity: string;
    unit: string;
    tempratureRange: string;
  }>;
}

const Item: React.FC<IItem> = ({ errors, getFieldProps, touched }) => {
  return (
    <div className="col-span-6 bg-slate-50 rounded-md shadow-sm py-4 px-6">
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="itemName"
            className="block text-sm font-medium text-gray-700"
          >
            Item Name
          </label>
          <input
            {...getFieldProps('itemName')}
            type="tel"
            name="itemName"
            id="itemName"
            className="mt-1 p-2 w-full rounded-md border shadow-sm"
          />
          <p className="text-sm text-red-500 text-left mt-1 pl-1 outline-slate-400">
            {touched.itemName && `${errors.itemName ? errors.itemName : ''}`}
          </p>
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700"
          >
            Quantity
          </label>

          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <div className="md:flex-grow">
              <input
                {...getFieldProps('quantity')}
                type="tel"
                name="quantity"
                id="quantity"
                className="mt-1 p-2 w-full rounded-md border shadow-sm"
              />
              <p className="text-sm text-red-500 text-left mt-1 pl-1 outline-slate-400">
                {touched.quantity &&
                  `${errors.quantity ? errors.quantity : ''}`}
              </p>
            </div>

            <div className="md:w-[20%]">
              <select
                {...getFieldProps('unit')}
                id="unit"
                name="unit"
                className="mt-1 p-2 w-full rounded-md border shadow-sm"
              >
                <option>kg</option>
                <option>litres</option>
              </select>
              <p className="text-sm text-red-500 text-left mt-1 pl-1 outline-slate-400">
                {touched.unit && `${errors.unit ? errors.unit : ''}`}
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="tempratureRange"
            className="block text-sm font-medium text-gray-700"
          >
            Temperature range
          </label>

          <select
            {...getFieldProps('tempratureRange')}
            id="tempratureRange"
            name="tempratureRange"
            className="mt-1 p-2 w-full rounded-md border shadow-sm"
          >
            {temps.map((temp, i) => (
              <option key={i}>{temp}</option>
            ))}
          </select>

          <p className="text-sm text-red-500 text-left mt-1 pl-1 outline-slate-400">
            {touched.tempratureRange &&
              `${errors.tempratureRange ? errors.tempratureRange : ''}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Item;
