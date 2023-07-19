import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextAreaComponent } from 'src/app/components/text-area/text-area.component';
import { InputTextComponent } from 'src/app/components/input-text/input-text.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { GameService } from 'src/app/services/game.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/routes/routes';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-new-game',
  standalone: true,
  imports: [
    CommonModule,
    TextAreaComponent,
    InputTextComponent,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewGameComponent {
  fb = inject(FormBuilder);
  gameService = inject(GameService);
  userService = inject(UserService);
  router = inject(Router);
  form!: FormGroup;
  disabledSubmit = false;

  createForm() {
    this.form = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      description: this.fb.control('', []),
    });
  }

  constructor() {
    this.createForm();
  }

  get nameControl() {
    return this.form.get('name')!;
  }

  get descriptionControl() {
    return this.form.get('description');
  }

  get nameErrorLabel() {
    let errorlabel = '';
    if (this.nameControl?.errors?.['required']) {
      errorlabel = 'Game name is required';
    }
    return errorlabel;
  }
  //the error labels
  onSubmit(e: Event) {
    e.preventDefault();
    Object.values(this.form.controls).forEach((c) => {
      c.markAllAsTouched();
      c.updateValueAndValidity();
    });

    if (this.form.invalid) {
      return;
    }
    this.disabledSubmit=true;
    const name = this.nameControl?.value;
    const description = this.descriptionControl?.value || '';
    this.gameService.createGame({ description, name }).pipe(finalize((()=>{
      this.disabledSubmit=false;
    }))).subscribe((response) => {
      if (response?.data) {
        this.userService.setUserData( response.data);
        //navigate to dashboard
        this.router.navigateByUrl(
          '/' + [ROUTES.user.base, ROUTES.user.dashboard].join('/')
        );
      }
    });
  }
}
