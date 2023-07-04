import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-goals-list-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './goals-list-container.component.html',
  styleUrls: ['./goals-list-container.component.scss']
})
export class GoalsListContainerComponent {
  @Input() list?:{detail:string,points?:number}[]=[]
}
