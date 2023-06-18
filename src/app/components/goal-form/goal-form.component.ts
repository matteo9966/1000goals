import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from '../input-text/input-text.component';
import { TextAreaComponent } from '../text-area/text-area.component';
import { SliderComponent } from '../slider/slider.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-goal-form',
  standalone: true,
  imports: [CommonModule,InputTextComponent,TextAreaComponent,SliderComponent,ButtonComponent],
  templateUrl: './goal-form.component.html',
  styleUrls: ['./goal-form.component.scss']
})
export class GoalFormComponent {
 points=50;
}
