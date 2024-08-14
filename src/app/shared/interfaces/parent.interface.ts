import { Child } from './child.interface';

export interface Parent {
    id: number;
    surname: string;
    name: string;
    email: string;
    phone: string;
    children: Child[];
}
