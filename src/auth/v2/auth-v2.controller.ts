import { Controller, Post, Body, UseGuards, Get, Request, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthService } from '../auth.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { VerifyEmailDto } from '../dto/verify-email.dto';
import { AssignRoleDto } from '../dto/assign-role.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { ApiVersion } from '../../common/decorators/api-version.decorator';
import { VersionGuard } from '../../common/guards/version.guard';

@ApiTags('Authentication V2')
@Controller('auth/v2')
@UseGuards(ThrottlerGuard, VersionGuard)
@ApiVersion('v2')
export class AuthV2Controller {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user (V2)' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 401, description: 'User already exists' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
  async register(@Body() registerDto: RegisterDto) {
    const result = await this.authService.register(registerDto);
    return {
      ...result,
      version: 'v2',
      features: ['email_verification', 'role_based_access'],
    };
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user (V2)' })
  @ApiResponse({ status: 200, description: 'User successfully logged in' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    return {
      ...result,
      version: 'v2',
      features: ['jwt_auth', 'role_based_access'],
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get user profile (V2)' })
  @ApiResponse({ status: 200, description: 'User profile retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getProfile(@Request() req) {
    return {
      ...req.user,
      version: 'v2',
      features: ['profile_management', 'role_based_access'],
    };
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Request password reset (V2)' })
  @ApiResponse({ status: 200, description: 'Password reset token sent' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const result = await this.authService.forgotPassword(forgotPasswordDto);
    return {
      ...result,
      version: 'v2',
      features: ['password_reset', 'secure_tokens'],
    };
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password with token (V2)' })
  @ApiResponse({ status: 200, description: 'Password reset successfully' })
  @ApiResponse({ status: 400, description: 'Invalid or expired token' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const result = await this.authService.resetPassword(resetPasswordDto);
    return {
      ...result,
      version: 'v2',
      features: ['secure_password_reset'],
    };
  }

  @Post('verify-email')
  @ApiOperation({ summary: 'Verify email address with token (V2)' })
  @ApiResponse({ status: 200, description: 'Email verified successfully' })
  @ApiResponse({ status: 400, description: 'Invalid token or email already verified' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    const result = await this.authService.verifyEmail(verifyEmailDto);
    return {
      ...result,
      version: 'v2',
      features: ['email_verification'],
    };
  }

  @Post('resend-verification')
  @ApiOperation({ summary: 'Resend email verification (V2)' })
  @ApiResponse({ status: 200, description: 'Verification email sent' })
  @ApiResponse({ status: 400, description: 'Email already verified' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
  async resendVerificationEmail(@Body() body: { email: string }) {
    const result = await this.authService.resendVerificationEmail(body.email);
    return {
      ...result,
      version: 'v2',
      features: ['email_verification'],
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('assign-role/:userId')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Assign role to user (V2 - Admin only)' })
  @ApiResponse({ status: 200, description: 'Role assigned successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async assignRole(@Param('userId') userId: string, @Body() assignRoleDto: AssignRoleDto) {
    const result = await this.authService.assignRole(userId, assignRoleDto);
    return {
      ...result,
      version: 'v2',
      features: ['role_management', 'admin_controls'],
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'moderator')
  @Get('users/role/:role')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get users by role (V2 - Admin/Moderator only)' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin/Moderator access required' })
  async getUsersByRole(@Param('role') role: string) {
    const result = await this.authService.getUsersByRole(role);
    return {
      data: result,
      version: 'v2',
      features: ['role_based_queries', 'admin_controls'],
    };
  }
}
