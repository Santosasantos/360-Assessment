import { IAuthority, NewAuthority } from './authority.model';

export const sampleWithRequiredData: IAuthority = {
  name: 'bc5510bc-34e5-4910-b5d9-05bf34092043',
};

export const sampleWithPartialData: IAuthority = {
  name: '3c28ae1b-17b5-4a05-b5f3-da580d2db08c',
};

export const sampleWithFullData: IAuthority = {
  name: 'f924d27c-86ad-4006-a89d-a2a5b2e15966',
};

export const sampleWithNewData: NewAuthority = {
  name: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
