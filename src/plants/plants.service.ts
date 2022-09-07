import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { Plant as PlantType } from './entities/plant.entity';
import { v4 as uuidv4 } from 'uuid';
import { Plant } from "../models/plant.model"

// Helpers
import { DateDiff } from './helper.functions'

@Injectable()
export class PlantsService {

  constructor(
    @InjectModel(Plant)
    private plantModel: typeof Plant,
  ) { }

  async findAll(userId: number): Promise<Plant[]> {
    return this.plantModel.findAll({ where: {
      owner_id: userId
    }});
  }

  async findOne(id: string, userId: number): Promise<Plant> {
    return this.plantModel.findOne({
      where: {
        id,
        owner_id: userId
      },
    });
  }

  async remove(id: string, userId: number): Promise<void> {
    const plant = await this.findOne(id, userId);
    await plant.destroy();
  }

  async create(createPlantDto: CreatePlantDto, userId: number) {
    const newPlant: Plant = new Plant({
      _id: uuidv4(),
      ...createPlantDto,
      owner_id: userId
    })
    newPlant.save()
  }
  
  async update(id, updatePlantDto, userId) {
    Plant.update({...updatePlantDto}, {
      where: {
        id,
        owner_id: userId
      }
    }).then(() => {
      return {
        status: "success",
        newData: updatePlantDto,
      }
    })
  }

  async waterNow(id: string, userId: number) {
    const dateNow = new Date()
    Plant.update({
      last_watered: dateNow.toISOString()
    },
    {
      where: {
        id,
        owner_id: userId
      }
    })
    .then(() => {
      return {
        state: "successfull",
        datetime: dateNow.toISOString(),
        plant_id: id
      }
    })
  }
  /*  update(id: string, updatePlantDto: UpdatePlantDto, userId: number) {
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
  
  
    remove(id: string, userId: number) {
      this.plants.filter(obj => obj._id != id && obj.owner_id != userId)
    } */
}
