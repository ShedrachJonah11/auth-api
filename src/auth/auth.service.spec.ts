import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/user.schema';

describe('AuthService', () => {
  let service: AuthService;
  let userModel: any;
  let jwtService: any;

  const mockUser = {
    _id: '1',
    email: 'test@example.com',
    password: 'hashedPassword',
    name: 'Test User',
    role: 'user',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(User.name),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mock-jwt-token'),
          },
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

  describe('register', () => {
    it('should register a new user successfully', async () => {
      userModel.findOne.mockResolvedValue(null);
      userModel.create.mockReturnValue({
        ...mockUser,
        save: jest.fn().mockResolvedValue(mockUser),
      });

      const registerDto = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      const result = await service.register(registerDto);

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('token');
      expect(result.user.email).toBe(registerDto.email);
    });

    it('should throw ConflictException if user already exists', async () => {
      userModel.findOne.mockResolvedValue(mockUser);

      const registerDto = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      await expect(service.register(registerDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      jest.spyOn(service, 'validateUser').mockResolvedValue(mockUser);

      const loginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = await service.login(loginDto);

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('token');
      expect(result.user.email).toBe(loginDto.email);
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      jest.spyOn(service, 'validateUser').mockResolvedValue(null);

      const loginDto = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });
});
