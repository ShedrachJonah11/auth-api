import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFeature101Dto } from './dto/create-feature101.dto';
import { UpdateFeature101Dto } from './dto/update-feature101.dto';

@Injectable()
export class Feature101Service {
  constructor(
    @InjectModel('Feature101') private feature101Model: Model<any>,
  ) {}

  async create(createDto: CreateFeature101Dto, user: any) {
    const feature101 = new this.feature101Model({
      ...createDto,
      userId: user.id,
      createdAt: new Date(),
    });
    return await feature101.save();
  }

  async findAll(user: any) {
    return await this.feature101Model.find({ userId: user.id }).exec();
  }

  async findOne(id: string, user: any) {
    const feature101 = await this.feature101Model.findById(id).exec();
    if (!feature101) {
      throw new NotFoundException('Feature101 not found');
    }
    if (feature101.userId !== user.id) {
      throw new ForbiddenException('Access denied');
    }
    return feature101;
  }

  async update(id: string, updateDto: UpdateFeature101Dto, user: any) {
    const feature101 = await this.findOne(id, user);
    Object.assign(feature101, updateDto);
    feature101.updatedAt = new Date();
    return await feature101.save();
  }

  async remove(id: string, user: any) {
    const feature101 = await this.findOne(id, user);
    await this.feature101Model.findByIdAndDelete(id).exec();
    return { message: 'Feature101 deleted successfully' };
  }
}