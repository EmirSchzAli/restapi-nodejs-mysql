import {conn} from "../db.js";


export const pin = async (req, res) => {
    const [result] = await conn.query('SELECT * FROM Tipo_Admin')
    res.json(result)
}