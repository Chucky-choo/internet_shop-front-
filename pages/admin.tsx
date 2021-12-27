import { NextPage } from "next";
import CreateNewDish from "../components/ProductList/CreateNewDish/CreateNewDish";
import { MainLayout } from "../layouts/MainLayout";

interface IAdminProps {}

const Admin: NextPage<IAdminProps> = () => {
  return (
    <MainLayout title={"admin"}>
      <CreateNewDish />
    </MainLayout>
  );
};

export default Admin;
