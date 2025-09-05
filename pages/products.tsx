// pages/products.tsx
import { useRouter } from "next/router";
import { useFetch } from "usehooks-ts";
import Image from "next/image";
import Pagination from "../components/Pagination";

// Line 7-18 Define the response types. We derive this from DummyJSON api docs
type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};
type Response = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};
const ProductsPage = () => {
  // 21-25 parse the page and perPage  from router.query
  const router = useRouter();
  const query = router.query;
  const page = (query.page as string) ?? "1";
  const perPage = (query.perPage as string) ?? "12";

  // Lines 27-29: Define limit and skip which is used by DummyJSON API for pagination
  const limit = perPage;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,price,thumbnail`;

  // Line 32:  use the useFetch hook to get the products
  const { data } = useFetch<Response>(url);

  return (
    // we use tailwindCSS classes to create a decent product grid
    <div className="mx-auto container">
      <Pagination
        page={parseInt(page)}
        perPage={parseInt(perPage)}
        itemCount={data?.total ?? 0}
      />
      {!data && <div>Loading...</div>}
      <div className="grid grid-cols-12 gap-4 p-4">
        {data?.products?.map((product) => {
          // render each product
          return (
            <a
              key={product.id}
              className="lg:col-span-3 md:col-span-4 col-span-6 shadow-md rounded-md block overflow-hidden"
              href={`/products/${product.id}`}
            >
              <div className="relative aspect-video ">
                <Image
                  src={product.thumbnail}
                  fill
                  className="object-cover"
                  alt={product.title}
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold">{product.title}</h2>
                <p>${product.price.toFixed(2)}</p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};
export default ProductsPage;
