import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextAreaComponent } from 'src/app/components/text-area/text-area.component';
import { InputTextComponent } from 'src/app/components/input-text/input-text.component';

@Component({
  selector: 'app-new-game',
  standalone: true,
  imports: [CommonModule,TextAreaComponent,InputTextComponent],
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewGameComponent {

}
