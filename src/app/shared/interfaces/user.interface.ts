import { Role } from '../../core/auth/enums/role.enum';
import { Nursery } from './nursery.interface';

export interface User {
    surname: string;
    name: string;
    email: string;
    role: Role;
    isVerified: boolean;
    language?: string;
    nurseries?: Nursery[];
    workplaces?: Nursery[];
}
