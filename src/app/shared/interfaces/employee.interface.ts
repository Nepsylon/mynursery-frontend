import { Role } from '../../core/auth/enums/role.enum';
import { Nursery } from './nursery.interface';

export interface Employee {
    id?: number;
    surname: string;
    name: string;
    email: string;
    role: Role;
    isVerified: boolean;
    language?: string;
    nurseries?: Nursery[];
    workplaces?: Nursery[];
}
