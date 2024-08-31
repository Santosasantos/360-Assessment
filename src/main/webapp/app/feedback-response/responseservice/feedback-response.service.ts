import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IFeedback } from '../../entities/feedback/feedback.model';
import { ApplicationConfigService } from '../../core/config/application-config.service';
import { Observable } from 'rxjs';
export type EntityArrayResponseType = HttpResponse<IFeedback[]>;
@Injectable({
  providedIn: 'root'
})
export class FeedbackResponseService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrlforFeedback = this.applicationConfigService.getEndpointFor('api/feedbacks');

  findAllByResponder(pin: string, year: number): Observable<EntityArrayResponseType> {
    return this.http
      .get<EntityArrayResponseType>(`${this.resourceUrlforFeedback}/responders/${pin}/${year}`);
  }

}
