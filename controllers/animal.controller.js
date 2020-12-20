const { findByIdAndUpdate } = require('../models/animal.model');
const { Animal } = require('./../models');

module.exports.createAnimal = async (req, res, next) => {
  const { body } = req;
  const animalInstance = new Animal(body);
  try {
    const createdAnimal = await animalInstance.save();
    console.log('createdAnimal :>> ', createdAnimal);
    if (createdAnimal) {
      return res.status(201).send({ data: createdAnimal });
    }
    res.status(400).send('Bad request')
  }
  catch (err) {
    next(err)
  }
}

module.exports.getAllAnimals = async (req, res, next) => {
  try {
    const foundAnimal = await Animal.find();
    console.log('foundAnimals :>> ', foundAnimal);
    return res.status(200).send({ data: foundAnimal }); 
  }
  catch (err) {
    next(err)
  }
 }

module.exports.getAnimal = async (req, res, next) => { 
  const {params: {animalId} } = req;
  try {
    const foundAnimal = await Animal.findById(animalId);
    console.log('foundAnimal :>> ', foundAnimal);
    if (foundAnimal) {
      return res.status(200).send({ data: foundAnimal });
    }
    res.status(404).send('Not found')
  }
  catch (err) {
    next(err)
  }
}

//findByIdAndUpdate(id,body)
module.exports.updateAnimal = async (req, res, next) => {
  const { body, params: {animalId} } = req;
  console.log('animalId :>> ', animalId);
  try {
    const updatedAnimal = await Animal.findByIdAndUpdate(animalId , body)
    console.log('updatedAnimal :>> ', updatedAnimal);
    if (updatedAnimal) {
      return res.status(200).send({ data: updatedAnimal });
    }
    res.status(400).send('Bad request')
  }
  catch (err) {
    next(err)
  }
}

module.exports.deleteAnimal = async (req, res, next) => {
  const { params: {animalId} } = req;

  try {
    const deletedAnimal = await Animal.findByIdAndDelete(animalId)
    console.log('deletedAnimal :>> ', deletedAnimal);
    if (deletedAnimal) {
      return res.status(200).send({ data: deletedAnimal });
    }
    res.status(404).send('Not Found')
  }
  catch (err) {
    next(err)
  }
 }