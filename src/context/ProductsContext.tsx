import React, { createContext, useEffect, useState } from 'react';
import coffeeApi from '../api/coffeeApi';
import { Product, ProductsResponse } from '../interfaces/app.interface';

type ProductsContextProps = {
  products: Product[];
  loadProducts: () => Promise<void>;
  addProduct: (categoryId: string, productName: string) => Promise<Product>;
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

  const addProduct = async (
    categoryId: string,
    productName: string,
  ): Promise<Product> => {
    const { data } = await coffeeApi.post<Product>('/productos', {
      nombre: productName,
      categoria: categoryId,
    });
    setProducts([...products, data]);
    return data;
  };

  const updateProduct = async (
    categoryId: string,
    productName: string,
    productId: string,
  ) => {
    const { data } = await coffeeApi.put<Product>(`/productos/${productId}`, {
      nombre: productName,
      categoria: categoryId,
    });
    setProducts(products.map(prod => (prod._id === productId ? data : prod)));
  };

  const deleteProduct = async (id: string) => {
    console.log({ id });
  };

  const loadProductById = async (id: string): Promise<Product> => {
    const { data } = await coffeeApi.get<Product>(`/productos/${id}`);
    return data;
  };

  // TODO: cambiar ANY
  const uploadImage = async (data: any, id: string) => {
    console.log({ data, id });
  };

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
