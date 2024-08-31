import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISkillDevelopmentDetails, NewSkillDevelopmentDetails } from '../skill-development-details.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISkillDevelopmentDetails for edit and NewSkillDevelopmentDetailsFormGroupInput for create.
 */
type SkillDevelopmentDetailsFormGroupInput = ISkillDevelopmentDetails | PartialWithRequiredKeyOf<NewSkillDevelopmentDetails>;

type SkillDevelopmentDetailsFormDefaults = Pick<NewSkillDevelopmentDetails, 'id'>;

type SkillDevelopmentDetailsFormGroupContent = {
  id: FormControl<ISkillDevelopmentDetails['id'] | NewSkillDevelopmentDetails['id']>;
  skilldevelopment: FormControl<ISkillDevelopmentDetails['skilldevelopment']>;
  skilldevelopmenttypes: FormControl<ISkillDevelopmentDetails['skilldevelopmenttypes']>;
};

export type SkillDevelopmentDetailsFormGroup = FormGroup<SkillDevelopmentDetailsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SkillDevelopmentDetailsFormService {
  createSkillDevelopmentDetailsFormGroup(
    skillDevelopmentDetails: SkillDevelopmentDetailsFormGroupInput = { id: null },
  ): SkillDevelopmentDetailsFormGroup {
    const skillDevelopmentDetailsRawValue = {
      ...this.getFormDefaults(),
      ...skillDevelopmentDetails,
    };
    return new FormGroup<SkillDevelopmentDetailsFormGroupContent>({
      id: new FormControl(
        { value: skillDevelopmentDetailsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      skilldevelopment: new FormControl(skillDevelopmentDetailsRawValue.skilldevelopment),
      skilldevelopmenttypes: new FormControl(skillDevelopmentDetailsRawValue.skilldevelopmenttypes),
    });
  }

  getSkillDevelopmentDetails(form: SkillDevelopmentDetailsFormGroup): ISkillDevelopmentDetails | NewSkillDevelopmentDetails {
    return form.getRawValue() as ISkillDevelopmentDetails | NewSkillDevelopmentDetails;
  }

  transformToNewSkillDevelopmentDetails(skiiltypes:any, feedback: any): NewSkillDevelopmentDetails {
    // const skillDevelopmentDetails = this.getSkillDevelopmentDetails(form) as ISkillDevelopmentDetails | NewSkillDevelopmentDetails;
    return {
      id: null,
      skilldevelopment: feedback,
      skilldevelopmenttypes: skiiltypes,
    };
  }

  resetForm(form: SkillDevelopmentDetailsFormGroup, skillDevelopmentDetails: SkillDevelopmentDetailsFormGroupInput): void {
    const skillDevelopmentDetailsRawValue = { ...this.getFormDefaults(), ...skillDevelopmentDetails };
    form.reset(
      {
        ...skillDevelopmentDetailsRawValue,
        id: { value: skillDevelopmentDetailsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): SkillDevelopmentDetailsFormDefaults {
    return {
      id: null,
    };
  }
}
