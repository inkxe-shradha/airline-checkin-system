import { Component, Input, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss']
})
export class ProgressSpinnerComponent implements OnInit {
  @Input() diameter: number = 20;
  @Input() mode: ProgressSpinnerMode = 'indeterminate';
  @Input() color: string = 'primary';

  constructor() { }

  ngOnInit(): void {
  }

}
