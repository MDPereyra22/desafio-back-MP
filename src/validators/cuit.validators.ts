import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsCUITConstraint implements ValidatorConstraintInterface {
  validate(cuit: any) {
    const cuitRegex = /^\d{11}$/;
    return typeof cuit === 'string' && cuitRegex.test(cuit);
  }

  defaultMessage() {
    return 'El CUIT debe ser un número de 11 dígitos';
  }
}

export function IsCUIT(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCUITConstraint,
    });
  };
}
