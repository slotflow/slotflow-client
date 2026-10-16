import { ServiceCategory } from '../enums';

// Application services creating by admin
export interface Service {
  _id: string;
  serviceName: string;
  serviceCategory: ServiceCategory;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}
