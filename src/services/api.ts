import axios from 'axios';
import { Product, ProductsResponse } from '../types/product';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
});

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const { data } = await api.get<ProductsResponse>(`/products/category/${category}`);
  return data.products;
}

export async function getProductById(id: number): Promise<Product> {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
}

export default api;
