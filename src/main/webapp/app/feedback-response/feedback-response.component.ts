import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { IFeedback } from '../entities/feedback/feedback.model';
import { EMPTY, of, Subject, Subscription } from 'rxjs';
import { FeedbackService } from '../entities/feedback/service/feedback.service';
import { catchError } from 'rxjs/operators';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { RefreshService } from './RefreshService';
import { FeedbackResponseService } from './responseservice/feedback-response.service';

@Component({
  selector: 'jhi-feedback-response',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feedback-response.component.html',
  styleUrl: './feedback-response.component.scss'
})
export class FeedbackResponseComponent implements OnInit, OnDestroy {
   private Refreshsubscription: Subscription;
   responders: string = '6305';
   year: number = 2024;

  feedbackRequesters = signal<any>([]);
  private searchTerms = new Subject<string>();
  errorMessage: string | null = null;
  protected showErrorMessage=false;
  private router = inject(Router);
  //Service
  protected feedbackService = inject(FeedbackService);
  protected feedbackResponseService = inject(FeedbackResponseService);
  constructor(private refreshService: RefreshService) {}
  ngOnInit(): void {
    this.Refreshsubscription = this.refreshService.refresh$.subscribe(() => {
      this.loadData();
    }
    );

    this.loadData();
    console.log(this.Refreshsubscription);
  }

  loadData() {
    this.feedbackResponseService.findAllByResponder(this.responders,this.year).pipe(
      catchError(error => {
          this.showErrorMessage = true;
          this.errorMessage = "No Feedback Request for you";
          return of([]);
        }
      )
    )
      .subscribe(feedbackrequest =>{
        this.feedbackRequesters.set(feedbackrequest);
      });
  }

  showInfo() {
    console.log(this.feedbackRequesters());
  }

  provideResponse(id: number) {
    this.router.navigateByUrl(`/feedback-request/${id}`);

  }

  ngOnDestroy(): void {
   if(this.Refreshsubscription){
     this.Refreshsubscription.unsubscribe();
   }
  }
}
