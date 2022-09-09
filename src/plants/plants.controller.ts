import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Request, UseGuards, Req, NotFoundException} from '@nestjs/common';
import { PlantsService } from './plants.service';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { ValidationPipe } from './validators/validation.pipe';
import { Plant } from './entities/plant.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';
import { Note } from 'src/models/notes.model';


@Controller('plants')
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body(new ValidationPipe) createPlantDto: CreatePlantDto, @Request() req) {
    const newPlant = this.plantsService.create(createPlantDto, req.user.userId);
    if (!newPlant) {
      throw new BadRequestException('Something went wrong upon adding new plant')
    }
    return await newPlant
  }
  
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.plantsService.findAll(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    const plant: Plant = await this.plantsService.findOne(id, req.user.userId);  
    if (plant === undefined) {
      throw new BadRequestException('Invalid ID');
    }
    return plant;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/notes')
  async getNotes(@Param('id') id: string, @Request() req) {
    const notes: Note[] = await this.plantsService.getNotes(id);  
    if (notes === undefined) {
      throw new BadRequestException('Invalid ID');
    }
    return notes;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/newnote')
  async addNote(@Param('id') id: string, @Body(new ValidationPipe) newNote: { message: string }, @Request() req) {
    return await this.plantsService.addNote(id, newNote.message);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/waternow')
  async waterNow(@Param('id') id: string, @Body(new ValidationPipe) updatePlantDto: UpdatePlantDto, @Request() req) {
    updatePlantDto.last_watered = new Date();
    const returnObj = await this.plantsService.update(id, updatePlantDto, req.user.userId); 
    
    if (returnObj === undefined || returnObj[0] == 0) {
      throw new BadRequestException('Invalid ID');
    }
    return {
      status: "success",
      watering_status: {
        id,
        last_watered: updatePlantDto.last_watered,
      }
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    return this.plantsService.remove(id, req.user.userId)
    .then(() => {
      return {
        deleted: true
      }
    })
    .catch((error) => {
      return {
        deleted: false,
        error
      }
    })
  }
}
