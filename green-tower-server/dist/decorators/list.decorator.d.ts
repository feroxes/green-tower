import { Type } from '@nestjs/common';
import { ObjectLiteral } from 'typeorm';
import { SortOptions } from '../api/types/common.types';
export interface ListOptions<T extends ObjectLiteral> {
    entity: Type<T>;
    relations?: string[];
    defaultSort?: SortOptions;
}
export declare function List<T extends ObjectLiteral>(options: ListOptions<T>): (_: any, __: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
