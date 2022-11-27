import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { roles } from "../models/roles";

@ValidatorConstraint({ name: 'typesOfRoles', async: false })
export class TypesOfRoles implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments) {
        return Object.keys(roles).map(role => roles[role].name).indexOf(text) >= 0;
    }

    defaultMessage(args: ValidationArguments) {
        return `O campo $property precisa ser igual há um dos itens ${Object.keys(roles).join(', ')}`;
    }
}