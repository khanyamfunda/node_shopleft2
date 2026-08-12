import express from 'express'
import {
    getAllUsersQuery, getUserByIdQuery, createUserQuery, updateUserQuery, deleteUserQuery,
    getAllProductsQuery, getProductByIdQuery, createProductQuery, updateProductQuery, deleteProductQuery
} from './database.js'

const app = express()
const PORT = 6060

// Middleware to automatically parse incoming JSON payloads
app.use(express.json())

// Base Health Check Checkpoint
app.get('/', (req, res) => {
    res.json({ message: "SHOPLEFT Live Full-Stack API Operational!" })
})

// ==================== 👥 USERS ROUTES (CRUD) ====================

// a. Read All Users
app.get('/users', async (req, res) => {
    try {
        const users = await getAllUsersQuery()
        res.json(users)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// b. Read Single User
app.get('/users/:id_users', async (req, res) => {
    try {
        const user = await getUserByIdQuery(req.params.id_users)
        if (!user) return res.status(404).json({ message: "User not found" })
        res.json(user)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// c. Create / Insert User
app.post('/users', async (req, res) => {
    try {
        const { firstname, email, last_name, password } = req.body
        const newUser = await createUserQuery({ firstname, email, last_name, password })
        res.status(201).json({ message: "User added successfully!", data: newUser })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// d. Update User Entirely (PUT) or Partially (PATCH) via ID parameter
app.patch('/users/:id_users', async (req, res) => {
    try {
        const { firstname, email, last_name, password } = req.body
        const updatedUser = await updateUserQuery(req.params.id_users, { firstname, email, last_name, password })
        res.json({ message: "User modified successfully!", data: updatedUser })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// e. Delete User
app.delete('/users/:id_users', async (req, res) => {
    try {
        const status = await deleteUserQuery(req.params.id_users)
        res.json(status)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


// ==================== 📦 PRODUCTS ROUTES (CRUD) ====================

// a. Read All Products
app.get('/products', async (req, res) => {
    try {
        const products = await getAllProductsQuery()
        res.json(products)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// b. Read Single Product
app.get('/products/:product_code', async (req, res) => {
    try {
        const product = await getProductByIdQuery(req.params.product_code)
        if (!product) return res.status(404).json({ message: "Product item not found" })
        res.json(product)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// c. Create / Insert Product
app.post('/products', async (req, res) => {
    try {
        const { product_code, product_name, product_price, product_quantity } = req.body
        const newProduct = await createProductQuery({ product_code, product_name, product_price, product_quantity })
        res.status(201).json({ message: "Inventory stock item created!", data: newProduct })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// d. Update Product details dynamically
app.patch('/products/:product_code', async (req, res) => {
    try {
        const { product_name, product_price, product_quantity } = req.body
        const updatedProduct = await updateProductQuery(req.params.product_code, { product_name, product_price, product_quantity })
        res.json({ message: "Inventory transaction data updated!", data: updatedProduct })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// e. Delete Product 
app.delete('/products/:product_code', async (req, res) => {
    try {
        const status = await deleteProductQuery(req.params.product_code)
        res.json(status)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.listen(6060, () => {
    console.log('Server is running on http://localhost:6060')
})