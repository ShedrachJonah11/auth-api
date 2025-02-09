import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFeature138Dto } from './dto/create-feature138.dto';
import { UpdateFeature138Dto } from './dto/update-feature138.dto';

@Injectable()
export class Feature138Service {
  constructor(
    @InjectModel('Feature138') private feature138Model: Model<any>,
  ) {}

  async create(createDto: CreateFeature138Dto, user: any) {
    const feature138 = new this.feature138Model({
      ...createDto,
      userId: user.id,
      createdAt: new Date(),
    });
    return await feature138.save();
  }

  async findAll(user: any) {
    return await this.feature138Model.find({ userId: user.id }).exec();
  }

  async findOne(id: string, user: any) {
    const feature138 = await this.feature138Model.findById(id).exec();
    if (!feature138) {
      throw new NotFoundException('Feature138 not found');
    }
    if (feature138.userId !== user.id) {
      throw new ForbiddenException('Access denied');
    }
    return feature138;
  }

  async update(id: string, updateDto: UpdateFeature138Dto, user: any) {
    const feature138 = await this.findOne(id, user);
    Object.assign(feature138, updateDto);
    feature138.updatedAt = new Date();
    return await feature138.save();
  }

  async remove(id: string, user: any) {
    const feature138 = await this.findOne(id, user);
    await this.feature138Model.findByIdAndDelete(id).exec();
    return { message: 'Feature138 deleted successfully' };
  }
}