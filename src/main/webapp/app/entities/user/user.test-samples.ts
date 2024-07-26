import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 25424,
  login: 'OU1IC',
};

export const sampleWithPartialData: IUser = {
  id: 23301,
  login: 'd-Y3v@fH\\_Gb',
};

export const sampleWithFullData: IUser = {
  id: 4317,
  login: 'up',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
