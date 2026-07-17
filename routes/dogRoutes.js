import Router from "express";
import Dog from '../models/dog.js';
const router = Router();

router.get('/', async (req, res) => {
  const allDogs = await Dog.find()
  console.log("entre al get");
  return res.status(200).json(allDogs)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const dog = await Dog.findById(id)
  return res.status(200).json(dog)
})

router.post('/', async (req, res) => {
  const newDog = new Dog({ ...req.body })
  const insertedDog = await newDog.save()
  return res.status(201).json(insertedDog)
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedDog = await Dog.findByIdAndUpdate(
        id,
        req.body,
        {
            returnDocument:'after',
            runValidators: true
        }
    );
    if (!updatedDog) {
        return res.status(404).json({
            mensaje: "Perro no encontrado"
        });
    }
    return res.status(200).json(updatedDog);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const deletedDog = await Dog.findByIdAndDelete({_id:id})
  return res.status(200).json(deletedDog)
})

export default router;