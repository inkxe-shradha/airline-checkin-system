import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnChanges {
  @Input() handsetStatus!: boolean | null;
  @Input() currentUser!: User | null;

  @Output() toggleSidebarEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() logOut: EventEmitter<void> = new EventEmitter<void>();

  constructor(
  ) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

  }
  toggleSidebar(): void {
    this.toggleSidebarEvent.emit();
  }
  handelLogOut(): void {
    this.logOut.emit();
  }
}
