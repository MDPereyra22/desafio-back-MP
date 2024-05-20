import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsDNIConstraint implements ValidatorConstraintInterface {
  validate(dni: any) {
    const dniRegex = /^\d{7,8}$/;
    return typeof dni === 'string' && dniRegex.test(dni);
  }

  defaultMessage() {
    return 'El DNI debe ser un número de 7 u 8 dígitos';
  }
}

export function IsDNI(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDNIConstraint,
    });
  };
}
