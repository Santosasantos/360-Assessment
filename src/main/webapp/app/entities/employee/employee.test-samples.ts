import dayjs from 'dayjs/esm';

import { IEmployee, NewEmployee } from './employee.model';

export const sampleWithRequiredData: IEmployee = {
  id: 20513,
  firstname: 'aha fervently',
  lastname: 'for worth regarding',
  pin: 'defin',
  employeeCategory: 'CONTRACT',
  jobStatus: 'INACTIVE',
  employeeStatus: 'NONCONFIRM',
  gender: 'OTHER',
};

export const sampleWithPartialData: IEmployee = {
  id: 2183,
  firstname: 'yuck grassland poise',
  lastname: 'heliumXXXX',
  pin: 'pip a',
  project: 'finally confide',
  employeeCategory: 'CONTRACT',
  designation: 'barn ferociously',
  currentOffice: 'ouch blissful headrest',
  jobStatus: 'ACTIVE',
  employeeStatus: 'CONFIRM',
  dateOfBirth: dayjs('2024-06-23'),
  gender: 'OTHER',
  email: 'Woodrow_Rau@yahoo.com',
  grade: 22447,
};

export const sampleWithFullData: IEmployee = {
  id: 28508,
  firstname: 'boo french',
  lastname: 'layer around',
  pin: 'uneth',
  project: 'catastrophe careful',
  employeeCategory: 'CONTRACT',
  designation: 'lest',
  functionalDesignation: 'tendency',
  joiningDate: dayjs('2024-06-23T12:11'),
  currentOffice: 'whoever',
  jobStatus: 'ACTIVE',
  employeeStatus: 'NONCONFIRM',
  dateOfBirth: dayjs('2024-06-22'),
  gender: 'FEMALE',
  mobile: 'well',
  email: 'Garrick_Batz@hotmail.com',
  grade: 4218,
  profile: '../fake-data/blob/hipster.png',
  profileContentType: 'unknown',
};

export const sampleWithNewData: NewEmployee = {
  firstname: 'so exceptX',
  lastname: 'aforeXXXXX',
  pin: 'unfol',
  employeeCategory: 'CONTRACT',
  jobStatus: 'ACTIVE',
  employeeStatus: 'CONFIRM',
  gender: 'FEMALE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
