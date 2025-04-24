import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFeature115Dto } from './dto/create-feature115.dto';
import { UpdateFeature115Dto } from './dto/update-feature115.dto';

@Injectable()
export class Feature115Service {
  constructor(
    @InjectModel('Feature115') private feature115Model: Model<any>,
  ) {}

  async create(createDto: CreateFeature115Dto, user: any) {
    const feature115 = new this.feature115Model({
      ...createDto,
      userId: user.id,
      createdAt: new Date(),
    });
    return await feature115.save();
  }

  async findAll(user: any) {
    return await this.feature115Model.find({ userId: user.id }).exec();
  }

  async findOne(id: string, user: any) {
    const feature115 = await this.feature115Model.findById(id).exec();
    if (!feature115) {
      throw new NotFoundException('Feature115 not found');
    }
    if (feature115.userId !== user.id) {
      throw new ForbiddenException('Access denied');
    }
    return feature115;
  }

  async update(id: string, updateDto: UpdateFeature115Dto, user: any) {
    const feature115 = await this.findOne(id, user);
    Object.assign(feature115, updateDto);
    feature115.updatedAt = new Date();
    return await feature115.save();
  }

  async remove(id: string, user: any) {
    const feature115 = await this.findOne(id, user);
    await this.feature115Model.findByIdAndDelete(id).exec();
    return { message: 'Feature115 deleted successfully' };
  }
}