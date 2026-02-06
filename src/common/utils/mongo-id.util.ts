import { Types } from 'mongoose';

export function isValidObjectId(value: string): boolean {
  return Types.ObjectId.isValid(value) && new Types.ObjectId(value).toString() === value;
}

export function toObjectId(value: string): Types.ObjectId {
  if (!isValidObjectId(value)) {
    throw new Error(`Invalid ObjectId: ${value}`);
  }
  return new Types.ObjectId(value);
}
