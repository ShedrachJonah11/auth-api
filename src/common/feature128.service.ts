import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFeature128Dto } from './dto/create-feature128.dto';
import { UpdateFeature128Dto } from './dto/update-feature128.dto';

@Injectable()
export class Feature128Service {
  constructor(
    @InjectModel('Feature128') private feature128Model: Model<any>,
  ) {}

  async create(createDto: CreateFeature128Dto, user: any) {
    const feature128 = new this.feature128Model({
      ...createDto,
      userId: user.id,
      createdAt: new Date(),
    });
    return await feature128.save();
  }

  async findAll(user: any) {
    return await this.feature128Model.find({ userId: user.id }).exec();
  }

  async findOne(id: string, user: any) {
    const feature128 = await this.feature128Model.findById(id).exec();
    if (!feature128) {
      throw new NotFoundException('Feature128 not found');
    }
    if (feature128.userId !== user.id) {
      throw new ForbiddenException('Access denied');
    }
    return feature128;
  }

  async update(id: string, updateDto: UpdateFeature128Dto, user: any) {
    const feature128 = await this.findOne(id, user);
    Object.assign(feature128, updateDto);
    feature128.updatedAt = new Date();
    return await feature128.save();
  }

  async remove(id: string, user: any) {
    const feature128 = await this.findOne(id, user);
    await this.feature128Model.findByIdAndDelete(id).exec();
    return { message: 'Feature128 deleted successfully' };
  }
}