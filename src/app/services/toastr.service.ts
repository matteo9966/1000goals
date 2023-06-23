import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  private showToastr = new BehaviorSubject(false)
  timerid:any;
  showToastr$ = this.showToastr.asObservable().pipe(tap(show=>{
    if(show){
      this.timerid && clearTimeout(this.timerid)
      this.timerid = setTimeout(() => {
        this.setSowToastr(false)
      }, 4000 );
    }
  }))

  private toastrMessage = '';
  private toastrType: 'success' | 'error' = 'success';
  constructor() {}

  setSowToastr(show: boolean) {
    this.showToastr.next(show);
  }
  
  setToastrType(type: 'success' | 'error') {
    this.toastrType = type;
  }
  setToastrMessage(message: string) {
    this.toastrMessage = message;
  }

  get message() {
    return this.toastrMessage;
  }

  get type() {
    return this.toastrType;
  }


}
