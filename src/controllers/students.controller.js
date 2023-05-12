import { conn } from "../db.js ";

export const getAllStudents = async (req, res) => {
    try {
        
        const [rows] = await conn.query("SELECT * FROM Alumnos")
        res.json(rows);

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong!'
        })
    }
};

export const getStudent = async (req, res) => {
    try {
        const [rows] = await conn.query("SELECT * FROM Alumnos WHERE id_alumno = ?", [req.params.id_alumno])
    
        if (rows.length <= 0) return res.status(404).json({message: "Student not found"});

        res.json(rows[0]);

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong!'
        })
    }
};

export const getStudentbyMat = async (req, res) => {
    try {
        const [rows] = await conn.query("SELECT * FROM Alumnos WHERE matricula = ?", [req.params.matricula])
    
        if (rows.length <= 0) return res.status(404).json({message: "Student not found"});

        res.json(rows[0]);

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong!'
        })
    }
};

export const createStudent = async (req, res) => {
    
    const {matricula, nombre, apellido} = req.body
    console.log(req.body);
    try {

        const [rows] = await conn.query("INSERT INTO Alumnos (matricula, nombre, apellido) VALUES (?,?,?)", [matricula, nombre, apellido])
        
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

export const updateStudent = async (req, res) => {
    const {id_alumno} = req.params
    const {matricula, nombre, apellido} = req.body
    
    try {
        
        const [result] = await conn.query("UPDATE Alumnos SET matricula = IFNULL(?, matricula), nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido) WHERE id_alumno = ?", [matricula, nombre, apellido, id_alumno])
    
        if (result.affectedRows === 0) return res.status(404).json({message: "Student not found"});
        
        const[rows] = await conn.query("SELECT * FROM Alumnos WHERE id_alumno = ?", [id_alumno])

        res.json(rows[0]);

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong!'
        })
    }

};

export const deleteStudent = async (req, res) => {
    try {
        
        const [result] = await conn.query("DELETE FROM Alumnos WHERE id_alumno = ?", [req.params.id_alumno])

        if (result.affectedRows <= 0) return res.status(404).json({message: "Student not found"})

        res.status(200).json({message: "Student deleted"})

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong!'
        })
    }
};