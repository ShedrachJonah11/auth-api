import { ValidationError } from 'class-validator';

export class ValidationUtil {
  static formatValidationErrors(errors: ValidationError[]): any[] {
    return errors.map(error => ({
      field: error.property,
      value: error.value,
      constraints: error.constraints,
      children: error.children?.length > 0 ? this.formatValidationErrors(error.children) : undefined,
    }));
  }

  static getFirstErrorMessage(errors: ValidationError[]): string {
    if (errors.length === 0) return 'Validation failed';
    
    const firstError = errors[0];
    const constraints = firstError.constraints;
    
    if (constraints) {
      const constraintKeys = Object.keys(constraints);
      return constraints[constraintKeys[0]];
    }
    
    return 'Validation failed';
  }

  static sanitizeInput(input: any): any {
    if (typeof input === 'string') {
      return input.trim();
    }
    
    if (Array.isArray(input)) {
      return input.map(item => this.sanitizeInput(item));
    }
    
    if (input && typeof input === 'object') {
      const sanitized: any = {};
      for (const key in input) {
        if (input.hasOwnProperty(key)) {
          sanitized[key] = this.sanitizeInput(input[key]);
        }
      }
      return sanitized;
    }
    
    return input;
  }
}
