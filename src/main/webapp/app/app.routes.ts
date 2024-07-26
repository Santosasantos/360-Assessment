import { Routes } from '@angular/router';

import { Authority } from 'app/config/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { errorRoute } from './layouts/error/error.route';

import HomeComponent from './home/home.component';
import NavbarComponent from './layouts/navbar/navbar.component';
import LoginComponent from './login/login.component';
import { FeedbackRequestComponent } from './feedback-request/feedback-request.component';
import { FeedbackResponseComponent } from './feedback-response/feedback-response.component';
import { FeedbackReportComponent } from './feedback-request/feedback-report/feedback-report.component';
import { FeedbackResponseResolver } from './feedback-response/FeedbackResponseResolver';
import {
  FeedbackRequestFormComponent
} from './feedback-request/feedback-report/feedback-request-form/feedback-request-form.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'home.title',
  },
  {
    path: '',
    component: NavbarComponent,
    outlet: 'navbar',
  },
  {
    path: 'admin',
    data: {
      authorities: [Authority.ADMIN],
    },
    canActivate: [UserRouteAccessService],
    loadChildren: () => import('./admin/admin.routes'),
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.route'),
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'login.title',
  },
  {
    path: 'feedback-request/:id',
    component: FeedbackRequestComponent,
  },
  {
    path: 'feedback-request-form',
    component: FeedbackRequestFormComponent,
  },
  {
    path: 'feedback-report',
    component: FeedbackReportComponent,
  },
  {
    path: 'feedback-response',
    component: FeedbackResponseComponent,
    resolve: {
      data : FeedbackResponseResolver
    }
  },

  {
    path: '',
    loadChildren: () => import(`./entities/entity.routes`),
  },
  ...errorRoute,
];

export default routes;
