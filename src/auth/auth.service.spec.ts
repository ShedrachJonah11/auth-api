import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { User } from '../users/user.schema';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let userModel: any;
  let jwtService: JwtService;

  const mockUser = {
    _id: '507f1f77bcf86cd799439011',
    email: 'test@example.com',
    password: '$2a$10$hashedpassword',
    name: 'Test User',
    save: jest.fn(),
    toObject: jest.fn(() => ({
      _id: '507f1f77bcf86cd799439011',
      email: 'test@example.com',
      name: 'Test User',
    })),
  };

  const mockUserModel = {
    findOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userModel = module.get(getModelToken(User.name));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user data when credentials are valid', async () => {
      const bcrypt = require('bcryptjs');
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      
      mockUserModel.findOne.mockResolvedValue(mockUser);
      mockUser.toObject.mockReturnValue({
        _id: '507f1f77bcf86cd799439011',
        email: 'test@example.com',
        name: 'Test User',
      });

      const result = await service.validateUser('test@example.com', 'password');
      
      expect(result).toEqual({
        _id: '507f1f77bcf86cd799439011',
        email: 'test@example.com',
        name: 'Test User',
      });
    });

    it('should return null when credentials are invalid', async () => {
      const bcrypt = require('bcryptjs');
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
      
      mockUserModel.findOne.mockResolvedValue(mockUser);

      const result = await service.validateUser('test@example.com', 'wrongpassword');
      
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access token and user data on successful login', async () => {
      const bcrypt = require('bcryptjs');
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      
      mockUserModel.findOne.mockResolvedValue(mockUser);
      mockUser.toObject.mockReturnValue({
        _id: '507f1f77bcf86cd799439011',
        email: 'test@example.com',
        name: 'Test User',
      });
      mockJwtService.sign.mockReturnValue('jwt-token');

      const result = await service.login({
        email: 'test@example.com',
        password: 'password',
      });

      expect(result).toEqual({
        access_token: 'jwt-token',
        user: {
          id: '507f1f77bcf86cd799439011',
          email: 'test@example.com',
          name: 'Test User',
        },
      });
    });

    it('should throw UnauthorizedException on invalid credentials', async () => {
      const bcrypt = require('bcryptjs');
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
      
      mockUserModel.findOne.mockResolvedValue(mockUser);

      await expect(service.login({
        email: 'test@example.com',
        password: 'wrongpassword',
      })).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('register', () => {
    it('should create new user and return user data', async () => {
      const bcrypt = require('bcryptjs');
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedpassword');
      
      mockUserModel.findOne.mockResolvedValue(null);
      mockUserModel.mockImplementation(() => ({
        ...mockUser,
        save: jest.fn().mockResolvedValue(mockUser),
      }));

      const result = await service.register({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
      });

      expect(result).toEqual({
        _id: '507f1f77bcf86cd799439011',
        email: 'test@example.com',
        name: 'Test User',
      });
    });

    it('should throw UnauthorizedException if user already exists', async () => {
      mockUserModel.findOne.mockResolvedValue(mockUser);

      await expect(service.register({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
      })).rejects.toThrow(UnauthorizedException);
    });
  });
});
