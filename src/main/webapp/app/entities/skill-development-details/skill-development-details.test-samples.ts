import { ISkillDevelopmentDetails, NewSkillDevelopmentDetails } from './skill-development-details.model';

export const sampleWithRequiredData: ISkillDevelopmentDetails = {
  id: 30604,
};

export const sampleWithPartialData: ISkillDevelopmentDetails = {
  id: 8450,
};

export const sampleWithFullData: ISkillDevelopmentDetails = {
  id: 5184,
};

export const sampleWithNewData: NewSkillDevelopmentDetails = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
