import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { Product } from './product.model';
import { IProduct, IProductsFilters } from './product.interface';
import { productSearchableFields } from './product.constant';


const getSingleProduct = async (
  id: string,
): Promise<IProduct | null > => {
    const result = await Product.findById(id);
  if (!result) {
    throw new ApiError(404, 'Product not found');
  }
  return result;
};

const getAllProduct = async (
  filters: IProductsFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IProduct[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calulatePagination(paginationOptions);

  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

/*   if (searchTerm) {
    andCondition.push({
      $or: productSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  } */


  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await Product.find(whereCondition)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  const count = await Product.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      count,
    },
    data: result,
  };
};

export const ProductService = {
    getSingleProduct,
    getAllProduct
};
