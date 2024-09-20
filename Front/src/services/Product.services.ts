import axios, { AxiosResponse } from 'axios';
import {
  Product,
  ProductQueryResponse,
} from '../domain/productModel/product.interface';
import { ID } from '../domain/productModel/helper.interface';
import toastr from '../utils/toast/Toast-General';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getProducts = (query: string): Promise<ProductQueryResponse> => {
  return axios
    .get(`${BASE_URL}products?${query}`)
    .then((response: AxiosResponse<ProductQueryResponse>) => response.data);
};

const getProductById = (id: ID): Promise<Product | undefined> => {
  return axios
    .get(`${BASE_URL}product/${id}`)
    .then((response: AxiosResponse<Product>) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error fetching product:', error);
      return undefined;
    });
};

const createProduct = (formData: FormData): Promise<Product | undefined> => {
  return axios
    .post(`${BASE_URL}products/`, formData)
    .then((response: AxiosResponse<Product>) => {
      toastr.success('Product created successfully');
      return response.data;
    })
    .catch((error) => {
      toastr.error('Error creating product:', error);
      console.error('Error creating product:', error);
      return undefined;
    });
};

const updateProduct = (
  formData: FormData,
  productId: ID
): Promise<Product | undefined> => {
  return axios
    .put(`${BASE_URL}product/${productId}/`, formData)
    .then((response: AxiosResponse<Product>) => {
      toastr.success('Product updated successfully');
      return response.data;
    })
    .catch((error) => {
      toastr.error('Error creating product:', error);
      console.error('Error creating product:', error);
      return undefined;
    });
};

const deleteProduct = (productId: ID): Promise<void> => {
  return axios.delete(`${BASE_URL}product/${productId}/`).then(() => {
    return; // Explicitly return undefined
  });
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
