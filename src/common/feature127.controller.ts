import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Feature127Service } from './feature127.service';
import { CreateFeature127Dto } from './dto/create-feature127.dto';
import { UpdateFeature127Dto } from './dto/update-feature127.dto';

@Controller('feature127')
@UseGuards(JwtAuthGuard)
export class Feature127Controller {
  constructor(private readonly feature127Service: Feature127Service) {}

  @Post()
  create(@Body() createDto: CreateFeature127Dto, @Request() req) {
    return this.feature127Service.create(createDto, req.user);
  }

  @Get()
  findAll(@Request() req) {
    return this.feature127Service.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.feature127Service.findOne(id, req.user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateFeature127Dto, @Request() req) {
    return this.feature127Service.update(id, updateDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.feature127Service.remove(id, req.user);
  }
}