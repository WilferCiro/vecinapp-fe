
export interface Visitor {
  id: string
  name: string;
  document: string;
  visitDate: Date;
  description: string;
  licensePlate?: string;
  authorizedById: string;
}
