import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent {
  @Input() id = Math.random().toString().slice(2,6);
}
