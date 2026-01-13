import { COMMON_AREA_STATUS } from "../constants/common-area.constants";

export interface CommonArea {
  id: string;
  name: string;
  description: string;
  status: keyof typeof COMMON_AREA_STATUS;
  isReservable: boolean;       
  maxCapacity?: number;
  createdAt: Date;
  updatedAt: Date;
}