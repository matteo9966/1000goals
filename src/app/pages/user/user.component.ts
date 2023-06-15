import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserNavComponent } from 'src/app/components/user-nav/user-nav.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule,RouterModule,UserNavComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

}
