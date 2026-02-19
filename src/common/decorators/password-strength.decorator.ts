import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { PasswordStrengthUtil } from '../utils/password-strength.util';

export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isStrongPassword',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') {
            return false;
          }
          return PasswordStrengthUtil.isStrongEnough(value);
        },
        defaultMessage(args: ValidationArguments) {
          const strength = PasswordStrengthUtil.validate(args.value as string);
          return `Password is too weak. ${strength.feedback.join('. ')}`;
        },
      },
    });
  };
}



