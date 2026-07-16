import Perro from '../models/dog';


// Obtener todos los perros
const getPerros = async (req, res) => {
    try {
        const perros = await Perro.find();
        res.status(200).json(perros);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener los perros"
        });
    }
};

// Obtener un perro por ID
const getPerroById = async (req, res) => {
    try {
        const { id } = req.params;

        const perro = await Perro.findById(id);

        if (!perro) {
            return res.status(404).json({
                mensaje: "Perro no encontrado"
            });
        }

        res.status(200).json(perro);

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener el perro"
        });
    }
};

// Crear un perro
const createPerro = async (req, res) => {
    try {
        const nuevoPerro = new Perro(req.body);

        await nuevoPerro.save();

        res.status(201).json({
            mensaje: "Perro agregado exitosamente",
            perro: nuevoPerro
        });

    } catch (error) {
        res.status(400).json({
            mensaje: "Los datos proporcionados son inválidos."
        });
    }
};

// Actualizar un perro
const updatePerro = async (req, res) => {
    try {
        const { id } = req.params;

        const perroActualizado = await Perro.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!perroActualizado) {
            return res.status(404).json({
                mensaje: "Perro no encontrado"
            });
        }

        res.status(200).json({
            mensaje: "Perro actualizado exitosamente",
            perro: perroActualizado
        });

    } catch (error) {
        res.status(400).json({
            mensaje: "Error al actualizar el perro"
        });
    }
};

// Eliminar un perro
const deletePerro = async (req, res) => {
    try {
        const { id } = req.params;

        const perroEliminado = await Perro.findByIdAndDelete(id);

        if (!perroEliminado) {
            return res.status(404).json({
                mensaje: "Perro no encontrado"
            });
        }

        res.status(200).json({
            mensaje: "Perro eliminado exitosamente"
        });

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar el perro"
        });
    }
};

module.exports = {
    getPerros,
    getPerroById,
    createPerro,
    updatePerro,
    deletePerro
};