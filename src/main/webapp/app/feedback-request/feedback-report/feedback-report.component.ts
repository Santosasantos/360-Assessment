import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import  ApexCharts from 'apexcharts';
import {SkeletonModule} from 'primeng/skeleton';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { FeedbackSubTypeService, EntityArrayResponseType } from '../../entities/feedback-sub-type/service/feedback-sub-type.service';
import { FeedbackTypeService } from '../../entities/feedback-type/service/feedback-type.service';
import { FeedbackDetailsService } from '../../entities/feedback-details/service/feedback-details.service';
import { EmployeeService } from '../../entities/employee/service/employee.service';
import { YearService } from '../../entities/year/service/year.service';
import { SortService, sortStateSignal } from '../../shared/sort';

import { IFeedbackSubType } from '../../entities/feedback-sub-type/feedback-sub-type.model';
import { IFeedbackType } from '../../entities/feedback-type/feedback-type.model';
import { IEmployee } from '../../entities/employee/employee.model';
import { IYear } from '../../entities/year/year.model';
import { FeedbackService } from '../../entities/feedback/service/feedback.service';
import { FeedbackReportService } from './report-service/feedback-report.service';

@Component({
  selector: 'jhi-feedback-report',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, NgbModule, NgApexchartsModule, SkeletonModule],
  templateUrl: './feedback-report.component.html',
  styleUrls: ['./feedback-report.component.scss']
})
export class FeedbackReportComponent implements OnInit, AfterViewInit {
  @ViewChild('chartContainer', { static: false }) chartContainer: ElementRef;
  @ViewChild('feedbackyearchart', { static: true }) feedbackyearchart: ElementRef;

  selectedyear: number |null = null;
  employee = signal<any | null>(null);
  yearsSharedCollection: IYear[] = [];

  feedbackTypesSharedCollection: IFeedbackType[] = [];
  feedbackSubTypes?: IFeedbackSubType[];
  feedbacklistMap: { [key: number]: IFeedbackSubType[] } = {};
  feedbackratingsforothers: number[] = [];
  feedbackratinsforself: number[] = [];
  availableYears: number[] = [];
  isLoading = false;
  hasRatings = false;

  sortState = sortStateSignal({});

  constructor(
    protected employeeService: EmployeeService,
    protected yearService: YearService,
    protected feedbackService: FeedbackService,
    protected feedbackReportService: FeedbackReportService,
    protected feedbackSubTypeService: FeedbackSubTypeService,
    protected feedbackTypeService: FeedbackTypeService,
    protected sortService: SortService
  ) {}

  ngOnInit(): void {
    this.loadAvailableYears();
    const currentYear = new Date().getFullYear();
    this.selectedyear = currentYear;
    this.load();
    this.yearchartrender();
  }
  ngAfterViewInit() {
    if (this.hasRatings && this.feedbackratinsforself.length && this.feedbackratingsforothers.length) {
      setTimeout(() => {
        this.renderChart();
      }, 0);
    }

  }

  load(): void {
    this.isLoading = true;
    this.hasRatings = false;
    this.queryBackend().subscribe({
      next: (res: EntityArrayResponseType) => {
        this.onResponseSuccess(res);
        this.getRatings(this.selectedyear!);
      },
    });

    // this.feedbackService.findAllByResponder('6305',this.selectedyear!).subscribe(res => {
    //
    // });


    this.feedbackTypeService.query().subscribe(res => {
      this.feedbackTypesSharedCollection = res.body ?? [];
    });

    this.feedbackReportService.findByPin('6305').subscribe(employee => {
      this.employee.set(employee);
    });

    this.yearService.query().subscribe(res => {
      this.yearsSharedCollection = res.body ?? [];
    });
  }
//method for loading available years
  loadAvailableYears(): void {
    const currentYear = new Date().getFullYear();
    this.availableYears = Array.from({length: 10}, (_, i) => currentYear - i);
  }
///method for handling year change
  onYearChange(): void {
    this.isLoading = true;
    this.hasRatings = false;
    this.getRatings(this.selectedyear!);
  }

  getRatings(yearname: number): void{
    this.feedbackratingsforothers = [];
    this.feedbackratinsforself = [];
    const promises: Promise<void>[] = [];

    this.feedbackSubTypes?.forEach(feedbacksub => {
      const feedbacksubname = feedbacksub.feedbacksubname!;

      const othersPromise = this.feedbackReportService.fetchRatingfromOthers('6305', feedbacksubname, yearname)
        .pipe(catchError(() => of(0)))
        .toPromise()
        .then(rating => {
          this.feedbackratingsforothers.push(rating as number);
        });

      const selfPromise = this.feedbackReportService.fetchRatingforSelf('6305', feedbacksubname, yearname)
        .pipe(catchError(() => of(0)))
        .toPromise()
        .then(rating => {
          this.feedbackratinsforself.push(rating as number);
        });

      promises.push(othersPromise as Promise<void>, selfPromise as Promise<void>);
    });

    Promise.all(promises).then(() => {
      this.hasRatings = this.checkForRatings();
      this.isLoading = false;
      if (this.hasRatings) {
        setTimeout(() => {
          this.renderChart();
        }, 0);
      }
    });
  }

