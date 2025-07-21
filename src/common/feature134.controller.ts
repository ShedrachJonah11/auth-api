import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Feature134Service } from './feature134.service';
import { CreateFeature134Dto } from './dto/create-feature134.dto';
import { UpdateFeature134Dto } from './dto/update-feature134.dto';

@Controller('feature134')
@UseGuards(JwtAuthGuard)
export class Feature134Controller {
  constructor(private readonly feature134Service: Feature134Service) {}

  @Post()
  create(@Body() createDto: CreateFeature134Dto, @Request() req) {
    return this.feature134Service.create(createDto, req.user);
  }

  @Get()
  findAll(@Request() req) {
    return this.feature134Service.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.feature134Service.findOne(id, req.user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateFeature134Dto, @Request() req) {
    return this.feature134Service.update(id, updateDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.feature134Service.remove(id, req.user);
  }
}