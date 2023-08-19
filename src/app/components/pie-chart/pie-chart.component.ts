import { Component,Input,inject,Renderer2,OnInit,AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimatePieDirective } from 'src/app/directives/animate-pie.directive';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule,AnimatePieDirective],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements AfterViewInit {
  renderer = inject(Renderer2);
  ngAfterViewInit(): void {
    
  }
  @Input() pieColor:string='#025a82e0';
  @Input() percentage:string="0";
}
