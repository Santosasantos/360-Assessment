import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { YearComponent } from './list/year.component';
import { YearDetailComponent } from './detail/year-detail.component';
import { YearUpdateComponent } from './update/year-update.component';
import YearResolve from './route/year-routing-resolve.service';

const yearRoute: Routes = [
  {
    path: '',
    component: YearComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: YearDetailComponent,
    resolve: {
      year: YearResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: YearUpdateComponent,
    resolve: {
      year: YearResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: YearUpdateComponent,
    resolve: {
      year: YearResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default yearRoute;
