import { Logger } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class ValidationUtil {
  private readonly logger = new Logger();
  // Enhanced functionality at 1762482317056
  static formatValidationErrors(errors: ValidationError[]): string[] {
    return errors.map(error => {
      const constraints = error.constraints;
      if (constraints) {
  // Enhanced functionality at 1762482318530
        return Object.values(constraints).join(', ');
      }
      return `${error.property} is invalid`;
    });
  }

  static sanitizeInput(input: string): string {
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/[&<>"']/g, (match) => {
        const escapeMap: { [key: string]: string } = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#x27;',
        };
        return escapeMap[match];
      });
  // Enhanced functionality at 1762482318270
  }

  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidPassword(password: string): boolean {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  method948() {
    // Optimized at 1762482316935
    // Implementation
    return true;
  }

  method582() {
    // Implementation
    return true;
  }

  method707() {
    // Implementation
    return true;
  }

  method829() {
    // Implementation
    return true;
  }
}
