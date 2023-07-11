import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from '../input-text/input-text.component';
import { TextAreaComponent } from '../text-area/text-area.component';
import { SliderComponent } from '../slider/slider.component';
import { ButtonComponent } from '../button/button.component';
import {
  ReactiveFormsModule,
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { alphanumericValidator } from 'src/app/validators/alphaNumeric.validator';
import { GameService } from 'src/app/services/game.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-goal-form',
  standalone: true,
  imports: [
    CommonModule,
    InputTextComponent,
    TextAreaComponent,
    SliderComponent,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './goal-form.component.html',
  styleUrls: ['./goal-form.component.scss'],
})
export class GoalFormComponent {
  points = 50;
  nameMinLength = 4;
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
    private userService: UserService,
    private toastrService: ToastrService
  ) {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      name: this.fb.control('', {
        validators: [
          Validators.required,
          alphanumericValidator,
          Validators.minLength(this.nameMinLength),
        ],
      }),
      description: this.fb.control('', { validators: [alphanumericValidator] }),
    });
  }

  get nameError() {
    const name = this.form.get('name');
    const errors = name?.errors;
    if (!errors) return null;
    let message = '',
      errorsnames = '';

    const errorsList = Object.keys(errors).map((keyError) => {
      return keyError;
    });

    if (errorsList.includes('minlength')) {
      message += `- min length for name is ${this.nameMinLength}`;
    }
    if (errorsList.includes('alphaNumeric')) {
      message += `- only alphanumeric characters`;
    }

    return message;
  }

  get descriptionErrors() {
    const description = this.form.get('description');
    const errors = description?.errors;
    if (!errors) return null;
    let message = '',
      errorsnames = '';

    const errorsList = Object.keys(errors).map((keyError) => {
      return keyError;
    });

    if (errorsList.includes('alphaNumeric')) {
      message += `- only alphanumeric characters`;
    }

    return message;
  }

  get formValid() {
    return this.form.valid;
  }

  onClickAddGoal() {
    const name = this.form.get('name')?.value;
    const description = this.form.get('description')?.value || '';
    this.gameService
      .addProposedGoalToGame({ name, description })
      ?.subscribe((response) => {
        if (response?.data?.game) {
          this.userService.patchUserData((data) => {
            if (!data.game) return data;
            this.form.reset();
            this.form.clearValidators();
            Object.entries(this.form.controls).forEach(([key, value]) => {
              value.setValue('')
              value.reset()
            });
            this.toastrService.setToastrMessage(
              'Proposed goal added successfully'
            );
            this.toastrService.setSowToastr(true);
            data.game.proposedGoals = response?.data?.game?.proposedGoals || []; //just patch the proposedGoals part
            return data;
          });
        }
      });
  }
}
