
export type MeResponse = {
  id: string;
  email: string;
  role: 'admin' | 'resident';
  firstName: string;
  lastName: string;
};