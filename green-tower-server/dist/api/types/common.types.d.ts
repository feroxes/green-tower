export declare enum SortDirectionType {
    ASC = "ASC",
    DESC = "DESC"
}
export interface SortOptions {
    field: string;
    order: SortDirectionType.ASC | SortDirectionType.DESC;
}
