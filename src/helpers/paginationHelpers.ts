import { SortOrder } from 'mongoose';

type IOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
};
const calulatePagination = (options: IOptions): IOptionsResult => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 30);
  const sortBy = options.sortBy || 'createAt';
  const sortOrder = options.sortOrder || 'desc';

  const skip = (page - 1) * limit;

  return { page, limit, skip, sortBy, sortOrder };
};

export const paginationHelpers = {
  calulatePagination,
};
