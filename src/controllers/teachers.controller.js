import { conn } from "../db.js ";

export const getAllTeachers = async (req, res) => {
    try {
        
        const [rows] = await conn.query("SELECT * FROM Docentes")
        res.json(rows);

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong!'
        })
    }
};

export const getTeacher = async (req, res) => {
    try {
        const [rows] = await conn.query("SELECT * FROM Docentes WHERE id_docente = ?", [req.params.id_docente])
    
        if (rows.length <= 0) return res.status(404).json({message: "Teacher not found"});

        res.json(rows[0]);

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong!'
        })
    }
};

export const createTeacher = async (req, res) => {
    
    const {num_empleado, nombre} = req.body
    console.log(req.body);
    try {

        const [rows] = await conn.query("INSERT INTO Docentes (num_empleado, nombre) VALUES (?,?)", [num_empleado, nombre])
        
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

export const updateTeacher = async (req, res) => {
    const {id_docente} = req.params
    const {num_empleado, nombre} = req.body
    
    try {
        
        const [result] = await conn.query("UPDATE Docentes SET num_empleado = IFNULL(?, num_empleado), nombre = IFNULL(?, nombre) WHERE id_docente = ?", [num_empleado, nombre, id_docente])
    
        if (result.affectedRows === 0) return res.status(404).json({message: "Teacher not found"});
        
        const[rows] = await conn.query("SELECT * FROM Docentes WHERE id_docente = ?", [id_docente])

        res.json(rows[0]);

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong!'
        })
    }

};

export const deleteTeacher = async (req, res) => {
    try {
        
        const [result] = await conn.query("DELETE FROM Docentes WHERE id_docente = ?", [req.params.id_docente])

        if (result.affectedRows <= 0) return res.status(404).json({message: "Teacher not found"})

        res.status(204).json({message: "Teacher deleted"}) 

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong!'
        })
    }
};