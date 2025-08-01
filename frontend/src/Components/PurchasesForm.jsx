import React from "react";
import Button from "./Button";

const PurchasesForm = ({ paintings, purchaseOrders, deletePurchase }) => {
  const headers = [
    "Painting(s)",
    "Name",
    "Address",
    "Delivery Type",
    "Date Purchased",
    "Actions",
  ];
  const delivery_type = { PU: "Pickup", SD: "Standard" };

  const onDelete = (purhcaseID) => {
    console.log("deleting Painting");
    deletePurchase(purhcaseID);
  };

  return (
    <div className="w-full">
      {/* Paintings Table */}
      <div className="overflow-hidden border border-gray-300 rounded-lg">
        <table className="w-full border-collapse">
          {/* Header Row */}
          <thead>
            <tr className="bg-gray-200 divide-x divide-black">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="p-3 text-center font-bold bg-gray-200 border-b border-gray-300"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Data Rows */}
          <tbody>
            {purchaseOrders.map((po, index) => {
              const { id, name, address, shipping_method, date_ordered } = po;
              const bg = index % 2 === 0 ? "bg-gray-50" : "bg-white";
              return (
                <tr
                  key={index}
                  className={`${bg} border-b divide-x divide-gray-200 border-gray-200`}
                >
                  <td className="p-3 text-center">
                    {paintings
                      .filter((p) => po.paintings.includes(p.id))
                      .map((p) => p.name)
                      .join(", ")}
                  </td>
                  <td className="p-3">{name}</td>
                  <td className="p-3 text-center">{address}</td>
                  <td className="p-3 text-center">
                    {delivery_type[shipping_method]}
                  </td>
                  <td className="p-3 text-center">{date_ordered}</td>
                  <td className="p-3 text-center">
                    <Button
                      type="button"
                      onClick={() => {
                        onDelete(id);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      Delivered!
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchasesForm;
