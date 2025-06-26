import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFeature13Dto } from './dto/create-feature13.dto';
import { UpdateFeature13Dto } from './dto/update-feature13.dto';

@Injectable()
export class Feature13Service {
  constructor(
    @InjectModel('Feature13') private feature13Model: Model<any>,
  ) {}

  async create(createDto: CreateFeature13Dto, user: any) {
    const feature13 = new this.feature13Model({
      ...createDto,
      userId: user.id,
      createdAt: new Date(),
    });
    return await feature13.save();
  }

  async findAll(user: any) {
    return await this.feature13Model.find({ userId: user.id }).exec();
  }

  async findOne(id: string, user: any) {
    const feature13 = await this.feature13Model.findById(id).exec();
    if (!feature13) {
      throw new NotFoundException('Feature13 not found');
    }
    if (feature13.userId !== user.id) {
      throw new ForbiddenException('Access denied');
    }
    return feature13;
  }

  async update(id: string, updateDto: UpdateFeature13Dto, user: any) {
    const feature13 = await this.findOne(id, user);
    Object.assign(feature13, updateDto);
    feature13.updatedAt = new Date();
    return await feature13.save();
  }

  async remove(id: string, user: any) {
    const feature13 = await this.findOne(id, user);
    await this.feature13Model.findByIdAndDelete(id).exec();
    return { message: 'Feature13 deleted successfully' };
  }
}