  checkForRatings(): boolean {
    return this.feedbackratingsforothers.some(rating => rating > 0) &&
      this.feedbackratinsforself.some(rating => rating > 0);
  }

  renderChart(): void {
    if (this.chartContainer && this.feedbackSubTypes) {
      this.chartContainer.nativeElement.innerHTML = '';

      const averageRatings = this.calculateAverageRatings();

      const chart = new ApexCharts(this.chartContainer.nativeElement, {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: "12px",
            colors: ["#0c0c0c"]
          }
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        series: [{
          name: 'Self Ratings',
          data: averageRatings.map(r => r.selfAvg)
        }, {
          name: 'Others Ratings',
          data: averageRatings.map(r => r.othersAvg)
        }],
        xaxis: {
          categories: averageRatings.map(r => r.feedbackTypeName),
        },
        yaxis: {
          title: {
            text: 'Average Rating'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val.toFixed(2)
            }
          }
        },
        colors: ['#44c5cc', '#d881bc']
      });



      chart.render();
      console.log('Chart rendered with average ratings', averageRatings);
    }
    else {
      console.error('Chart container or feedback subtypes not available');
    }
  }

  yearchartrender(): void {
    // this.feedbackyearchart.nativeElement.innerHTML = '';
      const chart1 = new ApexCharts(this.feedbackyearchart.nativeElement, {
        chart: {
          id: 'yearChart',
          type: 'line',
          height: 350
        },
        series: [{
          name: 'Feedback Scores',
          data: [4, 3, 4, 4, 3, 4, 2, 4, 3, 4, 3, 3]
        },
        ],
        xaxis: {
          title: {
            text: 'Years'
          },
          categories: ['2024','2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013']
        },
        yaxis: {
          title: {
            text: 'Feedback Rating Scores(1-4)'
          }
        },
        title: {
          text: 'Feedback Rating History Over 12 years',
          align: 'top',
        },
        fill: {
          opacity: 1
        },
        colors: ['#44c5cc']
      });
      chart1.render();
  }

  protected onResponseSuccess(response: EntityArrayResponseType): void {
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.feedbackSubTypes = this.refineData(dataFromBody);

    this.feedbacklistMap = {};
    this.feedbackSubTypes.forEach(feedbackSubType => {
      const typeId = feedbackSubType.feedbacktypes?.id;
      if (typeId) {
        if (!this.feedbacklistMap[typeId]) {
          this.feedbacklistMap[typeId] = [];
        }
        this.feedbacklistMap[typeId].push(feedbackSubType);
      }
    });
  }

  protected refineData(data: IFeedbackSubType[]): IFeedbackSubType[] {
    const { predicate, order } = this.sortState();
    return predicate && order ? data.sort(this.sortService.startSort({ predicate, order })) : data;
  }

  protected fillComponentAttributesFromResponseBody(data: IFeedbackSubType[] | null): IFeedbackSubType[] {
    return data ?? [];
  }

  protected queryBackend(): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const queryObject: any = {
      eagerload: true,
      sort: this.sortService.buildSortParam(this.sortState()),
    };
    return this.feedbackSubTypeService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
  }

  getRating(ratings: number[], feedbackTypeIndex: number, subtypeIndex: number): number {
    const startIndex = this.feedbackTypesSharedCollection.slice(0, feedbackTypeIndex)
      .reduce((sum, feedbackType) => sum + (this.feedbacklistMap[feedbackType.id]?.length || 0), 0);
    return ratings[startIndex + subtypeIndex] || 0;
  }
  calculateAverageRatings(): { feedbackTypeName: string; selfAvg: number; othersAvg: number }[] {
    const averageRatings: { feedbackTypeName: string; selfAvg: number; othersAvg: number }[] = [];

    this.feedbackTypesSharedCollection.forEach((feedbackType, index) => {
      const subtypes = this.feedbacklistMap[feedbackType.id] || [];
      let selfSum = 0;
      let othersSum = 0;
      let count = 0;

      subtypes.forEach((_, subtypeIndex) => {
        const selfRating = this.getRating(this.feedbackratinsforself, index, subtypeIndex);
        const othersRating = this.getRating(this.feedbackratingsforothers, index, subtypeIndex);

        if (selfRating > 0 || othersRating > 0) {
          selfSum += selfRating;
          othersSum += othersRating;
          count++;
        }
      });

      if (count > 0) {
        averageRatings.push({
          feedbackTypeName: feedbackType.feedbackname!,
          selfAvg: parseFloat((selfSum / count).toFixed(2)),
          othersAvg: parseFloat((othersSum / count).toFixed(2))
        });
      }
    });

    return averageRatings;
  }

  protected readonly Date = Date;
}
