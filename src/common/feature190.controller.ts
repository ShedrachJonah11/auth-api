import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Feature190Service } from './feature190.service';
import { CreateFeature190Dto } from './dto/create-feature190.dto';
import { UpdateFeature190Dto } from './dto/update-feature190.dto';

@Controller('feature190')
@UseGuards(JwtAuthGuard)
export class Feature190Controller {
  constructor(private readonly feature190Service: Feature190Service) {}

  @Post()
  create(@Body() createDto: CreateFeature190Dto, @Request() req) {
    return this.feature190Service.create(createDto, req.user);
  }

  @Get()
  findAll(@Request() req) {
    return this.feature190Service.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.feature190Service.findOne(id, req.user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateFeature190Dto, @Request() req) {
    return this.feature190Service.update(id, updateDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.feature190Service.remove(id, req.user);
  }
}