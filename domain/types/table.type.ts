export interface ITablePagination<T> {
  pagination: {
    count: number;
  };
  data: T[];
}