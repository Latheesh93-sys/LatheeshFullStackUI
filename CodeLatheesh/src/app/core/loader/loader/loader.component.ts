import { Component } from '@angular/core';
import { LoaderService } from '../../../shared-services/loader/loader.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
   loading$!: Observable<boolean>;
  constructor(private loaderService: LoaderService) {
    this.loading$ = this.loaderService.loading$;
  }
  

  
}
