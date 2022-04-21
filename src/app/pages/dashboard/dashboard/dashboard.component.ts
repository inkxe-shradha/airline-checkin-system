import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import flightList from 'src/app/config/flight.config';
import { User } from 'src/app/core/models/user';
import { AppState } from 'src/app/store';
import { getAuthenticatedUser } from 'src/app/store/selectors/auth.selector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public currentUser!: User | null;
  public flightList = flightList;
  public selectedFlight!: string;
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select(getAuthenticatedUser).pipe(take(1)).subscribe((user) => {
      this.currentUser = user;
      console.log(this.currentUser);
    });
  }

  onFlightSelected(flight: string): void {
    this.selectedFlight = flight;
  }

  getSelectedFlight(): string | undefined {
    return this.flightList.find(ele => ele.id == this.selectedFlight)?.name;
  }
}
