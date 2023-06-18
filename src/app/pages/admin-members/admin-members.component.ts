import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from 'src/app/components/user-card/user-card.component';
import { AdminAddUserFormComponent } from 'src/app/components/admin-add-user-form/admin-add-user-form.component';

@Component({
  selector: 'app-admin-members',
  standalone: true,
  imports: [CommonModule,UserCardComponent,AdminAddUserFormComponent],
  templateUrl: './admin-members.component.html',
  styleUrls: ['./admin-members.component.scss']
})
export class AdminMembersComponent {

}
