import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { ToastrComponent } from './components/toastr/toastr.component';
import { ToastrService } from './services/toastr.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MainHeaderComponent,ToastrComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '1000goals-frontend';
  toastrService=inject(ToastrService);
  
  get toastrMessage(){
    return this.toastrService.message;
  }
  get toastrType(){
    return this.toastrService.type;
  }
  get toastrShow$(){
    return this.toastrService.showToastr$;
  }


}
