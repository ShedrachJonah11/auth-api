import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFeature117Dto } from './dto/create-feature117.dto';
import { UpdateFeature117Dto } from './dto/update-feature117.dto';

@Injectable()
export class Feature117Service {
  constructor(
    @InjectModel('Feature117') private feature117Model: Model<any>,
  ) {}

  async create(createDto: CreateFeature117Dto, user: any) {
    const feature117 = new this.feature117Model({
      ...createDto,
      userId: user.id,
      createdAt: new Date(),
    });
    return await feature117.save();
  }

  async findAll(user: any) {
    return await this.feature117Model.find({ userId: user.id }).exec();
  }

  async findOne(id: string, user: any) {
    const feature117 = await this.feature117Model.findById(id).exec();
    if (!feature117) {
      throw new NotFoundException('Feature117 not found');
    }
    if (feature117.userId !== user.id) {
      throw new ForbiddenException('Access denied');
    }
    return feature117;
  }

  async update(id: string, updateDto: UpdateFeature117Dto, user: any) {
    const feature117 = await this.findOne(id, user);
    Object.assign(feature117, updateDto);
    feature117.updatedAt = new Date();
    return await feature117.save();
  }

  async remove(id: string, user: any) {
    const feature117 = await this.findOne(id, user);
    await this.feature117Model.findByIdAndDelete(id).exec();
    return { message: 'Feature117 deleted successfully' };
  }
}