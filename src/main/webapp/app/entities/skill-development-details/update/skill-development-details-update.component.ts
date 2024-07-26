import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IFeedback } from 'app/entities/feedback/feedback.model';
import { FeedbackService } from 'app/entities/feedback/service/feedback.service';
import { ISkillDevelopmentType } from 'app/entities/skill-development-type/skill-development-type.model';
import { SkillDevelopmentTypeService } from 'app/entities/skill-development-type/service/skill-development-type.service';
import { SkillDevelopmentDetailsService } from '../service/skill-development-details.service';
import { ISkillDevelopmentDetails } from '../skill-development-details.model';
import { SkillDevelopmentDetailsFormService, SkillDevelopmentDetailsFormGroup } from './skill-development-details-form.service';

@Component({
  standalone: true,
  selector: 'jhi-skill-development-details-update',
  templateUrl: './skill-development-details-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class SkillDevelopmentDetailsUpdateComponent implements OnInit {
  isSaving = false;
  skillDevelopmentDetails: ISkillDevelopmentDetails | null = null;

  feedbacksSharedCollection: IFeedback[] = [];
  skillDevelopmentTypesSharedCollection: ISkillDevelopmentType[] = [];

  protected skillDevelopmentDetailsService = inject(SkillDevelopmentDetailsService);
  protected skillDevelopmentDetailsFormService = inject(SkillDevelopmentDetailsFormService);
  protected feedbackService = inject(FeedbackService);
  protected skillDevelopmentTypeService = inject(SkillDevelopmentTypeService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: SkillDevelopmentDetailsFormGroup = this.skillDevelopmentDetailsFormService.createSkillDevelopmentDetailsFormGroup();

  compareFeedback = (o1: IFeedback | null, o2: IFeedback | null): boolean => this.feedbackService.compareFeedback(o1, o2);

  compareSkillDevelopmentType = (o1: ISkillDevelopmentType | null, o2: ISkillDevelopmentType | null): boolean =>
    this.skillDevelopmentTypeService.compareSkillDevelopmentType(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ skillDevelopmentDetails }) => {
      this.skillDevelopmentDetails = skillDevelopmentDetails;
      if (skillDevelopmentDetails) {
        this.updateForm(skillDevelopmentDetails);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const skillDevelopmentDetails = this.skillDevelopmentDetailsFormService.getSkillDevelopmentDetails(this.editForm);
    if (skillDevelopmentDetails.id !== null) {
      this.subscribeToSaveResponse(this.skillDevelopmentDetailsService.update(skillDevelopmentDetails));
    } else {
      this.subscribeToSaveResponse(this.skillDevelopmentDetailsService.create(skillDevelopmentDetails));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISkillDevelopmentDetails>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(skillDevelopmentDetails: ISkillDevelopmentDetails): void {
    this.skillDevelopmentDetails = skillDevelopmentDetails;
    this.skillDevelopmentDetailsFormService.resetForm(this.editForm, skillDevelopmentDetails);

    this.feedbacksSharedCollection = this.feedbackService.addFeedbackToCollectionIfMissing<IFeedback>(
      this.feedbacksSharedCollection,
      skillDevelopmentDetails.skilldevelopment,
    );
    this.skillDevelopmentTypesSharedCollection =
      this.skillDevelopmentTypeService.addSkillDevelopmentTypeToCollectionIfMissing<ISkillDevelopmentType>(
        this.skillDevelopmentTypesSharedCollection,
        skillDevelopmentDetails.skilldevelopmenttypes,
      );
  }

  protected loadRelationshipsOptions(): void {
    this.feedbackService
      .query()
      .pipe(map((res: HttpResponse<IFeedback[]>) => res.body ?? []))
      .pipe(
        map((feedbacks: IFeedback[]) =>
          this.feedbackService.addFeedbackToCollectionIfMissing<IFeedback>(feedbacks, this.skillDevelopmentDetails?.skilldevelopment),
        ),
      )
      .subscribe((feedbacks: IFeedback[]) => (this.feedbacksSharedCollection = feedbacks));

    this.skillDevelopmentTypeService
      .query()
      .pipe(map((res: HttpResponse<ISkillDevelopmentType[]>) => res.body ?? []))
      .pipe(
        map((skillDevelopmentTypes: ISkillDevelopmentType[]) =>
          this.skillDevelopmentTypeService.addSkillDevelopmentTypeToCollectionIfMissing<ISkillDevelopmentType>(
            skillDevelopmentTypes,
            this.skillDevelopmentDetails?.skilldevelopmenttypes,
          ),
        ),
      )
      .subscribe((skillDevelopmentTypes: ISkillDevelopmentType[]) => (this.skillDevelopmentTypesSharedCollection = skillDevelopmentTypes));
  }
}
