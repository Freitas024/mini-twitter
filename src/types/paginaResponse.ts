export interface PaginaResponse<T> {
    posts: T[];
    total: number;
    page: number;
    limit: number;
}