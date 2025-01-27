import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFeature121Dto } from './dto/create-feature121.dto';
import { UpdateFeature121Dto } from './dto/update-feature121.dto';

@Injectable()
export class Feature121Service {
  constructor(
    @InjectModel('Feature121') private feature121Model: Model<any>,
  ) {}

  async create(createDto: CreateFeature121Dto, user: any) {
    const feature121 = new this.feature121Model({
      ...createDto,
      userId: user.id,
      createdAt: new Date(),
    });
    return await feature121.save();
  }

  async findAll(user: any) {
    return await this.feature121Model.find({ userId: user.id }).exec();
  }

  async findOne(id: string, user: any) {
    const feature121 = await this.feature121Model.findById(id).exec();
    if (!feature121) {
      throw new NotFoundException('Feature121 not found');
    }
    if (feature121.userId !== user.id) {
      throw new ForbiddenException('Access denied');
    }
    return feature121;
  }

  async update(id: string, updateDto: UpdateFeature121Dto, user: any) {
    const feature121 = await this.findOne(id, user);
    Object.assign(feature121, updateDto);
    feature121.updatedAt = new Date();
    return await feature121.save();
  }

  async remove(id: string, user: any) {
    const feature121 = await this.findOne(id, user);
    await this.feature121Model.findByIdAndDelete(id).exec();
    return { message: 'Feature121 deleted successfully' };
  }
}