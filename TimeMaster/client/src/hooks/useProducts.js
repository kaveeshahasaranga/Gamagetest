import { useState, useEffect } from 'react';
import axios from 'axios';

const useProducts = (filters) => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // Build query string from filters object
                const params = new URLSearchParams();

                if (filters.brands && filters.brands.length > 0) {
                    params.append('brand', filters.brands.join(','));
                }

                if (filters.categories && filters.categories.length > 0) {
                    params.append('category', filters.categories.join(','));
                }

                if (filters.minPrice) {
                    params.append('minPrice', filters.minPrice);
                }

                if (filters.maxPrice) {
                    params.append('maxPrice', filters.maxPrice);
                }

                if (filters.sort) {
                    params.append('sort', filters.sort);
                }

                if (filters.keyword) {
                    params.append('keyword', filters.keyword);
                }

                if (filters.pageNumber) {
                    params.append('pageNumber', filters.pageNumber);
                }

                const queryString = params.toString();
                const url = `http://localhost:5000/api/products${queryString ? `?${queryString}` : ''}`;

                const { data } = await axios.get(url);
                setProducts(data.products || []);
                setPage(data.page || 1);
                setPages(data.pages || 1);
                setCount(data.count || 0);
                setError(null);
            } catch (err) {
                setError(err.response?.data?.message || err.message || 'Error fetching products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [filters]); // Re-fetch when filters change

    return { products, page, pages, count, loading, error };
};

export default useProducts;
