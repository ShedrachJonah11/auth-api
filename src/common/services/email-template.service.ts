import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailTemplateService {
  getWelcomeEmail(name: string, verificationLink: string): { subject: string; html: string; text: string } {
    const subject = 'Welcome to Auth API - Verify Your Email';
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .button { display: inline-block; padding: 12px 24px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Auth API!</h1>
          </div>
          <div class="content">
            <p>Hi ${name},</p>
            <p>Thank you for registering with us. Please verify your email address by clicking the button below:</p>
            <a href="${verificationLink}" class="button">Verify Email</a>
            <p>Or copy and paste this link into your browser:</p>
            <p>${verificationLink}</p>
            <p>This link will expire in 24 hours.</p>
          </div>
          <div class="footer">
            <p>If you didn't create an account, please ignore this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    const text = `Welcome to Auth API!\n\nHi ${name},\n\nThank you for registering. Please verify your email by visiting: ${verificationLink}\n\nThis link expires in 24 hours.`;
    return { subject, html, text };
  }

  getPasswordResetEmail(name: string, resetLink: string): { subject: string; html: string; text: string } {
    const subject = 'Password Reset Request';
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f44336; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .button { display: inline-block; padding: 12px 24px; background-color: #f44336; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset</h1>
          </div>
          <div class="content">
            <p>Hi ${name},</p>
            <p>We received a request to reset your password. Click the button below to reset it:</p>
            <a href="${resetLink}" class="button">Reset Password</a>
            <p>Or copy and paste this link: ${resetLink}</p>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn't request this, please ignore this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    const text = `Password Reset Request\n\nHi ${name},\n\nReset your password: ${resetLink}\n\nThis link expires in 1 hour.`;
    return { subject, html, text };
  }

  get2FASetupEmail(name: string): { subject: string; html: string; text: string } {
    const subject = 'Two-Factor Authentication Enabled';
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>2FA Enabled</h2>
        <p>Hi ${name},</p>
        <p>Two-factor authentication has been successfully enabled on your account.</p>
        <p>Your account is now more secure!</p>
      </div>
    `;
    const text = `2FA Enabled\n\nHi ${name},\n\nTwo-factor authentication has been enabled on your account.`;
    return { subject, html, text };
  }
}

