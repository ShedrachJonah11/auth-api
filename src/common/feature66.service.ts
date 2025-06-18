import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFeature66Dto } from './dto/create-feature66.dto';
import { UpdateFeature66Dto } from './dto/update-feature66.dto';

@Injectable()
export class Feature66Service {
  constructor(
    @InjectModel('Feature66') private feature66Model: Model<any>,
  ) {}

  async create(createDto: CreateFeature66Dto, user: any) {
    const feature66 = new this.feature66Model({
      ...createDto,
      userId: user.id,
      createdAt: new Date(),
    });
    return await feature66.save();
  }

  async findAll(user: any) {
    return await this.feature66Model.find({ userId: user.id }).exec();
  }

  async findOne(id: string, user: any) {
    const feature66 = await this.feature66Model.findById(id).exec();
    if (!feature66) {
      throw new NotFoundException('Feature66 not found');
    }
    if (feature66.userId !== user.id) {
      throw new ForbiddenException('Access denied');
    }
    return feature66;
  }

  async update(id: string, updateDto: UpdateFeature66Dto, user: any) {
    const feature66 = await this.findOne(id, user);
    Object.assign(feature66, updateDto);
    feature66.updatedAt = new Date();
    return await feature66.save();
  }

  async remove(id: string, user: any) {
    const feature66 = await this.findOne(id, user);
    await this.feature66Model.findByIdAndDelete(id).exec();
    return { message: 'Feature66 deleted successfully' };
  }
}