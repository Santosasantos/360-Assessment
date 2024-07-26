import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { debounceTime, of, Subject, tap } from 'rxjs';
import { catchError, distinctUntilChanged, filter, switchMap, takeUntil } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { IEmployee } from '../entities/employee/employee.model';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../entities/employee/service/employee.service';
import { HttpResponse } from '@angular/common/http';
import { FeedbackReportService } from '../feedback-request/feedback-report/report-service/feedback-report.service';
import { DataUtils } from '../core/util/data-util.service';
import { RatingService } from '../entities/rating/service/rating.service';

@Component({
  standalone: true,
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [SharedModule, RouterModule,FormsModule, ReactiveFormsModule],
})
export default class HomeComponent implements OnInit, OnDestroy {

  account = signal<Account | null>(null);
  employee= signal<any>(null);
  rating = 1;
  // employee: IEmployee | null = null;
  showLoggedMessage = false;
  showErrorMessage=false;
  errorMessage: string | null = null;

  private readonly destroy$ = new Subject<void>();
  private searchTerms = new Subject<string>();
  protected dataUtils = inject(DataUtils);
  private accountService = inject(AccountService);
  private router = inject(Router);
  private feedbackReportService = inject(FeedbackReportService);
  private ratingService = inject(RatingService);

  ngOnInit(): void {
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => {this.account.set(account)
        if(account){
          this.showLoggedMessage = true;
          setTimeout(()=>{
            this.showLoggedMessage = false;
          }, 3000)
        }
      });

    this.searchTerms.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(term => term?this.feedbackReportService.findByPin(term).pipe(
        catchError(err => {
          this.showErrorMessage=true;
          this.errorMessage='Employee Not Found';
          setTimeout(()=>{
            this.showErrorMessage=false;
          }, 5000);
          return of(null);
        })
      ): of(null)),
      tap(()=> {
        this.errorMessage=null;
      })
    ).subscribe(s =>{
      this.employee.set(s)

      // this.employee=employee;
    });
    this.ratingService.findbyratingvalue(this.rating).subscribe({
      next: (ratings) => {
        console.log(ratings);
      },
      error: (error) => {
        console.error('Error loading data:', error);
      }
    });

  }

  searchOne(pin: string): void{
    this.searchTerms.next(pin!);
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  onSearch(event: Event):void {
    const target = event.target as HTMLInputElement;
    this.searchTerms.next(target.value);
    console.log(this.employee());

  }
  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }



  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
