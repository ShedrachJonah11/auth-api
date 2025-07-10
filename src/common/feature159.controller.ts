import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Feature159Service } from './feature159.service';
import { CreateFeature159Dto } from './dto/create-feature159.dto';
import { UpdateFeature159Dto } from './dto/update-feature159.dto';

@Controller('feature159')
@UseGuards(JwtAuthGuard)
export class Feature159Controller {
  constructor(private readonly feature159Service: Feature159Service) {}

  @Post()
  create(@Body() createDto: CreateFeature159Dto, @Request() req) {
    return this.feature159Service.create(createDto, req.user);
  }

  @Get()
  findAll(@Request() req) {
    return this.feature159Service.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.feature159Service.findOne(id, req.user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateFeature159Dto, @Request() req) {
    return this.feature159Service.update(id, updateDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.feature159Service.remove(id, req.user);
  }
}