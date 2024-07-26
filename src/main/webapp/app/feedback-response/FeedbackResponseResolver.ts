import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RefreshService } from './RefreshService';


@Injectable({
  providedIn: 'root'
})
export class FeedbackResponseResolver implements Resolve<any> {
  constructor(private refreshService: RefreshService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    this.refreshService.triggerRefresh();
    // Return your data fetching observable here
  }
}
