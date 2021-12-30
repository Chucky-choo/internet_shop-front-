import { NextPage } from "next";
import style from "../../../styles/Product.module.scss";
import { useState } from "react";
import { photo } from "../../../redux/slices/ProductType";

interface IPicturesProps {
  photosArr: photo[];
}

export const Pictures: NextPage<IPicturesProps> = ({ photosArr }) => {
  const [selectPhoto, setPhoto] = useState(0);
  return (
    <>
      <div className={style.wrapper_picture}>
        {photosArr.map((photo, index) => {
          return (
            <img
              key={photo.id}
              className={style.picture}
              src={photo.url}
              alt="photo"
              onClick={() => {
                setPhoto(index);
              }}
            />
          );
        })}
      </div>
      <img className={style.img} src={photosArr[selectPhoto].url} alt="" />
    </>
  );
};
