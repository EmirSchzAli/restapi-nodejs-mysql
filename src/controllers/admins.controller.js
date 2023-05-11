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

export const getAdminbyFBid = async (req, res) => {
    try {
        const [rows] = await conn.query("SELECT * FROM Administradores WHERE fb_id = ?", [req.params.fb_id])
    
        if (rows.length <= 0) return res.status(404).json({message: "Admin not found"});

        res.json(rows[0]);

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong!'
        })
    }
};

export const getAdminsRegistred = async (req, res) => {
    try {
        
        const [rows] = await conn.query("SELECT a.id_admin, a.fb_id, a.num_empleado, a.nombre, a.correo, ta.nombre as 'tipoAdmin', a.id_tipoAdmin FROM Administradores a INNER JOIN Tipo_Admin ta ON a.id_tipoAdmin = ta.id_tipoAdmin ORDER BY a.num_empleado ASC")
        
        if (rows.length <= 0) return res.status(404).json({message: "Adminsssssss not found"});

        res.json(rows);

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong!'
        })
    }
};


export const createAdmin = async (req, res) => {
    
    const {fb_id, num_empleado, nombre,correo, id_tipoAdmin} = req.body
    console.log(req.body);
    try {

        const [rows] = await conn.query("INSERT INTO Administradores (fb_id, num_empleado, nombre, correo, id_tipoAdmin) VALUES (?,?,?,?,?)", [fb_id, num_empleado, nombre, correo, id_tipoAdmin])
        
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

export const updateAdmin = async (req, res) => {
    const {id_admin} = req.params
    const {num_empleado, nombre, correo} = req.body
    
    try {
        
        const [result] = await conn.query("UPDATE Administradores SET num_empleado = IFNULL(?, num_empleado), nombre = IFNULL(?, nombre), correo = IFNULL(?, correo) WHERE id_admin = ?", [num_empleado, nombre, correo, id_admin])
    
        if (result.affectedRows === 0) return res.status(404).json({message: "Admin not found"});
        
        const[rows] = await conn.query("SELECT * FROM Administradores WHERE id_admin = ?", [id_admin])

        res.json(rows[0]);

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong!'
        })
    }

};

export const deleteAdmin = async (req, res) => {
    try {
        
        const [result] = await conn.query("DELETE FROM Administradores WHERE id_admin = ?", [req.params.id_admin])

        if (result.affectedRows <= 0) return res.status(404).json({message: "Admin not found"})

        res.status(204) 

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong!'
        })
    }
};