import { Component, inject } from '@angular/core';
import { IFeedback } from '../../../entities/feedback/feedback.model';
import { FeedbackRequestStatus } from '../../../entities/enumerations/feedback-request-status.model';
import { IEmployee } from '../../../entities/employee/employee.model';
import { IYear } from '../../../entities/year/year.model';
import { FeedbackService } from '../../../entities/feedback/service/feedback.service';
import { FeedbackFormGroup, FeedbackFormService } from '../../../entities/feedback/update/feedback-form.service';
import { EmployeeService } from '../../../entities/employee/service/employee.service';
import { YearService } from '../../../entities/year/service/year.service';
import { Observable, finalize, map } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'jhi-feedback-request-form',
  standalone: true,
  imports: [StepperModule,
    ButtonModule,
    InputTextModule,
    ToggleButtonModule,
    IconFieldModule,
    InputIconModule,
    CommonModule, FormsModule, PasswordModule],
  templateUrl: './feedback-request-form.component.html',
  styleUrl: './feedback-request-form.component.scss'
})
export class FeedbackRequestFormComponent {

}
