import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Feature99Service } from './feature99.service';
import { CreateFeature99Dto } from './dto/create-feature99.dto';
import { UpdateFeature99Dto } from './dto/update-feature99.dto';

@Controller('common')
@UseGuards(JwtAuthGuard)
export class Feature99Controller {
  constructor(private readonly feature99Service: Feature99Service) {}

  @Post()
  create(@Body() createDto: CreateFeature99Dto, @Request() req) {
    return this.feature99Service.create(createDto, req.user);
  }

  @Get()
  findAll(@Request() req) {
    return this.feature99Service.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.feature99Service.findOne(id, req.user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateFeature99Dto, @Request() req) {
    return this.feature99Service.update(id, updateDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.feature99Service.remove(id, req.user);
  }
}