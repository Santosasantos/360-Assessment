import { IYear, NewYear } from './year.model';

export const sampleWithRequiredData: IYear = {
  id: 9372,
  year: 27381,
};

export const sampleWithPartialData: IYear = {
  id: 1544,
  year: 8414,
};

export const sampleWithFullData: IYear = {
  id: 10116,
  year: 24501,
};

export const sampleWithNewData: NewYear = {
  year: 23206,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
