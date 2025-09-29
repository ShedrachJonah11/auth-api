import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFeature57Dto } from './dto/create-feature57.dto';
import { UpdateFeature57Dto } from './dto/update-feature57.dto';

@Injectable()
export class Feature57Service {
  constructor(
    @InjectModel('Feature57') private feature57Model: Model<any>,
  ) {}

  async create(createDto: CreateFeature57Dto, user: any) {
    const feature57 = new this.feature57Model({
      ...createDto,
      userId: user.id,
      createdAt: new Date(),
    });
    return await feature57.save();
  }

  async findAll(user: any) {
    return await this.feature57Model.find({ userId: user.id }).exec();
  }

  async findOne(id: string, user: any) {
    const feature57 = await this.feature57Model.findById(id).exec();
    if (!feature57) {
      throw new NotFoundException('Feature57 not found');
    }
    if (feature57.userId !== user.id) {
      throw new ForbiddenException('Access denied');
    }
    return feature57;
  }

  async update(id: string, updateDto: UpdateFeature57Dto, user: any) {
    const feature57 = await this.findOne(id, user);
    Object.assign(feature57, updateDto);
    feature57.updatedAt = new Date();
    return await feature57.save();
  }

  async remove(id: string, user: any) {
    const feature57 = await this.findOne(id, user);
    await this.feature57Model.findByIdAndDelete(id).exec();
    return { message: 'Feature57 deleted successfully' };
  }
}