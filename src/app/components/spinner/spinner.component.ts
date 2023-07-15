import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from 'src/app/services/loading.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent implements OnInit,OnDestroy {
  loadingService = inject(LoadingService);
  destroy$ = new Subject();
  constructor(){

  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
  
  @ViewChild('dialog', { static: true }) dialog!: ElementRef;
  
  ngOnInit() {
    this.loadingService.showLoader$
      .pipe(takeUntil(this.destroy$))
      .subscribe((show) => {
        if (show) {
          (<HTMLDialogElement>this.dialog.nativeElement).showModal();
        } else {
          (<HTMLDialogElement>this.dialog.nativeElement).close();
        }
      });
    //
  }

}
