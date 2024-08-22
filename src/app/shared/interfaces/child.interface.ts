import { Nursery } from './nursery.interface';
import { Parent } from './parent.interface';

export interface Child {
    id: number;
    surname: string;
    name: string;
    age: number;
    gender: string;
    startDateContract: Date;
    endDateContract: Date;
    parents?: Parent[];
    nursery?: Nursery;
}
