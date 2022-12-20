import { useEffect, useState } from 'react';
import { Category, CategoriesResponse } from '../interfaces/app.interface';
import coffeeApi from '../api/coffeeApi';

export const useCategories = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const { data } = await coffeeApi.get<CategoriesResponse>('/categorias');
    setCategories(data.categorias);
    setIsLoading(false);
  };

  return { isLoading, categories };
};
