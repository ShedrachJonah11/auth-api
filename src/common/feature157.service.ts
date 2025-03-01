import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFeature157Dto } from './dto/create-feature157.dto';
import { UpdateFeature157Dto } from './dto/update-feature157.dto';

@Injectable()
export class Feature157Service {
  constructor(
    @InjectModel('Feature157') private feature157Model: Model<any>,
  ) {}

  async create(createDto: CreateFeature157Dto, user: any) {
    const feature157 = new this.feature157Model({
      ...createDto,
      userId: user.id,
      createdAt: new Date(),
    });
    return await feature157.save();
  }

  async findAll(user: any) {
    return await this.feature157Model.find({ userId: user.id }).exec();
  }

  async findOne(id: string, user: any) {
    const feature157 = await this.feature157Model.findById(id).exec();
    if (!feature157) {
      throw new NotFoundException('Feature157 not found');
    }
    if (feature157.userId !== user.id) {
      throw new ForbiddenException('Access denied');
    }
    return feature157;
  }

  async update(id: string, updateDto: UpdateFeature157Dto, user: any) {
    const feature157 = await this.findOne(id, user);
    Object.assign(feature157, updateDto);
    feature157.updatedAt = new Date();
    return await feature157.save();
  }

  async remove(id: string, user: any) {
    const feature157 = await this.findOne(id, user);
    await this.feature157Model.findByIdAndDelete(id).exec();
    return { message: 'Feature157 deleted successfully' };
  }
}