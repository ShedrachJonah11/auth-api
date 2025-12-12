import { Controller, Get, Req, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from '../auth.service';

interface OAuthUser {
  email: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  picture?: string;
  avatar?: string;
  username?: string;
}

@ApiTags('OAuth')
@Controller('auth')
export class OAuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Initiate Google OAuth login' })
  googleAuth() {
    // Guard redirects to Google
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google OAuth callback' })
  @ApiResponse({ status: 302, description: 'Redirects to frontend with token' })
  async googleAuthRedirect(@Req() req: Request & { user?: OAuthUser }, @Res() res: Response) {
    try {
      if (!req.user) {
        return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/error?message=Authentication failed`);
      }

      const oauthUser = req.user as OAuthUser;
      const user = await this.authService.findOrCreateOAuthUser({
        email: oauthUser.email,
        firstName: oauthUser.firstName,
        lastName: oauthUser.lastName,
        name: oauthUser.name,
        picture: oauthUser.picture,
      });

      const tokens = await this.authService.generateTokenForUser(user);
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      res.redirect(`${frontendUrl}/auth/callback?token=${tokens.token}&refreshToken=${tokens.refreshToken}`);
    } catch (error) {
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      res.redirect(`${frontendUrl}/auth/error?message=${encodeURIComponent('OAuth authentication failed')}`);
    }
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  @ApiOperation({ summary: 'Initiate GitHub OAuth login' })
  githubAuth() {
    // Guard redirects to GitHub
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  @ApiOperation({ summary: 'GitHub OAuth callback' })
  @ApiResponse({ status: 302, description: 'Redirects to frontend with token' })
  async githubAuthRedirect(@Req() req: Request & { user?: OAuthUser }, @Res() res: Response) {
    try {
      if (!req.user) {
        return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/error?message=Authentication failed`);
      }

      const oauthUser = req.user as OAuthUser;
      const user = await this.authService.findOrCreateOAuthUser({
        email: oauthUser.email,
        name: oauthUser.username || oauthUser.email.split('@')[0],
        avatar: oauthUser.avatar,
      });

      const tokens = await this.authService.generateTokenForUser(user);
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      res.redirect(`${frontendUrl}/auth/callback?token=${tokens.token}&refreshToken=${tokens.refreshToken}`);
    } catch (error) {
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      res.redirect(`${frontendUrl}/auth/error?message=${encodeURIComponent('OAuth authentication failed')}`);
    }
  }
}

