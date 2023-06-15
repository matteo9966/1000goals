import { Component,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent {
 @Output() menuState:EventEmitter<boolean> = new EventEmitter();

 close(){
   this.menuState.emit(false)
 }


}
