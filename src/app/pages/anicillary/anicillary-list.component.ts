import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AddEditAnicillaryComponent } from 'src/app/components/add-edit-anicillary/add-edit-anicillary.component';
import { serviceCategories } from 'src/app/config/anicillary.config';
import flightList from 'src/app/config/flight.config';
import { AnicillaryList } from 'src/app/core/models/anicillary.model';
import { FlightList } from 'src/app/core/models/flight.model';
import { NotificationsService } from 'src/app/shared/utils/notification.service';
import { AppState } from 'src/app/store';
import { loadAnicillaryList, removeAnicillaryList, saveAnicillaryList, updateAnicillaryList } from 'src/app/store/actions/anicillary.action';
import { getAllAnicillary } from 'src/app/store/selectors/anicillary.selector';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-anicillary-list',
  templateUrl: './anicillary-list.component.html',
  styleUrls: ['./anicillary-list.component.scss']
})
export class AnicillaryListComponent implements OnInit, OnDestroy {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public activeFlightList!: string;
  private activeFlightId !: string;
  public isLoadingState !: Observable<boolean>;
  public dataSource = new MatTableDataSource<AnicillaryList>();
  public displayColumns: string[] = ['name', 'flight', 'service', 'action'];
  public anicillarySubscription!: Subscription;
  public serviceCategoriesList = serviceCategories;

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
    this.activeFlightList = FlightList[this.activeFlightId as keyof typeof FlightList];
    if (!this.activeFlightList) {
      this.router.navigate(['/dashboard']);
    }
    this.isLoadingState = this.store.select(state => state.loading.isLoading);
    this.store.dispatch(loadAnicillaryList());
    this.anicillarySubscription = this.store.select(getAllAnicillary(this.activeFlightId)).subscribe(service => {
      this.dataSource.data = service;
    });
  }

  openAddAnicillaryService(): void {
    const dialogRef = this.dialog.open(AddEditAnicillaryComponent, {
      data: {
        flightId: this.activeFlightId,
        isEdit: false,
      },
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(saveAnicillaryList({ anicillaryList: result }));
        this.notificationService.showNotification('Anicillary List Added Successfully', 'success');
      }
    });
  }

  doFilter(event: KeyboardEvent): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getFlight(flight: string): string | undefined {
    return flightList.find(ele => ele.id === flight)?.name;
  }

  getService(service: string): string | undefined {
    return serviceCategories.find(c => c.id === service)?.name;
  }

  handelEdit(id: string): void {
    const singleAnicillaryList: AnicillaryList | undefined = this.dataSource.data.find(ele => ele.id === id);
    const dialogRef = this.dialog.open(AddEditAnicillaryComponent, {
      data: {
        flightId: this.activeFlightId,
        isEdit: true,
        ...singleAnicillaryList
      },
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(updateAnicillaryList({ anicillaryList: result }));
        this.notificationService.showNotification('Anicillary List Updated Successfully', 'success');
      }
    });
  }

  handelDelete(id: string): void {
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
        this.store.dispatch(removeAnicillaryList({ id }))
        this.notificationService.showNotification('Anicillary List Removed Successfully', 'success');
        Swal.close();
      }
    })
  }


  filterByServiceColumn(event: MatSelectChange) {
    console.log(event.value);
    if (event.value) {
      this.dataSource.filter = event.value;
    } else {
      this.dataSource.filter = '';
    }
  }

  ngOnDestroy(): void {
    this.anicillarySubscription?.unsubscribe();
  }
}
