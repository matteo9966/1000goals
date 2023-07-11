import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from '../input-text/input-text.component';
import { ButtonComponent } from '../button/button.component';
import { GameService } from 'src/app/services/game.service';
import { UserService } from 'src/app/services/user.service';
import { AbstractControl, FormsModule, NgForm, NgModel } from '@angular/forms';
import { finalize } from 'rxjs';
import { usernameValidator } from 'src/app/validators/usernameValidator.validator';

@Component({
  selector: 'app-admin-add-user-form',
  standalone: true,
  imports: [CommonModule, InputTextComponent, ButtonComponent, FormsModule],
  templateUrl: './admin-add-user-form.component.html',
  styleUrls: ['./admin-add-user-form.component.scss'],
})
export class AdminAddUserFormComponent {
  username: string | null = null;
  disabledButton = false;
  errorLabel="";
  @ViewChild('name', { read: NgModel, static: true }) nameInput!: NgModel;
  @ViewChild(NgForm,{static:true}) form!:NgForm;
  constructor(
    private gameService: GameService,
    private userService: UserService
  ) {}


  onClickAddUser() {
    if (!this.username) {
      return;
    }
  


    const validationErrors = usernameValidator(this.nameInput.control)

    if(validationErrors){
      this.errorLabel="Only alphanumeric names are accepted"
      return
    }


    this.gameService
      .addUserToGame(this.username)
      .pipe(
        finalize(() => {
          this.disabledButton = false;
        })
      )
      .subscribe((response) => {
        if (response.data) {
          this.userService.patchUserData((userdata)=>{
            userdata.game = response.data.game;
            return userdata;
          })
          this.username = "";
          this.nameInput.reset('');
          this.form.reset()
        }
      });
  }
}
