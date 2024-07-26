import { IFeedbackSubType } from '../entities/feedback-sub-type/feedback-sub-type.model';
import { IRating } from '../entities/rating/rating.model';
import { ISkillDevelopmentType } from '../entities/skill-development-type/skill-development-type.model';
import { RecommendationValue } from '../entities/enumerations/recommendation-value.model';

export interface Draft {
  feedbackForm: Array<{
    feedbackdetails: number | null;
    feedbacksubtypes: IFeedbackSubType | null;
    commentsforfeedbacksubtype: string;
    ratings: IRating | null;
  }>;
  skilldevelopmentForm: {
    skilldevelopmentdetails: number | null;
    selectedSkills: ISkillDevelopmentType[];
  };
  teachOtherForm: {
    technicalSkill: string | null;
    recommendation: keyof typeof RecommendationValue | null;
    particularStrengh: string | null;
    whynotRecommend: string | null;
    teachOther: number | null;

  };
}
