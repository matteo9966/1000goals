import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from 'src/app/routes/routes';
@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  @Input() name:string="";
  @Input() id:string="id";
  @Input() points:number=0;

  get linkToUserDetail(){
    return '/'+[ROUTES.user.base,ROUTES.user.details].join('/').replace(':id',this.id);
  }
}
