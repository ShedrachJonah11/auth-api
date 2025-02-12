import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFeature71Dto } from './dto/create-feature71.dto';
import { UpdateFeature71Dto } from './dto/update-feature71.dto';

@Injectable()
export class Feature71Service {
  constructor(
    @InjectModel('Feature71') private feature71Model: Model<any>,
  ) {}

  async create(createDto: CreateFeature71Dto, user: any) {
    const feature71 = new this.feature71Model({
      ...createDto,
      userId: user.id,
      createdAt: new Date(),
    });
    return await feature71.save();
  }

  async findAll(user: any) {
    return await this.feature71Model.find({ userId: user.id }).exec();
  }

  async findOne(id: string, user: any) {
    const feature71 = await this.feature71Model.findById(id).exec();
    if (!feature71) {
      throw new NotFoundException('Feature71 not found');
    }
    if (feature71.userId !== user.id) {
      throw new ForbiddenException('Access denied');
    }
    return feature71;
  }

  async update(id: string, updateDto: UpdateFeature71Dto, user: any) {
    const feature71 = await this.findOne(id, user);
    Object.assign(feature71, updateDto);
    feature71.updatedAt = new Date();
    return await feature71.save();
  }

  async remove(id: string, user: any) {
    const feature71 = await this.findOne(id, user);
    await this.feature71Model.findByIdAndDelete(id).exec();
    return { message: 'Feature71 deleted successfully' };
  }
}