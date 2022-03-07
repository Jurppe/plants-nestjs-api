import { Injectable } from '@nestjs/common';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { Plant } from './entities/plant.entity';
import { v4 as uuidv4 } from 'uuid';

// Import data from json file
import Data from './dummydata/data.json';
// Helpers
import { DateDiff } from './helper.functions'

@Injectable()
export class PlantsService {
  private readonly plants: Plant[] = Data;

  create(createPlantDto: CreatePlantDto) {
    const newPlant: Plant = {
      _id: uuidv4(),
      ...createPlantDto,
      user_notes: [],
    }
    return new Promise((resolve, reject) => {
      this.plants.push(newPlant)
      resolve(newPlant)
      reject(new Error('No can do?'))
    });
  }

  findAll() {
    return this.plants;
  }

  findOne(id: string) {
    return this.plants.find(obj => obj._id == id);
  }

  findOneExtended(id: string) {
    let plant = this.plants.find(obj => obj._id == id)
    let age = DateDiff.inMonths(new Date(plant.bought), new Date())
    return {
      ...plant,
      age: age + " months"
    }
  }

  update(id: string, updatePlantDto: UpdatePlantDto) {
    const plantToModified: Plant = this.plants.find(obj => obj._id == id)    
    if (!plantToModified) {
      return undefined
    }
    const newPlant: Plant = {...plantToModified, ...updatePlantDto};
    return newPlant;
  }

  addNote(id: string, newNote: {message: string}) {
    this.plants.map(plant => {
      plant._id === id ? {...plant, user_notes: plant.user_notes.push(newNote.message)} : plant
    })    
    
    return this.plants.find(obj => obj._id == id); 
  }

  waterNow(id: string) {
    this.plants.map(plant => plant._id === id ? plant.last_watered = Date.now(): plant)
    return this.plants.find(obj => obj._id == id);
  }

  remove(id: string) {
    return `This action removes a #${id} plant`;
  }
}
