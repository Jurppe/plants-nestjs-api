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

  create(createPlantDto: CreatePlantDto, userId: number) {
    const newPlant: Plant = {
      _id: uuidv4(),
      ...createPlantDto,
      user_notes: [],
      owner_id: userId
    }
    return new Promise((resolve, reject) => {
      this.plants.push(newPlant)
      resolve(newPlant)
      reject(new Error('No can do?'))
    });
  }

  findAll(userId: number) {
    return this.plants.filter(plant => plant.owner_id == userId);
  }

  findOne(id: string, userId: number) {
    let plant = this.plants.find(obj => obj._id == id)
    let age = DateDiff.inMonths(new Date(plant.bought), new Date())
    return {
      ...plant,
      age: age + " months"
    }
  }

  update(id: string, updatePlantDto: UpdatePlantDto, userId: number) {
    const plantToModifiedIndex: number = this.plants.findIndex(obj => obj._id == id && obj.owner_id == userId)    
    if (plantToModifiedIndex == -1) {
      return undefined
    }
    this.plants[plantToModifiedIndex] = {...this.plants[plantToModifiedIndex], ...updatePlantDto}
    return this.plants[plantToModifiedIndex]
  }

  addNote(id: string, newNote: {message: string}, userId: number) {
    this.plants.map(plant => {
      plant._id === id 
      && plant.owner_id == userId 
      ? {...plant, user_notes: plant.user_notes.push(newNote.message)} 
      : plant
    })    
    
    return this.plants.find(obj => obj._id == id && obj.owner_id == userId); 
  }

  waterNow(id: string, userId: number) {
    this.plants.map(plant => plant._id === id && plant.owner_id == userId ? plant.last_watered = Date.now(): plant)
    return this.plants.find(obj => obj._id == id);
  }

  remove(id: string, userId: number) {
    return `This action removes a #${id} plant`;
  }
}
