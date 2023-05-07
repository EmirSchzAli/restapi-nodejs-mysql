import { conn } from "../db.js ";

export const getAllAdmins = async (req, res) => {
    try {
        
        const [rows] = await conn.query("SELECT * FROM Administradores")
        res.json(rows);

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong!'
        })
    }
};

export const getAdmin = async (req, res) => {
    try {
        const [rows] = await conn.query("SELECT * FROM Administradores WHERE num_empleado = ?", [req.params.num_empleado])
    
        if (rows.length <= 0) return res.status(404).json({message: "Admin not found"});

        res.json(rows[0]);

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong!'
        })
    }
};

export const createAdmin = async (req, res) => {
    
    const {fb_id, num_empleado, nombre,correo, id_tipoAdmin} = req.body
    
    try {

        const [rows] = await conn.query("INSERT INTO Administradores (fb_id, num_empleado, nombre, correo, id_tipoAdmin) VALUES (?,?,?,?,?)", [fb_id, num_empleado, nombre, correo, id_tipoAdmin])
        
        res.send({
            id: rows.insertId,
            fb_id,
            num_empleado,
            nombre,
            correo,
            id_tipoAdmin
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong!'
        })
    }
};

export const updateAdmin = async (req, res) => {
    const {num_empleado} = req.params
    const {nombre, correo} = req.body
    
    try {
        
        const [result] = await conn.query("UPDATE Administradores SET nombre = IFNULL(?, nombre), correo = IFNULL(?, correo) WHERE num_empleado = ?", [nombre, correo, num_empleado])
    
        if (result.affectedRows === 0) return res.status(404).json({message: "Admin not found"});
        
        const[rows] = await conn.query("SELECT * FROM Administradores WHERE num_empleado = ?", [num_empleado])

        res.json(rows[0]);

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong!'
        })
    }

};

export const deleteAdmin = async (req, res) => {
    try {
        
        const [result] = await conn.query("DELETE FROM Administradores WHERE num_empleado = ?", [req.params.num_empleado])

        if (result.affectedRows <= 0) return res.status(404).json({message: "Admin not found"});

        res.status(204) 

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong!'
        })
    }
};