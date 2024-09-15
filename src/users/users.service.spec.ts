import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { User } from './user.schema';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let userModel: any;

  const mockUser = {
    _id: '507f1f77bcf86cd799439011',
    email: 'test@example.com',
    name: 'Test User',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUserModel = {
    find: jest.fn(),
    findById: jest.fn(),
    findOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users without passwords', async () => {
      const mockUsers = [mockUser];
      const selectMock = jest.fn().mockReturnThis();
      const execMock = jest.fn().mockResolvedValue(mockUsers);
      
      mockUserModel.find.mockReturnValue({
        select: selectMock,
        exec: execMock,
      });

      const result = await service.findAll();

      expect(result).toEqual(mockUsers);
      expect(selectMock).toHaveBeenCalledWith('-password');
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const selectMock = jest.fn().mockReturnThis();
      const execMock = jest.fn().mockResolvedValue(mockUser);
      
      mockUserModel.findById.mockReturnValue({
        select: selectMock,
        exec: execMock,
      });

      const result = await service.findOne('507f1f77bcf86cd799439011');

      expect(result).toEqual(mockUser);
      expect(selectMock).toHaveBeenCalledWith('-password');
    });

    it('should throw NotFoundException when user not found', async () => {
      const selectMock = jest.fn().mockReturnThis();
      const execMock = jest.fn().mockResolvedValue(null);
      
      mockUserModel.findById.mockReturnValue({
        select: selectMock,
        exec: execMock,
      });

      await expect(service.findOne('507f1f77bcf86cd799439011')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      mockUserModel.findOne.mockResolvedValue(mockUser);

      const result = await service.findByEmail('test@example.com');

      expect(result).toEqual(mockUser);
      expect(mockUserModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    });
  });

  describe('update', () => {
    it('should update and return a user', async () => {
      const updateData = { name: 'Updated Name' };
      const updatedUser = { ...mockUser, name: 'Updated Name' };
      
      const selectMock = jest.fn().mockReturnThis();
      const execMock = jest.fn().mockResolvedValue(updatedUser);
      
      mockUserModel.findByIdAndUpdate.mockReturnValue({
        select: selectMock,
        exec: execMock,
      });

      const result = await service.update('507f1f77bcf86cd799439011', updateData);

      expect(result).toEqual(updatedUser);
      expect(mockUserModel.findByIdAndUpdate).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
        updateData,
        { new: true }
      );
    });

    it('should throw NotFoundException when user not found', async () => {
      const updateData = { name: 'Updated Name' };
      const selectMock = jest.fn().mockReturnThis();
      const execMock = jest.fn().mockResolvedValue(null);
      
      mockUserModel.findByIdAndUpdate.mockReturnValue({
        select: selectMock,
        exec: execMock,
      });

      await expect(service.update('507f1f77bcf86cd799439011', updateData)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      mockUserModel.findByIdAndDelete.mockResolvedValue(mockUser);

      await service.remove('507f1f77bcf86cd799439011');

      expect(mockUserModel.findByIdAndDelete).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
    });

    it('should throw NotFoundException when user not found', async () => {
      mockUserModel.findByIdAndDelete.mockResolvedValue(null);

      await expect(service.remove('507f1f77bcf86cd799439011')).rejects.toThrow(NotFoundException);
    });
  });
});
