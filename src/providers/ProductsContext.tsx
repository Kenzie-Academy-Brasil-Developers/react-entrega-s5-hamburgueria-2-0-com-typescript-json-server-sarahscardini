import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { api } from "../services/api";
import { Product } from "../types/Product";
import toast from "react-hot-toast";

interface ProductsProviderProps {
  children: ReactNode;
}

interface ProductsContextData {
  productList: Product[];
  cartProducts: CartProduct[];
  isAdded: boolean;
  notFound: boolean;
  itemSearched: string;
  searchItem: (itemTitle: string, accessToken: string) => Promise<void>;
  loadProducts: () => Promise<void>;
  loadCart: (userId: number, accessToken: string) => Promise<void>;
  addToCart: (
    product: Product,
    id: number,
    accessToken: string
  ) => Promise<void>;
  addOneToCart: (
    product: Product,
    userId: number,
    accessToken: string,
    isFromCart: boolean
  ) => Promise<void>;
  decrementOneFromCart: (
    product: Product,
    userId: number,
    accessToken: string
  ) => Promise<void>;
  deleteOneProduct: (
    product: Product,
    userId: number,
    accessToken: string
  ) => Promise<void>;
  deleteAll: (accessToken: string, isBuy: boolean) => Promise<void>;
  buy: (accessToken: string) => void;
}

interface CartProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
  quantity: number;
}

const ProductsContext = createContext<ProductsContextData>(
  {} as ProductsContextData
);

const useProductsProvider = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("The hook useProductsProvider needs ProductsProvider");
  } else {
    return context;
  }
};

const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [userCartId, setUserCartId] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [itemSearched, setItemSearched] = useState<string>("");

  const loadProducts = useCallback(async () => {
    await api
      .get<Product[]>("/products")
      .then((res) => setProductList(res.data))
      .catch((err) => console.log(err));
  }, []);

  const loadCart = useCallback(async (userId: number, accessToken: string) => {
    await api
      .get(`/cart?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setCartProducts(res.data[0].products);
        setUserCartId(res.data[0].id);
      })
      .catch((err) => {
        throw new Error("The cart is empty");
      });
  }, []);

  const addToCart = useCallback(
    async (product: Product, id: number, accessToken: string) => {
      if (cartProducts.length === 0) {

        await api
          .post(
            "/cart",
            { userId: id, products: [{ ...product, quantity: 1 }] },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((res) => {
            setCartProducts(res.data.products);
            toast.success("Produto adicionado ao carrinho");
          })
          .catch((err) => console.log(err));
      }
    },
    [cartProducts]
  );

  const addOneToCart = useCallback(
    async (
      product: Product,
      userId: number,
      accessToken: string,
      isFromCart = true
    ) => {
      let newArray = [...cartProducts];
      const currIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );

      if (currIndex === -1) {
        newArray.push(product);
        let lastIndex = newArray.length - 1;
        newArray[lastIndex].quantity = 1;
      } else {
        newArray[currIndex].quantity = product.quantity + 1;
      }

      await api
        .patch(
          `/cart/${userCartId}`,
          { userId: userId, products: newArray },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => {
          setCartProducts(res.data.products);
          if (!isFromCart) {
            toast.success("Produto adicionado ao carrinho");
          }
        })
        .catch((err) => console.log(err));
    },
    [cartProducts, userCartId]
  );

  const decrementOneFromCart = useCallback(
    async (product: Product, userId: number, accessToken: string) => {
      const newArray = [...cartProducts];

      const currIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );

      if (newArray[currIndex].quantity > 1) {
        newArray[currIndex].quantity = product.quantity - 1;

        await api
          .patch(
            `/cart/${userCartId}`,
            { userId: userId, products: newArray },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((res) => {
            setCartProducts(res.data.products);
            setIsAdded(true);
          })
          .catch((err) => console.log(err));
      }

      return setIsAdded(false);
    },
    [cartProducts, userCartId]
  );

  const deleteOneProduct = useCallback(
    async (product: Product, userId: number, accessToken: string) => {
      let newArray = [...cartProducts].filter((item) => item.id !== product.id);

      await api
        .patch(
          `/cart/${userCartId}`,
          { userId: userId, products: newArray },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => {
          toast.success("Produto removido");
          setCartProducts(res.data.products);
        })
        .catch((err) => console.log(err));
    },
    [cartProducts, userCartId]
  );

  const deleteAll = useCallback(
    async (accessToken: string, isBuy: boolean) => {
      await api
        .delete(`/cart/${userCartId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((_res) => {
          isBuy
            ? toast.success("Pedido enviado!")
            : toast.success("Todos produtos foram removidos");
          setCartProducts([]);
        })
        .catch((err) => console.log(err));
    },
    [userCartId]
  );

  const buy = (accessToken: string) => {
    let today = new Date();
    let time = new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "full",
      timeStyle: "medium",
    }).format(today);

    deleteAll(accessToken, true);
    toast(`Aguardando aceitação em Kenzie Burguer em  ${time}`, {
      duration: 8000,
      icon: "🕑",
    });
  };

  const searchItem = useCallback(
    async (itemTitle: string, accessToken: string) => {
      const responseName = await api.get(`/products?name_like=${itemTitle}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseCategory = await api.get(
        `/products?category_like=${itemTitle}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setItemSearched(itemTitle);

      if (!!responseName.data.length) {
        setProductList(responseName.data);
        return setNotFound(false);
      }

      if (!!responseCategory.data.length) {
        setProductList(responseCategory.data);
        return setNotFound(false);
      }

      return setNotFound(true);
    },
    []
  );

  return (
    <ProductsContext.Provider
      value={{
        cartProducts,
        isAdded,
        itemSearched,
        notFound,
        productList,
        addOneToCart,
        addToCart,
        buy,
        decrementOneFromCart,
        deleteAll,
        deleteOneProduct,
        loadCart,
        loadProducts,
        searchItem,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsProvider, useProductsProvider };
