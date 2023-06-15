import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from 'src/app/components/form/form.component';
import { InputTextComponent } from 'src/app/components/input-text/input-text.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { ReactiveFormsModule, FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/routes/routes';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormComponent,
    InputTextComponent,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder,private router:Router) {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      name: this.fb.control('',[Validators.required]),
      password: this.fb.control('',[Validators.required]),
    });
  }

  onClickLogin(){}
  onClickBack(){
    this.router.navigateByUrl(ROUTES.home.base);
  }
}
