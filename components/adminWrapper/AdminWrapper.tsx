import { useAppSelector } from "../../redux/hooks";
import { Role } from "../../redux/slices/ProductType";
import React from "react";
import { DeleteProduct } from "../deleteProduct/DeleteProduct";
import CreateNewDish from "../CreateNewDish/CreateNewDish";
import { UpdateProduct } from "../updateProduct/updateProduct";

export const AdminWrapper = ({ id }) => {
  const value = useAppSelector((state) => state.user.userData?.roles[0].value);

  const stopPropagation = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  if (!id || value !== Role.admin) {
    return null;
  } else {
    return (
      <div
        onClick={stopPropagation}
        style={{
          display: "flex",
          flexDirection: "column",
          height: 250,
          justifyContent: "space-around",
          border: "3px solid blue",
          padding: 14,
        }}
      >
        <DeleteProduct id={+id} />
        <CreateNewDish />
        <UpdateProduct idProduct={+id} />
      </div>
    );
  }
};
