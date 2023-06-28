import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from '../input-text/input-text.component';
import { ButtonComponent } from '../button/button.component';
import { GameService } from 'src/app/services/game.service';
import { UserService } from 'src/app/services/user.service';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { finalize } from 'rxjs';

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
