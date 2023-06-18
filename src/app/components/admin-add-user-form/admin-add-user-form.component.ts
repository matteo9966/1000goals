import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from '../input-text/input-text.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-admin-add-user-form',
  standalone: true,
  imports: [CommonModule, InputTextComponent,ButtonComponent],
  templateUrl: './admin-add-user-form.component.html',
  styleUrls: ['./admin-add-user-form.component.scss'],
})
export class AdminAddUserFormComponent {}
