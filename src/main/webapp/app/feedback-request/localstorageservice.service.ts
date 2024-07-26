import { Injectable, inject } from '@angular/core';
import { ApplicationConfigService } from '../core/config/application-config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageserviceService {
  protected applicationConfigService = inject(ApplicationConfigService);

  protected apiUrl = this.applicationConfigService.getEndpointFor('api/drafts');
  // private apiUrl = 'http://localhost:8080/api/drafts'; // Adjust this URL as needed

  constructor(private http: HttpClient) {}

  saveDraft(feedbackId: number, draftData: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${feedbackId}`, draftData);
  }

  getDraft(feedbackId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${feedbackId}`);
  }

  deleteDraft(feedbackId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${feedbackId}`);
  }
}
