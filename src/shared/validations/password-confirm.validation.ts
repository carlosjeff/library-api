import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'typesOfRoles', async: false })
export class PasswordConfirm implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments) {
        return text === args.object['password'];
    }

    defaultMessage(args: ValidationArguments) {
        return `O campo password precisa ser igual ao campo confirmPassword!`;
    }
}