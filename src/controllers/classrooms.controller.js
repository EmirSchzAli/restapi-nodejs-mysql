import { conn } from "../db.js ";

export const getAllClassrooms = async (req, res) => {
    try {
        
        const [rows] = await conn.query("SELECT * FROM Salones")
        res.json(rows);

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong!'
        })
    }
};

export const getClassroom = async (req, res) => {
    try {
        const [rows] = await conn.query("SELECT * FROM Salones WHERE id_salon = ?", [req.params.id_salon])
    
        if (rows.length <= 0) return res.status(404).json({message: "Classroom not found"});

        res.json(rows[0]);

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong!'
        })
    }
};

export const createClassroom = async (req, res) => {
    
    const {nombre} = req.body
    console.log(req.body);
    try {

        const [rows] = await conn.query("INSERT INTO Salones (nombre) VALUES (?)", [nombre])
        
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

export const updateClassroom = async (req, res) => {
    const {id_salon} = req.params
    const {nombre} = req.body
    
    try {
        
        const [result] = await conn.query("UPDATE Salones SET nombre = IFNULL(?, nombre) WHERE id_salon = ?", [nombre, id_salon])
    
        if (result.affectedRows === 0) return res.status(404).json({message: "Teacher not found"});
        
        const[rows] = await conn.query("SELECT * FROM Docentes WHERE id_docente = ?", [id_salon])

        res.json(rows[0]);

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong!'
        })
    }

};

export const deleteClassroom = async (req, res) => {
    try {
        
        const [result] = await conn.query("DELETE FROM Salones WHERE id_salon = ?", [req.params.id_salon])

        if (result.affectedRows <= 0) return res.status(404).json({message: "Teacher not found"})

        res.status(200).json({message: "Classroom deleted"}) 

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong!'
        })
    }
};