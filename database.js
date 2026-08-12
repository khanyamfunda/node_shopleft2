import pool from './config.js'

// ==================== USER DATABASE QUERIES ====================
export async function getAllUsersQuery() {
    const [rows] = await pool.query("SELECT * FROM users")
    return rows
}

export async function getUserByIdQuery(id_users) {
    const [rows] = await pool.query("SELECT * FROM users WHERE id_users = ?", [id_users])
    return rows[0] // Return only the single user object found
}

export async function createUserQuery({ email, firstname, last_name, password }) {
    const [result] = await pool.query(
        "INSERT INTO users (email, firstname, last_name, password) VALUES (?, ?, ?, ?)",
        [email, firstname, last_name, password]
    )
    return { id_users: result.insertId, email, firstname, last_name, password }
}

export async function updateUserQuery(id_users, { firstname, email, last_name, password }) {
    await pool.query(
        "UPDATE users SET firstname = ?, email = ?, last_name = ?, password = ? WHERE id_users = ?",
        [firstname, email, last_name, password, id_users]
    )
    return { id_users, firstname, email, last_name, password }
}

export async function deleteUserQuery(id_users) {
    await pool.query("DELETE FROM users WHERE id_users = ?", [id_users])
    return { message: `User with ID ${id_users} deleted.` }
}


// ==================== PRODUCT DATABASE QUERIES ====================
export async function getAllProductsQuery() {
    const [rows] = await pool.query("SELECT * FROM products")
    return rows
}

export async function getProductByIdQuery(product_code) {
    const [rows] = await pool.query("SELECT * FROM products WHERE product_code = ?", [product_code])
    return rows[0] // Return only the single product object found
}

export async function createProductQuery({ product_code, product_name, product_price, product_quantity = 0 }) {
    const [result] = await pool.query(
        "INSERT INTO products (product_code, product_name, product_price, product_quantity) VALUES (?, ?, ?, ?)",
        [product_code, product_name, product_price, product_quantity]
    )
    return { product_code, product_name, product_price, product_quantity }
}

export async function updateProductQuery(product_code, { product_name, product_price, product_quantity }) {
    await pool.query(
        "UPDATE products SET product_name = ?, product_price = ?, product_quantity = ? WHERE product_code = ?",
        [product_name, product_price, product_quantity, product_code]
    )
    return { product_code, product_name, product_price, product_quantity }
}

export async function deleteProductQuery(product_code) {
    await pool.query("DELETE FROM products WHERE product_code = ?", [product_code])
    return { message: `Product with ID ${product_code} deleted.` }
}
