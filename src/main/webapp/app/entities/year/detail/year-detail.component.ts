import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IYear } from '../year.model';

@Component({
  standalone: true,
  selector: 'jhi-year-detail',
  templateUrl: './year-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class YearDetailComponent {
  year = input<IYear | null>(null);

  previousState(): void {
    window.history.back();
  }
}
