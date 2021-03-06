import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/'
})

const apis = {
    readCategory: (id) => api.get(`categories/${id}`),
    loadCategories: () => api.get('categories'),
    deleteCategory: (id) => api.delete(`categories/${id}`),
    createCategory: (category) => api.post('categories', category),
    editCategory: (category) => api.put(`categories/${category.id}`, category),
    
    readProduct: (id) => api.get(`products/${id}`),
    createProduct: (product) => api.post('products', product),
    loadProducts: (catId) => api.get(`products?category=${catId}`),
    deleteProduct: (id) => api.delete(`products/${id}`),
    editProduct: (product) => api.put(`products/${product.id}`, product),
}

export default apis
