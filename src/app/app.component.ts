import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store';
import { autoLogin } from './store/actions/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'airbnb';

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(autoLogin());
  }
}
