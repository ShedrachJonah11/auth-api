import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFeature98Dto } from './dto/create-feature98.dto';
import { UpdateFeature98Dto } from './dto/update-feature98.dto';

@Injectable()
export class Feature98Service {
  constructor(
    @InjectModel('Feature98') private feature98Model: Model<any>,
  ) {}

  async create(createDto: CreateFeature98Dto, user: any) {
    const feature98 = new this.feature98Model({
      ...createDto,
      userId: user.id,
      createdAt: new Date(),
    });
    return await feature98.save();
  }

  async findAll(user: any) {
    return await this.feature98Model.find({ userId: user.id }).exec();
  }

  async findOne(id: string, user: any) {
    const feature98 = await this.feature98Model.findById(id).exec();
    if (!feature98) {
      throw new NotFoundException('Feature98 not found');
    }
    if (feature98.userId !== user.id) {
      throw new ForbiddenException('Access denied');
    }
    return feature98;
  }

  async update(id: string, updateDto: UpdateFeature98Dto, user: any) {
    const feature98 = await this.findOne(id, user);
    Object.assign(feature98, updateDto);
    feature98.updatedAt = new Date();
    return await feature98.save();
  }

  async remove(id: string, user: any) {
    const feature98 = await this.findOne(id, user);
    await this.feature98Model.findByIdAndDelete(id).exec();
    return { message: 'Feature98 deleted successfully' };
  }
}