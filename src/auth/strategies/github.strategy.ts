import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github2';

@Injectable()
export class GitHubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL || '/auth/github/callback',
      scope: ['user:email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any) => void,
  ): Promise<any> {
    try {
      const { username, emails, photos } = profile;
      
      const email = emails?.[0]?.value || (username ? `${username}@github` : null);
      if (!email) {
        return done(new Error('No email found in GitHub profile'), null);
      }

      const user = {
        email,
        username,
        name: username || email.split('@')[0],
        avatar: photos?.[0]?.value,
        accessToken,
      };
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
}

