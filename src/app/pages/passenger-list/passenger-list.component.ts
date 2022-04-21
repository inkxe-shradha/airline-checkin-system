import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';
import { AddEditPassengerFormComponent } from 'src/app/components/add-edit-passenger-form/add-edit-passenger-form.component';
import flightList from 'src/app/config/flight.config';
import { FlightList } from 'src/app/core/models/flight.model';
import { Passenger } from 'src/app/core/models/passenger.model';
import { NotificationsService } from 'src/app/shared/utils/notification.service';
import { AppState } from 'src/app/store';
import { addPassengerList, deletePassengerList, loadPassengerList, updatePassengerList } from 'src/app/store/actions/passenger.action';
import { getCurrentLoadingState } from 'src/app/store/selectors/loading.selector';
import { getAllPassengerList, getSingleUserDetails } from 'src/app/store/selectors/passenger.selector';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-passenger-list',
  templateUrl: './passenger-list.component.html',
  styleUrls: ['./passenger-list.component.scss']
})
export class PassengerListComponent implements OnInit, AfterViewInit, OnDestroy {

  public displayColumns: string[] = ['name', 'passport', 'address', 'dob', 'wheelChair', 'infant', 'spl_Meal', 'flight', 'seat_No', 'action'];
  public dataSource = new MatTableDataSource<Passenger>();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public passengerSubscription!: Subscription;
  public flightList = flightList;
  public activeFlightList!: string;
  private activeFlightId !: string;
  public isLoadingState !: Observable<boolean>;
  public activeFilter = {
    isPassport: false,
    isDob: false,
    isAddress: false
  }
  constructor(
    private store: Store<AppState>,
    private router: Router,
    public dialog: MatDialog,
    private routes: ActivatedRoute,
    private notificationService: NotificationsService
  ) {
    this.activeFlightId = this.routes.snapshot.queryParams?.['param'];
  }

  ngOnInit(): void {
    this.store.dispatch(loadPassengerList());
    this.applyFilter();
    this.activeFlightList = FlightList[this.activeFlightId as keyof typeof FlightList];
    if (!this.activeFlightList) {
      this.router.navigate(['/dashboard']);
    }
    this.isLoadingState = this.store.select(getCurrentLoadingState);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.passengerSubscription && this.passengerSubscription.unsubscribe();
  }

  getFlight(flight: string): string | undefined {
    return this.flightList.find(ele => ele.id === flight)?.name;
  }

  changeToggle(event: MatSlideToggleChange, type: string = 'isPassport' || 'isAddress' || 'isDob'): void {
    this.activeFilter[type as keyof typeof this.activeFilter] = event.checked;
    this.applyFilter();
  }

  private applyFilter(): void {
    this.passengerSubscription = this.store.select(getAllPassengerList(
      { filter: this.activeFilter, flightId: this.activeFlightId }
    )).subscribe(passenger => {
      this.dataSource.data = passenger;
    })
  }

  doFilter(event: KeyboardEvent): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openAddPassengerDialog(): void {
    const dialogRef = this.dialog.open(AddEditPassengerFormComponent, {
      data: {
        flightId: this.activeFlightId,
        occupiedSeats: this.dataSource.data.map(ele => ele.seat),
        isEdit: false,
      },
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onAddEditPassengerCalled(result.type, result)
      }
    });
  }

  private onAddEditPassengerCalled(type: string = 'ADD' || 'EDIT', ...args: any) {
    const { address, dob, flight, isInfant
      , isSpecialMeal, isWheelChair, name, passport, seat_No, id } = args[0];
    if (!id) this.store.dispatch(addPassengerList({
      name,
      address,
      dob,
      flight,
      isInfant,
      isSpecialMeal,
      isWheelChair,
      passport,
      seat: seat_No,
    })); else this.store.dispatch(updatePassengerList({
      name,
      address,
      dob,
      flight,
      isInfant,
      isSpecialMeal,
      isWheelChair,
      passport,
      seat: seat_No,
      id
    }))
  }

  onRemovePassenger(passengerId: number | string): void {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        // Swal Loader will
        this.store.dispatch(deletePassengerList({ id: passengerId }));
        this.notificationService.showNotification('Passenger Removed Successfully', 'success');
        Swal.close();
      }
    })
  }

  handelEditPassenger(passengerId: number | string): void {
    this.store.select(getSingleUserDetails(passengerId)).pipe(take(1)).subscribe(passenger => {

      const editDialogRef = this.dialog.open(AddEditPassengerFormComponent, {
        data: {
          flightId: this.activeFlightId,
          occupiedSeats: this.dataSource.data.map(ele => ele.seat),
          isEdit: true,
          passengerId,
          ...passenger
        },
        width: '500px',
      });
      editDialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.onAddEditPassengerCalled(result.type, result)
        }
      });
    })
  }

}
