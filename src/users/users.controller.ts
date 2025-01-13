import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AssignRoleDto } from '../auth/dto/assign-role.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';
import { SetAvatarDto } from './dto/set-avatar.dto';
import { ConfirmDeletionDto } from './dto/confirm-deletion.dto';
import { AccountDeletionService } from './services/account-deletion.service';
import { Query } from '@nestjs/common';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly accountDeletionService: AccountDeletionService,
  ) {}

  @Get('me/preferences')
  @ApiOperation({ summary: 'Get current user preferences' })
  @ApiResponse({ status: 200, description: 'Preferences retrieved successfully' })
  async getMyPreferences(@CurrentUser() user: { sub: string }) {
    const prefs = await this.usersService.getPreferences(user.sub);
    return { success: true, data: prefs };
  }

  @Patch('me/preferences')
  @ApiOperation({ summary: 'Update current user preferences' })
  @ApiResponse({ status: 200, description: 'Preferences updated successfully' })
  async updateMyPreferences(@CurrentUser() user: { sub: string }, @Body() dto: UpdatePreferencesDto) {
    const prefs = await this.usersService.updatePreferences(user.sub, dto);
    return { success: true, message: 'Preferences updated', data: prefs };
  }

  @Patch('me/avatar')
  @ApiOperation({ summary: 'Set avatar URL for current user' })
  @ApiResponse({ status: 200, description: 'Avatar updated successfully' })
  async setMyAvatar(@CurrentUser() user: { sub: string }, @Body() dto: SetAvatarDto) {
    const result = await this.usersService.setAvatarUrl(user.sub, dto.avatarUrl);
    return { success: true, message: 'Avatar updated', data: result };
  }

  @Post('me/request-deletion')
  @ApiOperation({ summary: 'Request account deletion (grace period)' })
  @ApiResponse({ status: 201, description: 'Deletion scheduled' })
  async requestDeletion(@CurrentUser() user: { sub: string }) {
    const result = await this.accountDeletionService.requestAccountDeletion(user.sub);
    return { success: true, ...result };
  }

  @Post('me/confirm-deletion')
  @ApiOperation({ summary: 'Confirm account deletion with password' })
  @ApiResponse({ status: 200, description: 'Account deleted' })
  @ApiResponse({ status: 401, description: 'Invalid password' })
  async confirmDeletion(@CurrentUser() user: { sub: string }, @Body() dto: ConfirmDeletionDto) {
    const result = await this.accountDeletionService.confirmAccountDeletion(user.sub, dto.password);
    return { success: true, ...result };
  }

  @Get('me/export')
  @ApiOperation({ summary: 'Export my data (GDPR)' })
  @ApiResponse({ status: 200, description: 'Export file path or data' })
  async exportMyData(@CurrentUser() user: { sub: string }) {
    const filepath = await this.accountDeletionService.exportUserData(user.sub);
    return { success: true, message: 'Data exported', data: { filepath } };
  }

  @Get()
  @ApiOperation({ summary: 'Get all users with pagination' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  async findAll(@Query() pagination: PaginationDto) {
    const result = await this.usersService.findAll({
      page: pagination.page,
      limit: pagination.limit,
    });
    return {
      success: true,
      message: 'Users retrieved successfully',
      data: result.users,
      meta: { total: result.total, page: result.page, totalPages: result.totalPages },
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return {
      success: true,
      message: 'User retrieved successfully',
      data: user,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);
    return {
      success: true,
      message: 'User updated successfully',
      data: user,
    };
  }

  @Patch(':id/role')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Assign role to user (admin only)' })
  @ApiResponse({ status: 200, description: 'Role assigned successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async assignRole(@Param('id') id: string, @Body() assignRoleDto: AssignRoleDto) {
    const user = await this.usersService.assignRole(id, assignRoleDto.role);
    return {
      success: true,
      message: 'Role assigned successfully',
      data: user,
    };
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Delete user (admin only)' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
    return {
      success: true,
      message: 'User deleted successfully',
    };
  }
}
