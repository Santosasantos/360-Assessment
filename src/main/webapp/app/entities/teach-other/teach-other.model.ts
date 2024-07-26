import { IFeedback } from 'app/entities/feedback/feedback.model';
import { RecommendationValue } from 'app/entities/enumerations/recommendation-value.model';

export interface ITeachOther {
  id: number;
  technicalSkill?: string | null;
  recommendation?: keyof typeof RecommendationValue | null;
  particularStrengh?: string | null;
  whynotRecommend?: string | null;
  teachother?: IFeedback | null;
}

export type NewTeachOther = Omit<ITeachOther, 'id'> & { id: null };
