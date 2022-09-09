import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { Plant as PlantType } from './entities/plant.entity';
import { v4 as uuidv4 } from 'uuid';
import { Plant } from "../models/plant.model"
import { Note } from 'src/models/notes.model';

// Helpers
import { DateDiff } from './helper.functions'

@Injectable()
export class PlantsService {

  constructor(
    @InjectModel(Plant)
    private plantModel: typeof Plant,
    @InjectModel(Note)
    private noteModel: typeof Note,
  ) { }

  async findAll(userId: number): Promise<Plant[]> {
    return this.plantModel.findAll({
      where: {
        owner_id: userId
      }
    });
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
    return plant.destroy();
  }

  async create(createPlantDto: CreatePlantDto, userId: number): Promise<Plant> {
    const newPlant: Plant = new Plant({
      id: uuidv4(),
      ...createPlantDto,
      owner_id: userId
    })
    return newPlant.save()
  }

  async update(id: string, updatePlantDto: UpdatePlantDto, userId: number): Promise<[affectedCount: number]> {
    return Plant.update({ ...updatePlantDto }, {
      where: {
        id,
        owner_id: userId
      }
    })
  }

  async addNote(id: string, comment: string): Promise<Note> {
    return new Note({
      plant_id: id,
      comment
    }).save();
  }

  async getNotes(id: string): Promise<Note[]> {
    return this.noteModel.findAll({
      where: {
        plant_id: id
      }
    });
  }
}
