import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Feature67Service } from './feature67.service';
import { CreateFeature67Dto } from './dto/create-feature67.dto';
import { UpdateFeature67Dto } from './dto/update-feature67.dto';

@Controller('feature67')
@UseGuards(JwtAuthGuard)
export class Feature67Controller {
  constructor(private readonly feature67Service: Feature67Service) {}

  @Post()
  create(@Body() createDto: CreateFeature67Dto, @Request() req) {
    return this.feature67Service.create(createDto, req.user);
  }

  @Get()
  findAll(@Request() req) {
    return this.feature67Service.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.feature67Service.findOne(id, req.user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateFeature67Dto, @Request() req) {
    return this.feature67Service.update(id, updateDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.feature67Service.remove(id, req.user);
  }
}