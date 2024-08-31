import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IRating } from '../rating.model';

@Component({
  standalone: true,
  selector: 'jhi-rating-detail',
  templateUrl: './rating-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class RatingDetailComponent {
  rating = input<IRating | null>(null);

  previousState(): void {
    window.history.back();
  }
}
