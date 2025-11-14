import { Controller, Get, Req, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Request, Response } from 'express';

@ApiTags('OAuth')
@Controller('auth')
export class OAuthController {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Initiate Google OAuth login' })
  googleAuth() {
    // Guard redirects to Google
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google OAuth callback' })
  googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    // Handle OAuth callback
    const user = req.user;
    // Generate JWT and redirect
    res.redirect(`/auth/success?token=${user}`);
  }
}

