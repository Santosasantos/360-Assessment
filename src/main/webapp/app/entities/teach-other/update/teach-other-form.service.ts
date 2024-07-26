import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITeachOther, NewTeachOther } from '../teach-other.model';
import { IFeedback } from '../../feedback/feedback.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITeachOther for edit and NewTeachOtherFormGroupInput for create.
 */
type TeachOtherFormGroupInput = ITeachOther | PartialWithRequiredKeyOf<NewTeachOther>;

type TeachOtherFormDefaults = Pick<NewTeachOther, 'id'>;

type TeachOtherFormGroupContent = {
  id: FormControl<ITeachOther['id'] | NewTeachOther['id']>;
  technicalSkill: FormControl<ITeachOther['technicalSkill']>;
  recommendation: FormControl<ITeachOther['recommendation']>;
  particularStrengh: FormControl<ITeachOther['particularStrengh']>;
  whynotRecommend: FormControl<ITeachOther['whynotRecommend']>;
  teachother: FormControl<ITeachOther['teachother']>;
};

export type TeachOtherFormGroup = FormGroup<TeachOtherFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TeachOtherFormService {
  createTeachOtherFormGroup(teachOther: TeachOtherFormGroupInput = { id: null }): TeachOtherFormGroup {
    const teachOtherRawValue = {
      ...this.getFormDefaults(),
      ...teachOther,
    };
    return new FormGroup<TeachOtherFormGroupContent>({
      id: new FormControl(
        { value: teachOtherRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      technicalSkill: new FormControl(teachOtherRawValue.technicalSkill, {
        validators: [Validators.required],
      }),
      recommendation: new FormControl(teachOtherRawValue.recommendation, {
        validators: [Validators.required],
      }),
      particularStrengh: new FormControl(teachOtherRawValue.particularStrengh),
      whynotRecommend: new FormControl(teachOtherRawValue.whynotRecommend),
      teachother: new FormControl(teachOtherRawValue.teachother),
    });
  }

  getTeachOther(form: TeachOtherFormGroup): ITeachOther | NewTeachOther {
    return form.getRawValue() as ITeachOther | NewTeachOther;
  }
  transformToNewTechOther(form: FormGroup, feedback: IFeedback): NewTeachOther {
    console.log('feedback in transformToNewTechOther', feedback);
    const teachOther = this.getTeachOther(form) as ITeachOther | NewTeachOther;
    return {
      id: null,
      technicalSkill: teachOther.technicalSkill,
      recommendation: teachOther.recommendation,
      particularStrengh: teachOther.particularStrengh,
      whynotRecommend: teachOther.whynotRecommend,
      teachother: feedback, // Attach the teachother value
    };
  }

  resetForm(form: TeachOtherFormGroup, teachOther: TeachOtherFormGroupInput, feedback: IFeedback): void {
    console.log('feedback in resetForm', feedback);
    const teachOtherRawValue = { ...this.getFormDefaults(), ...teachOther, teachother: feedback };
    form.reset(
      {
        ...teachOtherRawValue,
        id: { value: teachOtherRawValue.id, disabled: true },
      } as any,
    );
  }

  private getFormDefaults(): TeachOtherFormDefaults {
    return {
      id: null,
    };
  }
}
