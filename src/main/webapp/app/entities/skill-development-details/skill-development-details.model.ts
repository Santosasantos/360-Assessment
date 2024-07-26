import { IFeedback } from 'app/entities/feedback/feedback.model';
import { ISkillDevelopmentType } from 'app/entities/skill-development-type/skill-development-type.model';

export interface ISkillDevelopmentDetails {
  id: number;
  skilldevelopment?: IFeedback | null;
  skilldevelopmenttypes?: ISkillDevelopmentType | null;
}

export type NewSkillDevelopmentDetails = Omit<ISkillDevelopmentDetails, 'id'> & { id: null };
