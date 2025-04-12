export declare class ListMetaDto {
    page: number;
    size: number;
}
export type ListMetaType = {
    page: number;
    size: number;
    total: number;
};
export declare class ListResponseType<T> {
    itemList: T[];
    meta: ListMetaType;
}
