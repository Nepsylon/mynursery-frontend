import { Role } from '../enums/role.enum';

export interface createUserDto {
    name: string;
    surname: string;
    email: string;
    password: string;
    role?: string;
}
