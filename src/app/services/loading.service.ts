import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _showLoader$ = new BehaviorSubject(false);
  showLoader$ = this._showLoader$.asObservable();
  constructor() {}

  setShowLoader(show: boolean) {
    this._showLoader$.next(show);
  }
}
