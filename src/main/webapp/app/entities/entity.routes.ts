import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'hrmsApp.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'employee',
    data: { pageTitle: 'hrmsApp.employee.home.title' },
    loadChildren: () => import('./employee/employee.routes'),
  },
  {
    path: 'feedback',
    data: { pageTitle: 'hrmsApp.feedback.home.title' },
    loadChildren: () => import('./feedback/feedback.routes'),
  },
  {
    path: 'feedback-details',
    data: { pageTitle: 'hrmsApp.feedbackDetails.home.title' },
    loadChildren: () => import('./feedback-details/feedback-details.routes'),
  },
  {
    path: 'feedback-sub-type',
    data: { pageTitle: 'hrmsApp.feedbackSubType.home.title' },
    loadChildren: () => import('./feedback-sub-type/feedback-sub-type.routes'),
  },
  {
    path: 'feedback-type',
    data: { pageTitle: 'hrmsApp.feedbackType.home.title' },
    loadChildren: () => import('./feedback-type/feedback-type.routes'),
  },
  {
    path: 'skill-development-details',
    data: { pageTitle: 'hrmsApp.skillDevelopmentDetails.home.title' },
    loadChildren: () => import('./skill-development-details/skill-development-details.routes'),
  },
  {
    path: 'skill-development-type',
    data: { pageTitle: 'hrmsApp.skillDevelopmentType.home.title' },
    loadChildren: () => import('./skill-development-type/skill-development-type.routes'),
  },
  {
    path: 'teach-other',
    data: { pageTitle: 'hrmsApp.teachOther.home.title' },
    loadChildren: () => import('./teach-other/teach-other.routes'),
  },
  {
    path: 'rating',
    data: { pageTitle: 'hrmsApp.rating.home.title' },
    loadChildren: () => import('./rating/rating.routes'),
  },
  {
    path: 'year',
    data: { pageTitle: 'hrmsApp.year.home.title' },
    loadChildren: () => import('./year/year.routes'),
  },
  {
    path: 'extraquestion',
    data: { pageTitle: 'hrmsApp.extraquestion.home.title' },
    loadChildren: () => import('./extraquestion/extraquestion.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
