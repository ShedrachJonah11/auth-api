import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Feature186Service } from './feature186.service';
import { CreateFeature186Dto } from './dto/create-feature186.dto';
import { UpdateFeature186Dto } from './dto/update-feature186.dto';

@Controller('feature186')
@UseGuards(JwtAuthGuard)
export class Feature186Controller {
  constructor(private readonly feature186Service: Feature186Service) {}

  @Post()
  create(@Body() createDto: CreateFeature186Dto, @Request() req) {
    return this.feature186Service.create(createDto, req.user);
  }

  @Get()
  findAll(@Request() req) {
    return this.feature186Service.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.feature186Service.findOne(id, req.user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateFeature186Dto, @Request() req) {
    return this.feature186Service.update(id, updateDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.feature186Service.remove(id, req.user);
  }
}