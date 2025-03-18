import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Feature129Service } from './feature129.service';
import { CreateFeature129Dto } from './dto/create-feature129.dto';
import { UpdateFeature129Dto } from './dto/update-feature129.dto';

@Controller('common')
@UseGuards(JwtAuthGuard)
export class Feature129Controller {
  constructor(private readonly feature129Service: Feature129Service) {}

  @Post()
  create(@Body() createDto: CreateFeature129Dto, @Request() req) {
    return this.feature129Service.create(createDto, req.user);
  }

  @Get()
  findAll(@Request() req) {
    return this.feature129Service.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.feature129Service.findOne(id, req.user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateFeature129Dto, @Request() req) {
    return this.feature129Service.update(id, updateDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.feature129Service.remove(id, req.user);
  }
}