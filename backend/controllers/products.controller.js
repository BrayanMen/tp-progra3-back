import {connection} from "../database/db.js"

export const getProducts = async (req, res) =>{
    try {
        // res.json({message: "trayendo productos"})
        let sql = `SELECT * FROM products WHERE available = "active"`
        const [rows] = await connection.query(sql)
        res.status(200).json(rows)
    
    } catch (err) {
        console.error("Error: ", err);        
    }
}

export const getProductById = async(req, res) =>{
    const {id} = req.params
    const sentence = `SELECT * FROM products where id = ?`
    const [rows] = await connection.query(sentence,[id])
    res.json(rows)
}

export const createProduct = async (req, res) =>{
    const {name} = req.body
    res.json({message: `producto de nombre ${name} fue creado`})
}

export const updateProduct = async (req,res) =>{
    const id = req.params.id
    res.json({message:`producto id ${id}`})
}

export const deleteProduct = async (req,res) =>{
    const id = req.params.id
    res.json({message: `producto id ${id} eliminado`})
}


