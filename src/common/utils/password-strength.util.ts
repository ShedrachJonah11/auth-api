export interface PasswordStrength {
  score: number; // 0-4
  feedback: string[];
  isStrong: boolean;
}

export class PasswordStrengthUtil {
  static validate(password: string): PasswordStrength {
    const feedback: string[] = [];
    let score = 0;

    // Length check
    if (password.length >= 8) {
      score++;
    } else {
      feedback.push('Password should be at least 8 characters long');
    }

    // Lowercase check
    if (/[a-z]/.test(password)) {
      score++;
    } else {
      feedback.push('Add lowercase letters');
    }

    // Uppercase check
    if (/[A-Z]/.test(password)) {
      score++;
    } else {
      feedback.push('Add uppercase letters');
    }

    // Number check
    if (/\d/.test(password)) {
      score++;
    } else {
      feedback.push('Add numbers');
    }

    // Special character check
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      score++;
    } else {
      feedback.push('Add special characters');
    }

    // Additional strength checks
    if (password.length >= 12) score += 0.5;
    if (password.length >= 16) score += 0.5;

    return {
      score: Math.min(Math.floor(score), 4),
      feedback: feedback.length > 0 ? feedback : ['Strong password'],
      isStrong: score >= 3,
    };
  }

  static isStrongEnough(password: string): boolean {
    return this.validate(password).isStrong;
  }
}


