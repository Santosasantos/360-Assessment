import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IFeedback } from 'app/entities/feedback/feedback.model';
import { FeedbackService } from 'app/entities/feedback/service/feedback.service';
import { RecommendationValue } from 'app/entities/enumerations/recommendation-value.model';
import { TeachOtherService } from '../service/teach-other.service';
import { ITeachOther } from '../teach-other.model';
import { TeachOtherFormService, TeachOtherFormGroup } from './teach-other-form.service';

@Component({
  standalone: true,
  selector: 'jhi-teach-other-update',
  templateUrl: './teach-other-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TeachOtherUpdateComponent implements OnInit {
  isSaving = false;
  teachOther: ITeachOther | null = null;
  recommendationValueValues = Object.keys(RecommendationValue);

  feedbacksSharedCollection: IFeedback[] = [];

  protected teachOtherService = inject(TeachOtherService);
  protected teachOtherFormService = inject(TeachOtherFormService);
  protected feedbackService = inject(FeedbackService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TeachOtherFormGroup = this.teachOtherFormService.createTeachOtherFormGroup();

  compareFeedback = (o1: IFeedback | null, o2: IFeedback | null): boolean => this.feedbackService.compareFeedback(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ teachOther }) => {
      this.teachOther = teachOther;
      if (teachOther) {
        // this.updateForm(teachOther);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const teachOther = this.teachOtherFormService.getTeachOther(this.editForm);
    if (teachOther.id !== null) {
      this.subscribeToSaveResponse(this.teachOtherService.update(teachOther));
    } else {
      this.subscribeToSaveResponse(this.teachOtherService.create(teachOther));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITeachOther>>): void {
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

  // protected updateForm(teachOther: ITeachOther): void {
  //   this.teachOther = teachOther;
  //   this.teachOtherFormService.resetForm(this.editForm, teachOther);
  //
  //   this.feedbacksSharedCollection = this.feedbackService.addFeedbackToCollectionIfMissing<IFeedback>(
  //     this.feedbacksSharedCollection,
  //     teachOther.teachother,
  //   );
  // }

  protected loadRelationshipsOptions(): void {
    this.feedbackService
      .query()
      .pipe(map((res: HttpResponse<IFeedback[]>) => res.body ?? []))
      .pipe(
        map((feedbacks: IFeedback[]) =>
          this.feedbackService.addFeedbackToCollectionIfMissing<IFeedback>(feedbacks, this.teachOther?.teachother),
        ),
      )
      .subscribe((feedbacks: IFeedback[]) => (this.feedbacksSharedCollection = feedbacks));
  }
}
