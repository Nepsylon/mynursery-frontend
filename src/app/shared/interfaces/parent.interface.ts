import { Child } from './child.interface';

export interface Parent {
    surname: string;
    name: string;
    email: string;
    phone: string;
    children: Child[];
}
