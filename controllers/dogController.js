import Router  from 'express';
import Dog from '../models/dog.js';
import mongoose from 'mongoose';
import { createError, HTTP_STATUS } from '../middlewares/errorHandler.js';


export async function createDog(req,res,next) {
    try {
        const newDog = new Dog({ ...req.body });
        const insertedDog = await newDog.save();
        return res.status(201).json(insertedDog);
        
    } catch (error) {
        next(error);
    }
}
export async function getAllDogs(req,res,next) {
    try {
        const allDogs = await Dog.find();
        if(!allDogs.length){
            throw createError(HTTP_STATUS.NOT_FOUND, "No hay perros en la BD");
        }
        console.log("entre al get");
        return res.status(200).json(allDogs);
        
    } catch (error) {
        next(error);
    }
}

export async function getDogById(req,res,next) {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw createError(HTTP_STATUS.NOT_FOUND,"ID INVALIDO");
        }
        const dog = await Dog.findById(id);
        if(!dog){
            throw createError(HTTP_STATUS.NOT_FOUND,"No hay perro con ese ID");
        }
        
        return res.status(200).json(dog);
    } catch (error) {
        next(error);
    }
}

export async function updateDog(req,res,next) {

    try {
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
            throw createError(HTTP_STATUS.NOT_FOUND,"No se puede actualizar");
        };
        return res.status(200).json(updatedDog);
    } catch (error) {
        next(error);
    }
}

export async function deleteDog(req,res,next) {
    try {
        const { id } = req.params;
        const deletedDog = await Dog.findByIdAndDelete(id);
        if(!deletedDog){
            throw createError(HTTP_STATUS.NOT_FOUND,"No encontrado, se pudo borrar");
        }
        return res.status(200).json(deletedDog);   
    } catch (error) {
        next(error);
    }
}
