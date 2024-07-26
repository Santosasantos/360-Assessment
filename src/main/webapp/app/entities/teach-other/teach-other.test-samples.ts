import { ITeachOther, NewTeachOther } from './teach-other.model';

export const sampleWithRequiredData: ITeachOther = {
  id: 21074,
  technicalSkill: 'ha intently',
  recommendation: 'Yes',
};

export const sampleWithPartialData: ITeachOther = {
  id: 20468,
  technicalSkill: 'given',
  recommendation: 'No',
  whynotRecommend: 'thwack grand',
};

export const sampleWithFullData: ITeachOther = {
  id: 15570,
  technicalSkill: 'ick lark daintily',
  recommendation: 'No',
  particularStrengh: 'normalisation',
  whynotRecommend: 'consequently',
};

export const sampleWithNewData: NewTeachOther = {
  technicalSkill: 'upward generation',
  recommendation: 'Yes',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
