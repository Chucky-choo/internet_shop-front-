import { NextPage } from "next";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useState } from "react";
import { updateUserData } from "../../../redux/slices/auth-reducer";
import Typography from "@mui/material/Typography";
import s from "./ordering.module.scss";
import { Delivery } from "./delivery/delivery";
import * as React from "react";
import { Form, Formik } from "formik";
import CustomizedInputBase from "../../CustomizedInputBase/CustomizedInputBase";
import { NewUserData } from "./userData/NewUserData";
import { ValidateOrder } from "./userData/ValidateOrder";
import LoadingButton from "@mui/lab/LoadingButton";
import { Api } from "../../../api/Api";
import { useRouter } from "next/dist/client/router";
import { cleanTheBasket } from "../../../redux/slices/cart-reducer";

interface OrderingComponentProps {
  productIdArr: number[];
}

const OrderingComponent: NextPage<OrderingComponentProps> = ({
  productIdArr,
}) => {
  console.log("Ordering");
  const dispatch = useAppDispatch();
  const router = useRouter();

  //===========UserData=======
  const { fullName, phoneNumber, id } = useAppSelector(
    (store) => store.user.userData
  );

  const checkUserData = (newFullName, newPhoneNumber) => {
    if (fullName !== newFullName || phoneNumber !== newPhoneNumber) {
      dispatch(
        updateUserData(id, {
          fullName: newFullName,
          phoneNumber: newPhoneNumber,
        })
      );
    }
  };

  //===========Location=======
  const [cityName, setCity] = useState("");
  const [department, setDepartment] = useState("");

  //===========Loading=======
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Typography variant="h5" sx={{ marginTop: 5 }}>
        ОФОРМЛЕННЯ ЗАМОВЛЕННЯ
      </Typography>
      <div className={s.wrapper}>
        <Formik
          initialValues={{
            fullName: fullName,
            phoneNumber: phoneNumber,
            comment: "",
          }}
          validationSchema={ValidateOrder}
          onSubmit={async (values) => {
            try {
              setLoading(true);
              await checkUserData(values.fullName, values.phoneNumber);
              await Api().orders.create({
                comment: values.comment,
                productId: productIdArr,
                cityName,
                department,
                userId: id,
              });
              await dispatch(cleanTheBasket(id));
              router.push("/orders");
            } catch (e) {
              alert(e);
            }
          }}
        >
          <Form style={{ width: "80%" }}>
            <div className={s.wrapper}>
              <NewUserData />
              <Delivery
                cityName={cityName}
                setCity={setCity}
                setDepartment={setDepartment}
              />
            </div>

            <CustomizedInputBase
              type="string"
              name="comment"
              placeholder="Комментар до замовлення"
            />
            <div className={s.wrapper} style={{ marginTop: 40 }}>
              <LoadingButton
                loading={loading}
                disabled={!department}
                type="submit"
                variant="contained"
              >
                оформити замовлення
              </LoadingButton>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export const Ordering = React.memo(OrderingComponent);
