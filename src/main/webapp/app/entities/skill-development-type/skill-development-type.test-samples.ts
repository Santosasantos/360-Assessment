import { ISkillDevelopmentType, NewSkillDevelopmentType } from './skill-development-type.model';

export const sampleWithRequiredData: ISkillDevelopmentType = {
  id: 7121,
  skilldevelopmentname: 'glom overjoyed',
};

export const sampleWithPartialData: ISkillDevelopmentType = {
  id: 30404,
  skilldevelopmentname: 'covet',
};

export const sampleWithFullData: ISkillDevelopmentType = {
  id: 9605,
  skilldevelopmentname: 'hence tenderly',
};

export const sampleWithNewData: NewSkillDevelopmentType = {
  skilldevelopmentname: 'freely easy-going drum',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
