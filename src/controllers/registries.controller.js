import { conn } from "../db.js ";

export const createRegistry = async (req, res) => {
    
    const {nombre_registrado, miembro, salon, fecha_hora, id_admin} = req.body
    console.log(req.body);
    try {

        const [rows] = await conn.query("INSERT INTO Registros (nombre_registrado, miembro, salon, fecha_hora, id_admin) VALUES (?, ?, ?, ?, ?);", [nombre_registrado, miembro, salon, fecha_hora, id_admin])
        
        /*res.send({
            id: rows.insertId,
            fb_id,
            num_empleado,
            nombre,
            correo,
            id_tipoAdmin
        });*/
        console.log(rows);
        res.status(201).json({
            id: rows.insertId
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong!'
        })
    }
};

export const getAllRegistries = async (req, res) => {
    try {
        
        const [rows] = await conn.query("SELECT * FROM Registros ORDER BY fecha_hora DESC")
        res.json(rows);

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong!'
        })
    }
};

export const getRegistriesbyAdminId = async (req, res) => {
    try {
        const [rows] = await conn.query("SELECT * FROM Registros WHERE id_admin = ?", [req.params.id_admin])
    
        if (rows.length <= 0) return res.status(404).json({message: "Student not found"});

        res.json(rows[0]);

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong!'
        })
    }
};