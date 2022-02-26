export interface PagedResponse<T> {
  pageNumber: number;
  size: number;
  elements: T[];
}
