import { Component, ElementRef, HostListener, inject, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { forkJoin, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { CommonModule } from '@angular/common';

// PrimeNG imports
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { StepperModule } from 'primeng/stepper';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ChipModule } from 'primeng/chip';
import { SkeletonModule } from 'primeng/skeleton';

// Service imports
import { FeedbackDetailsFormService } from '../entities/feedback-details/update/feedback-details-form.service';
import { FeedbackDetailsService } from '../entities/feedback-details/service/feedback-details.service';
import { FeedbackService } from '../entities/feedback/service/feedback.service';
import { FeedbackSubTypeService } from '../entities/feedback-sub-type/service/feedback-sub-type.service';
import { RatingService } from '../entities/rating/service/rating.service';
import { SkillDevelopmentTypeService } from '../entities/skill-development-type/service/skill-development-type.service';
import { SkillDevelopmentDetailsFormService } from '../entities/skill-development-details/update/skill-development-details-form.service';
import { SkillDevelopmentDetailsService } from '../entities/skill-development-details/service/skill-development-details.service';

import { TeachOtherFormGroup, TeachOtherFormService } from '../entities/teach-other/update/teach-other-form.service';
import { TeachOtherService } from '../entities/teach-other/service/teach-other.service';
import { LocalstorageserviceService } from './localstorageservice.service';

// Model imports
import { IFeedback } from '../entities/feedback/feedback.model';
import { IFeedbackSubType } from '../entities/feedback-sub-type/feedback-sub-type.model';
import { IRating } from '../entities/rating/rating.model';
import { ISkillDevelopmentType } from '../entities/skill-development-type/skill-development-type.model';

import { Draft } from './draft.model';
import { FeedbackStatus } from './FeedbackStatus';
import { IconField, IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password';
import { RecommendationValue } from '../entities/enumerations/recommendation-value.model';
import { ITeachOther, NewTeachOther } from '../entities/teach-other/teach-other.model';
import { DataUtils } from '../core/util/data-util.service';


@Component({
  selector: 'jhi-feedback-request',
  templateUrl: './feedback-request.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    StepsModule,
    CardModule,
    RatingModule,
    MultiSelectModule,
    ButtonModule,
    InputTextareaModule,
    StepperModule,
    ToggleButtonModule,
    DropdownModule,
    InputTextModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    ChipModule,
    SkeletonModule,
  ],
  styles: [
    `.p-stepper {
            flex-basis: 40rem;
        }
        `
  ],
  styleUrls: ['./feedback-request.component.scss']
})
export class FeedbackRequestComponent implements OnInit, OnDestroy {
  @ViewChild('stepper') stepper!: StepperModule;
  @ViewChild('multiSelect') multiselect: any;
  @ViewChild('chipSection') chipSection!: ElementRef;



  requestForm: FormGroup;
  feedbackId: number;
  feedback: IFeedback | null = null;
  teachOther: ITeachOther | null = null;
  feedbackSubTypesSharedCollection: IFeedbackSubType[] = [];
  feedbacksSharedCollection: IFeedback[] = [];
  ratingList=['Rarely','Occasionally','Almost Always','Always'];
  badgeList=['danger','warning','info','success'];

  // ratingsSharedCollection: IRating[] = [];
  skillDevelopmentTypesSharedCollection: ISkillDevelopmentType[] = [];
  active = 0;
  dataUtils = inject(DataUtils);
  showStrengthField = false;
  showWhyField = false;
  isLoading = true;
  reviewData: any = {};
  selectedSkills: any[] = [];
  recommendOptions: any[];
  private skillSubscription: Subscription;

  private feedbackdetailsformservice = inject(FeedbackDetailsFormService);
  private feedbackService = inject(FeedbackService);
  private feedbackSubTypeService = inject(FeedbackSubTypeService);
  private ratingService = inject(RatingService);
  private skillDevelopmentTypeService = inject(SkillDevelopmentTypeService);
  private skillDevelopmentDetailsFormService = inject(SkillDevelopmentDetailsFormService);
  private skillDevelopmentDetailsService = inject(SkillDevelopmentDetailsService);
  private teachOtherFormService = inject(TeachOtherFormService);
  private teachOtherService = inject(TeachOtherService);
  protected activatedRoute = inject(ActivatedRoute);
  protected router = inject(Router);
  private feedbackDetailsService = inject(FeedbackDetailsService);
  private localStorageService = inject(LocalstorageserviceService);
  private fb = inject(FormBuilder);
  private renderer = inject(Renderer2);
  private primeNGConfig = inject(PrimeNGConfig);

  constructor() {
    this.requestForm = this.fb.group({
      feedbackForm: this.fb.array([]),
      skillForm: this.fb.group({
        selectedSkills: [[], Validators.required]
      }),
      teachOtherForm: this.teachOtherFormService.createTeachOtherFormGroup(),
    })
    this.recommendOptions = [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' }
    ];

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = +params['id'];
      if (!isNaN(id)) {
        this.feedbackId = id;
        this.loadRelationshipsOptions();
        this.initSelectedSkills();
        this.checkRecommendationField();
        // PrimeNGConfig['ripple'] = true;
        // this.primeNGConfig.ripple = true;

      } else {
        this.previousState();
      }
    });
    this.requestForm.valueChanges.subscribe(value => {
      console.log('Form value:', value);
    });

  }
  next(){
    this.active++;
  }
  prev(){
    this.active--;
  }
  initSelectedSkills() {
    const selectedSkillsControl = this.requestForm.get('skillForm.selectedSkills');
    if (selectedSkillsControl) {
      // Initialize selectedSkills with the current value of the form control
      this.selectedSkills = selectedSkillsControl.value || [];

      // Subscribe to changes in the form control
      this.skillSubscription = selectedSkillsControl.valueChanges.subscribe(value => {
        this.selectedSkills = value || [];
      });
    }
  }
  onDropdownShow() {
    setTimeout(() => {
      const panel = this.multiselect.el.nativeElement.querySelector('.p-multiselect-panel');
      console.log(panel);
      if (panel) {
        const panelRect = panel.getBoundingClientRect();
        this.renderer.setStyle(this.chipSection.nativeElement, 'position', 'absolute');
        this.renderer.setStyle(this.chipSection.nativeElement, 'top', `${panelRect.bottom}px`);
        this.renderer.setStyle(this.chipSection.nativeElement, 'width', `${panelRect.width}px`);
        this.renderer.setStyle(this.chipSection.nativeElement, 'left', `${panelRect.left}px`);
      }
    });
  }

  onDropdownHide() {
    this.renderer.removeStyle(this.chipSection.nativeElement, 'position');
    this.renderer.removeStyle(this.chipSection.nativeElement, 'top');
    this.renderer.removeStyle(this.chipSection.nativeElement, 'width');
    this.renderer.removeStyle(this.chipSection.nativeElement, 'left');
  }
  onSkillChange(event: any) {
    this.requestForm.get('skillForm.selectedSkills')?.setValue(event.value);
  }


  getRatingText(value: number): string {
    switch (value) {
      case 1:
        return 'Rarely';
      case 2:
        return 'Occasionally';
      case 3:
        return 'Almost Always';
      case 4:
        return 'Always';
      default:
        return '';
    }
  }

  onRate(event: any, index: number) {
    // You can add any additional logic here if needed
    console.log(`Rating for item ${index}: ${event.value}`);
  }

  removeSkill(skill: any) {
    const updatedSkills = this.selectedSkills.filter(s => s.id !== skill.id);
    // this.selectedSkills = updatedSkills;
    this.requestForm.get('skillForm.selectedSkills')?.setValue(updatedSkills);
  }
  get feedbackForm(): FormArray {
    return this.requestForm.get('feedbackForm') as FormArray;
  }

  get skiilForm(): FormGroup {
    return this.requestForm.get('skillForm') as FormGroup;
  }

  get teachOtherForm(): FormGroup {
    return this.requestForm.get('teachOtherForm') as FormGroup;
  }
  checkRecommendationField() {
    const recommendation = this.teachOtherForm.get('recommendation')?.value;
    this.showStrengthField = recommendation === 'yes';
    this.showWhyField = recommendation === 'no';
  }

  onRecommendChange(event: any): void {
    this.showStrengthField = event.value === 'Yes';
    this.showWhyField = event.value === 'No';
  }
  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  protected loadRelationshipsOptions(): void {
    this.isLoading = true;
    forkJoin({
      feedbackdetails: this.feedbackService.find(this.feedbackId!).pipe(map((res: HttpResponse<IFeedback>) => res.body ?? null)),
      subtypes: this.feedbackSubTypeService.query().pipe(map((res: HttpResponse<IFeedbackSubType[]>) => res.body ?? [])),
      // ratings: this.ratingService.query().pipe(map((res: HttpResponse<IRating[]>) => res.body ?? [])),
      skills: this.skillDevelopmentTypeService.query().pipe(map((res: HttpResponse<ISkillDevelopmentType[]>) => res.body ?? [])),
    }).subscribe({
      next: ({ feedbackdetails, subtypes,  skills }) => {
        this.feedback = feedbackdetails;
        this.feedbackSubTypesSharedCollection = subtypes;
        // this.ratingsSharedCollection = ratings;
        this.skillDevelopmentTypesSharedCollection = skills;
        this.initializeForm();
        // this.updateForm(this.teachOther!, this.feedback); // Pass feedback
        this.loadDraft();
        this.isLoading = false;

      },
      error: (error) => {
        console.error('Error loading data:', error);
        this.isLoading = false;
      }
    });
  }



  private initializeForm(): void {
    this.feedbackSubTypesSharedCollection.forEach(subtype => {
      this.feedbackForm.push(this.createSubtypeFormGroup(subtype));
    });

    this.updateTeachOtherForm(this.feedback!);

  }

  private createSubtypeFormGroup(subtype: IFeedbackSubType, values: any = null): FormGroup {
    return this.fb.group({
      id: [values ? values.id : null],
      feedbackdetails: [values ? values.feedbackdetails : this.feedback],
      feedbacksubtypes: [values ? values.feedbacksubtypes : subtype],
      commentsforfeedbacksubtype: [values ? values.commentsforfeedbacksubtype : ''],
      ratings: [values ? values.ratings : '', Validators.required]
    });
  }

  private updateTeachOtherForm(feedback: IFeedback): NewTeachOther {
   console.log('feedback in updateTeachOtherForm', feedback);
    return this.teachOtherFormService.transformToNewTechOther(this.teachOtherForm,feedback);
  }

  private createSkillFormGroup(skilltype: any): FormGroup {
    return this.fb.group({
      skilldevelopment: [this.feedback],
      skilldevelopmenttype: [skilltype],
    })
  }



  private loadDraft(): void {
    this.localStorageService.getDraft(this.feedbackId!)
      .subscribe({
        next: (draft) => {
          if (draft) {
            this.requestForm.patchValue(draft);
            console.log('Draft loaded:', draft);
          }
        },
        error: (error) => {
          if (error.status !== 404) { // Ignore 404 (Not Found) errors
            console.error('Error loading draft:', error);
          }
        }
      });
  }

  saveDraft(): void {
    this.localStorageService.saveDraft(this.feedbackId!, this.requestForm.value)
      .subscribe({
        next: () => console.log('Draft saved successfully'),
        error: (error) => console.error('Error saving draft:', error)
      });
  }

  // onActiveIndexChange(event: number): void {
  //   this.activeIndex = event;
  // }



  prepareReviewData(): void {
    this.reviewData = {
      feedbackDetails: this.feedbackForm.value,
      selectedSkills: this.requestForm.get('skillForm.selectedSkills')?.value,
      teachOtherDetails: this.teachOtherForm.value
    };
  }

  async submit() {
    // for(let i=0;i<this.feedbackForm.length;i++){
    //   const feedbackFormgroup = this.feedbackForm.at(i) as FormGroup;
    //   const rating = feedbackFormgroup.get('ratings')?.value;
    //   try{
    //     const feedbackdetails =await this.feedbackdetailsformservice.transformToNewFeedbackDetails(feedbackFormgroup, rating);
    //     console.log('Feedback details:', feedbackdetails);
    //     this.feedbackDetailsService.create(feedbackdetails).subscribe({
    //       next: (response) => {
    //         console.log('Feedback details created successfully:', response);
    //       },
    //       error: (error) => {
    //         console.error('Error creating feedback details:', error);
    //       }
    //     });
    //   }
    //   catch (error){
    //     console.error('Error loading data:', error);
    //   }


    // }
    // const selectedItem = this.requestForm.get('skillForm.selectedSkills')?.value;
    //
    // for(let k=0;k<selectedItem.length;k++){
    //   // console.log(selectedItem[k]);
    //   // const skillFormgroup = this.createSkillFormGroup(selectedItem[k]);
    //   const skilldevelopment = this.skillDevelopmentDetailsFormService.transformToNewSkillDevelopmentDetails(selectedItem[k], this.feedback);
    //   console.log('Skill development details:', skilldevelopment);
    //   this.skillDevelopmentDetailsService.create(skilldevelopment).subscribe({
    //     next: (response) => {
    //       console.log('Skill development details created successfully:', response);
    //     },
    //     error: (error) => {
    //       console.error('Error creating skill development details:', error);
    //     }
    //   });
    // }
    // const techotherform= this.techOtherFormGroup();
    // const teachOtherFormGroup = this.requestForm.get('teachOtherForm') as FormGroup;
    // const teachother = this.teachOtherFormService.transformToNewTechOther(teachOtherFormGroup);
    // console.log('Teach other:', teachother);

    const teachOther = this.updateTeachOtherForm(this.feedback!);
    console.log('Teach other:', teachOther);
    this.teachOtherService.create(teachOther).subscribe({
      next: (response) => {
        console.log('Teach other created successfully:', response);
      },
      error: (error) => {
        console.error('Error creating teach other:', error);
      }
    });
  }


  private previousState() {
    this.router.navigateByUrl('/feedback-response');
  }

  protected readonly onclick = onclick;

  ngOnDestroy(): void {
    if(this.skillSubscription){
      this.skillSubscription.unsubscribe();
    }
    this.saveDraft();

  }
  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: any) {
    this.saveDraft();
  }
}
