import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IFeedbackDetails } from '../feedback-details.model';
import { FeedbackDetailsService } from '../service/feedback-details.service';

@Component({
  standalone: true,
  templateUrl: './feedback-details-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class FeedbackDetailsDeleteDialogComponent {
  feedbackDetails?: IFeedbackDetails;

  protected feedbackDetailsService = inject(FeedbackDetailsService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.feedbackDetailsService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
