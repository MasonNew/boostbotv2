import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import moment from "moment";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

// create context
export const ProductContext = React.createContext();

export const ProductProvider = ({ children }) => {
  const [isLoaded, setLoaded] = useState(false);
  const [products, setProducts] = useState(null);
  const [allProducts, setAllProducts] = useState(null);
  const [newProduct, setNewProduct] = useState(null);
  const [userType, setUserType] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const value = useMemo(() => {
    const createNewProduct = ({ name }) => {
      return axios
        .post(
          `${apiUrl}/v1/products`,
          {
            name,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setNewProduct(response.data.product);
        });
    };

    const addProducts = (productsId) => {
      return axios
        .post(
          `${apiUrl}/v1/products/add-products`,
          {
            productsId,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setNewProduct(response.data.product);
        });
    };

    const getProducts = () => {
      return axios
        .get(
          `${apiUrl}/v1/products`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setProducts(response.data.products);
        });
    };

    const getAllProducts = () => {
      return axios
        .get(
          `${apiUrl}/v1/products/all-products`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setAllProducts(response.data.products);
        });
    };

    const deleteProduct = (productId) => {
      return axios
        .delete(`${apiUrl}/v1/products/${productId}`, {})
        .then((response) => {
          console.log("product Deleted");
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const removeProduct = (productId) => {
      return axios
        .delete(
          `${apiUrl}/v1/products/remove-product-from-user/${productId}`,
          {}
        )
        .then((response) => {
          console.log("product Deleted");
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return {
      products,
      allProducts,
      createNewProduct,
      addProducts,
      getProducts,
      getAllProducts,
      deleteProduct,
      removeProduct,
    };
  }, [allProducts, products]);

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
