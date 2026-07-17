import Router from "express";
import Dog from '../models/dog.js';
import '../controllers/dogController.js';
import { createDog, deleteDog, getAllDogs, getDogById, updateDog } from "../controllers/dogController.js";
const router = Router();

//obtener todos los
router.get('/', getAllDogs)
//obtener por id
router.get('/:id', getDogById)
//crear
router.post('/', createDog)
//acytualizar dog
router.put('/:id', updateDog);
//eliminar
router.delete('/:id', deleteDog)

export default router;