import React, { createContext, useEffect, useState } from 'react';
import coffeeApi from '../api/coffeeApi';
import { Product, ProductsResponse } from '../interfaces/app.interface';

type ProductsContextProps = {
  products: Product[];
  loadProducts: () => Promise<void>;
  addProduct: (categoryId: string, productName: string) => Promise<void>;
  updateProduct: (
    categoryId: string,
    productName: string,
    productId: string,
  ) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  loadProductById: (id: string) => Promise<Product>;
  uploadImage: (data: any, id: string) => Promise<void>; // TODO: cambiar ANY
};

export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider = ({ children }: any) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadProducts = async () => {
    const { data } = await coffeeApi.get<ProductsResponse>(
      '/productos?limite=50',
    );
    // setProducts([...products, ...data.productos]);
    setProducts(data.productos);
  };

  const addProduct = async (categoryId: string, productName: string) => {};

  const updateProduct = async (
    categoryId: string,
    productName: string,
    productId: string,
  ) => {};

  const deleteProduct = async (id: string) => {};

  const loadProductById = async (id: string) => {
    throw new Error('Not implemented');
  };

  // TODO: cambiar ANY
  const uploadImage = async (data: any, id: string) => {};

  return (
    <ProductsContext.Provider
      value={{
        products,
        loadProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        loadProductById,
        uploadImage,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};
