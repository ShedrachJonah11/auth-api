import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Feature106Service } from './feature106.service';
import { CreateFeature106Dto } from './dto/create-feature106.dto';
import { UpdateFeature106Dto } from './dto/update-feature106.dto';

@Controller('feature106')
@UseGuards(JwtAuthGuard)
export class Feature106Controller {
  constructor(private readonly feature106Service: Feature106Service) {}

  @Post()
  create(@Body() createDto: CreateFeature106Dto, @Request() req) {
    return this.feature106Service.create(createDto, req.user);
  }

  @Get()
  findAll(@Request() req) {
    return this.feature106Service.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.feature106Service.findOne(id, req.user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateFeature106Dto, @Request() req) {
    return this.feature106Service.update(id, updateDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.feature106Service.remove(id, req.user);
  }
}