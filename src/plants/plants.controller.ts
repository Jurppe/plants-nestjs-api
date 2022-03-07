import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { ValidationPipe } from './validators/validation.pipe';
import { Plant } from './entities/plant.entity';

@Controller('plants')
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  @Post()
  async create(@Body(new ValidationPipe) createPlantDto: CreatePlantDto) {
    return this.plantsService.create(createPlantDto);
  }

  @Get()
  findAll() {
    return this.plantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const plant: Plant = this.plantsService.findOne(id);  
    if (plant === undefined) {
      throw new BadRequestException('Invalid ID');
    }
    return plant;
  }

  @Get(':id/age')
  getAge(@Param('id') id: string) {
    const plant: Plant = this.plantsService.findOne(id);  
    if (plant === undefined) {
      throw new BadRequestException('Invalid ID');
    }
    return this.plantsService.findOneExtended(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body(new ValidationPipe) updatePlantDto: UpdatePlantDto) {
    const plant: Plant = this.plantsService.findOne(id);  
    if (plant === undefined) {
      throw new BadRequestException('Invalid ID');
    }
    return this.plantsService.update(id, updatePlantDto);
  }

  @Patch(':id/newnote')
  async addNote(@Param('id') id: string, @Body(new ValidationPipe) newNote: { message: string }) {
    const plant: Plant = this.plantsService.findOne(id);  
    if (plant === undefined) {
      throw new BadRequestException('Invalid ID');
    }
    else if (!newNote.message) {
      throw new BadRequestException('Body does not have message field');
    }
    
    return this.plantsService.addNote(id, newNote);
  }

  @Patch(':id/waternow')
  async waterNow(@Param('id') id: string, @Body(new ValidationPipe) updatePlantDto: UpdatePlantDto) {
    const plant: Plant = this.plantsService.findOne(id);  
    if (plant === undefined) {
      throw new BadRequestException('Invalid ID');
    }
    updatePlantDto.last_watered = new Date();
    const returnObj = this.plantsService.update(id, updatePlantDto); 
    return {
      _id: returnObj._id, 
      last_watered: returnObj.last_watered, 
      message: "success"
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const plant: Plant = this.plantsService.findOne(id);  
    if (plant === undefined) {
      throw new BadRequestException('Invalid ID');
    }
    return this.plantsService.remove(id);
  }
}
