import { PlusIcon, TrashIcon } from '@heroicons/react/outline';
import React, { Dispatch, SetStateAction } from 'react';
import { IItemDetails } from '.';
import generateId from '../../../../lib/helpers/generate-id';

interface IItems {
  itemsList: [] | IItemDetails[];
  setItemsList: Dispatch<SetStateAction<[] | IItemDetails[]>>;
}

const temps = [
  '1°C to 3°C (meats and poultry)',
  ' 2°C to 4°C (dairy products)',
  '10°C to 15°C (dry foods)',
  '  –18°C (frozen foods)',
];

const Items: React.FC<IItems> = ({ itemsList, setItemsList }) => {
  return (
    <>
      {/* items */}
      <div className="col-span-6">
        <label className="block text-sm font-bold text-gray-700 mb-2">
          Items
        </label>

        {itemsList.length > 0 && (
          <div className="flex flex-col space-y-6 mb-4">
            {itemsList.map((listItem, i) => (
              <div
                key={i}
                className="bg-slate-50 rounded-md shadow-sm py-4 px-6"
              >
                {/* details */}
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="displayName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Item Name
                    </label>
                    <input
                      type="text"
                      name="displayName"
                      id="displayName"
                      className="mt-1 p-2 w-full rounded-md border shadow-sm"
                      value={`${
                        itemsList.filter((item) => item.id === listItem.id)[0]
                          .itemName
                      }`}
                      onChange={(e) =>
                        setItemsList((prev) =>
                          prev.map((item) =>
                            item.id === listItem.id
                              ? { ...item, itemName: e.target.value }
                              : item
                          )
                        )
                      }
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="displayName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Quantity
                    </label>

                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        name="displayName"
                        id="displayName"
                        className=" mt-1 p-2 w-full rounded-md border shadow-sm"
                        value={`${
                          itemsList.filter((item) => item.id === listItem.id)[0]
                            .quantity
                        }`}
                        onChange={(e) =>
                          setItemsList((prev) =>
                            prev.map((item) =>
                              item.id === listItem.id
                                ? { ...item, quantity: e.target.value }
                                : item
                            )
                          )
                        }
                      />

                      <select
                        id="numberOfFacilities"
                        name="numberOfFacilities"
                        className="mt-1 p-2 w-full rounded-md border shadow-sm"
                        onChange={(e) =>
                          setItemsList((prev) =>
                            prev.map((item) =>
                              item.id === listItem.id
                                ? { ...item, unit: e.target.value }
                                : item
                            )
                          )
                        }
                      >
                        <option>kg</option>
                        <option>litres</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="tempRange"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Temperature range
                    </label>

                    <select
                      id="tempRange"
                      name="tempRange"
                      className="mt-1 p-2 w-full rounded-md border shadow-sm"
                      onChange={(e) =>
                        setItemsList((prev) =>
                          prev.map((item) =>
                            item.id === listItem.id
                              ? { ...item, temprange: e.target.value }
                              : item
                          )
                        )
                      }
                    >
                      {temps.map((temp, i) => (
                        <option key={i}>{temp}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* bottom */}
                <div className="flex justify-end mt-8">
                  <div
                    className="flex items-center space-x-1 cursor-pointer"
                    onClick={() => {
                      console.log(
                        `deleting item with id: ====> ${listItem.id}`
                      );
                      setItemsList((prev) =>
                        prev.filter((item) => item.id !== listItem.id)
                      );
                    }}
                  >
                    <span>Delete</span>
                    <TrashIcon className="h-5 cursor-pointer text-gray-700" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          className="mt-1 flex items-center justify-between rounded-md border-2 border-dashed border-gray-300 px-6 py-2 cursor-pointer"
          onClick={() => {
            console.log(itemsList);
            setItemsList((prev) => [
              ...prev,
              {
                unit: 'kg',
                itemName: '',
                quantity: '',
                id: generateId(),
                temprange: '1°C to 3°C (meats and poultry)',
              },
            ]);
          }}
        >
          <div className="font-bold">Add Item</div>
          <PlusIcon className="h-6 text-black" />
        </div>
      </div>
    </>
  );
};

export default Items;

// const ItemDetailsInput = () => {
//   const [itemName, setItemName] = useState('');
//   const [itemQuantity, setItemQuantity] = useState('');

//   return (
//     <div className="grid grid-cols-6 gap-6">
//       <div className="col-span-6 sm:col-span-3">
//         <label
//           htmlFor="displayName"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Item Name
//         </label>
//         <input
//           type="text"
//           name="displayName"
//           id="displayName"
//           className="mt-1 p-2 w-full rounded-md border shadow-sm"
//           value={itemName}
//           onChange={(e) => setItemName(e.target.value)}
//         />
//       </div>

//       <div className="col-span-6 sm:col-span-3">
//         <label
//           htmlFor="displayName"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Quantity
//         </label>
//         <input
//           type="text"
//           name="displayName"
//           id="displayName"
//           className="mt-1 p-2 w-full rounded-md border shadow-sm"
//           value={itemQuantity}
//           onChange={(e) => setItemQuantity(`${e.target.value}KG`)}
//         />
//       </div>
//     </div>
//   );
// };

{
  /* <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="displayName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Item Name
                    </label>
                    <input
                        {...getFieldProps('displayName')}
                      type="text"
                      name="displayName"
                      id="displayName"
                      className="mt-1 p-2 w-full rounded-md border shadow-sm"
                    />
                    <p className="text-sm text-red-500 text-left mt-1 pl-1 outline-slate-400">
            {touched.displayName &&
              `${errors.displayName ? errors.displayName : ''}`}
          </p>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="displayName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Quantity
                    </label>
                    <input
                        {...getFieldProps('displayName')}
                      type="text"
                      name="displayName"
                      id="displayName"
                      className="mt-1 p-2 w-full rounded-md border shadow-sm"
                    />
                    <p className="text-sm text-red-500 text-left mt-1 pl-1 outline-slate-400">
            {touched.displayName &&
              `${errors.displayName ? errors.displayName : ''}`}
          </p>
                  </div>
                </div> */
}
