import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFeature76Dto } from './dto/create-feature76.dto';
import { UpdateFeature76Dto } from './dto/update-feature76.dto';

@Injectable()
export class Feature76Service {
  constructor(
    @InjectModel('Feature76') private feature76Model: Model<any>,
  ) {}

  async create(createDto: CreateFeature76Dto, user: any) {
    const feature76 = new this.feature76Model({
      ...createDto,
      userId: user.id,
      createdAt: new Date(),
    });
    return await feature76.save();
  }

  async findAll(user: any) {
    return await this.feature76Model.find({ userId: user.id }).exec();
  }

  async findOne(id: string, user: any) {
    const feature76 = await this.feature76Model.findById(id).exec();
    if (!feature76) {
      throw new NotFoundException('Feature76 not found');
    }
    if (feature76.userId !== user.id) {
      throw new ForbiddenException('Access denied');
    }
    return feature76;
  }

  async update(id: string, updateDto: UpdateFeature76Dto, user: any) {
    const feature76 = await this.findOne(id, user);
    Object.assign(feature76, updateDto);
    feature76.updatedAt = new Date();
    return await feature76.save();
  }

  async remove(id: string, user: any) {
    const feature76 = await this.findOne(id, user);
    await this.feature76Model.findByIdAndDelete(id).exec();
    return { message: 'Feature76 deleted successfully' };
  }
}