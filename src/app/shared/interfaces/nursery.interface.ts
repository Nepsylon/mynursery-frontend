import { Child } from './child.interface';
import { User } from './user.interface';

export interface Nursery {
    id: number;
    name: string;
    location: string;
    total_children?: number;
    logo?: string;
    owner?: User;
    employees?: User[];
    children?: Child[];
}
