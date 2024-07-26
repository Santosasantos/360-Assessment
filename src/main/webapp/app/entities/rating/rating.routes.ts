import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { RatingComponent } from './list/rating.component';
import { RatingDetailComponent } from './detail/rating-detail.component';
import { RatingUpdateComponent } from './update/rating-update.component';
import RatingResolve from './route/rating-routing-resolve.service';

const ratingRoute: Routes = [
  {
    path: '',
    component: RatingComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RatingDetailComponent,
    resolve: {
      rating: RatingResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RatingUpdateComponent,
    resolve: {
      rating: RatingResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RatingUpdateComponent,
    resolve: {
      rating: RatingResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default ratingRoute;
