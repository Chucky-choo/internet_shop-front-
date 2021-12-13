import { useRouter } from "next/router";
import { useAppSelector } from "../../redux/hooks";

const Product = () => {
  const router = useRouter();
  const { id } = router.query;
  const product = useAppSelector((store) => store.product.data[0]);

  const { name, salePrice, price, color, photos, size, material } = product;

  return (
    <div>
      <img src={photos} alt={name} />
    </div>
  );
};

export default Product;
