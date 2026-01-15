export type IPqrs = {
  id: number;
  description: string;
  createdAt: Date;
  type: string;
  status: string;
  subject: string;
  user: {
    firstName: string;
    lastName: string;
  };
  pqrsResponses: {
    createdAt: Date;
    message: string;
    responder: {
      firstName: string;
      lastName: string;
    };
  }[];
};

export type IPqrsTableFilters = {
  startDate?: string;
  endDate?: string;
  type?: string;
  status?: string;
  page: number;
  count: number;
};
