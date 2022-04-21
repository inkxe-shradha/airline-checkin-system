import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import flightList from 'src/app/config/flight.config';
import { AnicillaryList } from 'src/app/core/models/anicillary.model';
import { Passenger } from 'src/app/core/models/passenger.model';
import { NotificationsService } from 'src/app/shared/utils/notification.service';
import { AppState } from 'src/app/store';
import { loadAnicillaryList } from 'src/app/store/actions/anicillary.action';
import { loadPassengerList, updatePassengerList } from 'src/app/store/actions/passenger.action';
import { getAllAnicillary } from 'src/app/store/selectors/anicillary.selector';
import { getCurrentLoadingState } from 'src/app/store/selectors/loading.selector';
import { getAllPassengerList } from 'src/app/store/selectors/passenger.selector';

@Component({
  selector: 'app-in-flight',
  templateUrl: './in-flight.component.html',
  styleUrls: ['./in-flight.component.scss']
})
export class InFlightComponent implements OnInit {
  public flightList: Array<any> = flightList;
  public isLoading!: Observable<boolean>;
  public cancelSubscription!: Subscription;
  public selectedFlight!: string;
  public passengerList!: Observable<Passenger[]>;
  public anicillaryList!: Observable<AnicillaryList[]>;

  constructor(
    private store: Store<AppState>,
    private notificationService: NotificationsService

  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadPassengerList());
    this.store.dispatch(loadAnicillaryList());
    this.filterPassengerList();
    this.isLoading = this.store.select(getCurrentLoadingState);
  }

  private filterPassengerList(): void {
    this.passengerList = this.store.select(getAllPassengerList({
      flightId: this.selectedFlight, filter: {
        isPassport: false,
        isDob: false,
        isAddress: false
      }
    }))
  }


  onFlightSelected(flight: string): void {
    this.selectedFlight = flight;
    this.anicillaryList = this.store.select(getAllAnicillary(this.selectedFlight));
  }

  handelFormSubmit(passenger: Passenger): void {
    this.store.dispatch(updatePassengerList(
      passenger
    ))
    this.notificationService.showNotification('Passenger Updated Successfully', 'success');
  }


}
