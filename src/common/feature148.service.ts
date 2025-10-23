import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFeature148Dto } from './dto/create-feature148.dto';
import { UpdateFeature148Dto } from './dto/update-feature148.dto';

@Injectable()
export class Feature148Service {
  constructor(
    @InjectModel('Feature148') private feature148Model: Model<any>,
  ) {}

  async create(createDto: CreateFeature148Dto, user: any) {
    const feature148 = new this.feature148Model({
      ...createDto,
      userId: user.id,
      createdAt: new Date(),
    });
    return await feature148.save();
  }

  async findAll(user: any) {
    return await this.feature148Model.find({ userId: user.id }).exec();
  }

  async findOne(id: string, user: any) {
    const feature148 = await this.feature148Model.findById(id).exec();
    if (!feature148) {
      throw new NotFoundException('Feature148 not found');
    }
    if (feature148.userId !== user.id) {
      throw new ForbiddenException('Access denied');
    }
    return feature148;
  }

  async update(id: string, updateDto: UpdateFeature148Dto, user: any) {
    const feature148 = await this.findOne(id, user);
    Object.assign(feature148, updateDto);
    feature148.updatedAt = new Date();
    return await feature148.save();
  }

  async remove(id: string, user: any) {
    const feature148 = await this.findOne(id, user);
    await this.feature148Model.findByIdAndDelete(id).exec();
    return { message: 'Feature148 deleted successfully' };
  }
}