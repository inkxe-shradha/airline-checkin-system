import { AnicillaryList } from 'src/app/core/models/anicillary.model';
import { Passenger } from 'src/app/core/models/passenger.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import flightList from 'src/app/config/flight.config';
import { AppState } from 'src/app/store';
import { loadPassengerList, updatePassengerList } from 'src/app/store/actions/passenger.action';
import { Observable, Subscription } from 'rxjs';
import { getAllPassengerList } from 'src/app/store/selectors/passenger.selector';
import { getCurrentLoadingState } from 'src/app/store/selectors/loading.selector';
import { loadAnicillaryList } from 'src/app/store/actions/anicillary.action';
import { getAllAnicillary } from 'src/app/store/selectors/anicillary.selector';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { NotificationsService } from 'src/app/shared/utils/notification.service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store<AppState>,
    private notificationService: NotificationsService
  ) { }

  public flightList: Array<any> = flightList;
  public isLoading!: Observable<boolean>;
  public cancelSubscription!: Subscription;
  public selectedFlight!: string;
  public passengerList!: Observable<Passenger[]>;
  public anicillaryList!: Observable<AnicillaryList[]>;
  public globalFilterKeys = {
    isWheelChair: false,
    isInfant: false,
    isSpecialMeal: false,
    checkedIn: false,
  };

  ngOnInit(): void {
    this.store.dispatch(loadPassengerList());
    this.store.dispatch(loadAnicillaryList());
    this.filterPassengerList();
    this.isLoading = this.store.select(getCurrentLoadingState);
    this.anicillaryList = this.store.select(getAllAnicillary(this.selectedFlight));
  }

  filterPassengerList(): void {
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
  }

  handelFormSubmit(event: Passenger) {
    this.store.dispatch(updatePassengerList(
      event
    ))
    this.notificationService.showNotification('Passenger Updated Successfully', 'success');
  }

  handelGlobalFilter(event: MatCheckboxChange): void {
    this.globalFilterKeys[event.source.name as keyof typeof this.globalFilterKeys] = event.checked;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.cancelSubscription?.unsubscribe();
  }

}
