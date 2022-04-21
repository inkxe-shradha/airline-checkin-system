import { Passenger } from 'src/app/core/models/passenger.model';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AnicillaryList } from 'src/app/core/models/anicillary.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { seatList } from 'src/app/config';
@Component({
  selector: 'app-checkin-form',
  templateUrl: './checkin-form.component.html',
  styleUrls: ['./checkin-form.component.scss']
})
export class CheckinFormComponent implements OnInit, OnChanges {

  @Input() isAnicillaryForm: boolean = false;
  @Input() passengerList!: Passenger[] | null;
  @Input() anicillaryList!: AnicillaryList[] | null | undefined;
  @Input() selectedFlight!: string | undefined;
  @Input() filterKeys: { isWheelChair: boolean, isSpecialMeal: boolean, isInfant: boolean, checkedIn: boolean } = { isWheelChair: false, isSpecialMeal: false, isInfant: false, checkedIn: false };

  @Output() submitUpdatedCheckedIn: EventEmitter<Passenger> = new EventEmitter();
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('serviceInput', { static: false }) serviceInput!: ElementRef<HTMLInputElement>;

  filteredService!: Observable<AnicillaryList[]>;
  public selectedSeat!: string | number | undefined;
  public checkedInform: any;
  public seatList = seatList;
  public formAncillaryLis: string[] = [];

  constructor(
    private fbBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.initFilterChip();
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes['selectedFlight']) {
      this.resetForm();
    }
  }

  private initForm(): void {
    this.checkedInform = this.fbBuilder.group({
      checkedIn: [{ value: false, disabled: true }],
      seat: [{
        value: '',
        disabled: true
      }],
      name: [{
        value: '',
        disabled: true
      }],
      passport: [
        {
          value: '',
          disabled: true
        }
      ],
      address: [
        {
          value: '',
          disabled: true
        }
      ],
      dob: [{
        value: '',
        disabled: true
      }],
      isWheelChair: [{
        value: false, disabled: true
      }],
      isSpecialMeal: [{
        value: false, disabled: true
      }],
      isInfant: [{
        value: false, disabled: true
      }],
      anicillaryServices: ""
    })
  }

  get form() {
    return this.checkedInform;
  }

  private initFilterChip(): void {
    this.filteredService = this.form.get('anicillaryServices').valueChanges.pipe(
      startWith(null),
      map((ele: string | null) => (ele ? this._filter(ele) : this.anicillaryList?.slice())),
    );
  }

  onSubmit(): void {
    this.submitUpdatedCheckedIn.emit({ ...this.checkedInform.getRawValue(), addedAncillaryServices: this.formAncillaryLis, id: this.selectedSeat, flight: this.selectedFlight });
  }

  getFilterPassengerList(): Passenger[] {
    return this.passengerList ? this.passengerList.filter((filter: any) => Object.entries(this.filterKeys).every(([key, value]) => !value || filter[key])) : [];
  }

  remove(id: string): void {
    const index = this.formAncillaryLis.indexOf(id);
    console.log(this.formAncillaryLis);

    if (index >= -0) {
      this.formAncillaryLis.splice(index, 1);
    }
  }


  selected(event: MatAutocompleteSelectedEvent): void {
    this.formAncillaryLis.push(event.option.value);
    if (this.serviceInput) this.serviceInput.nativeElement.value = '';
    this.form.get('anicillaryServices').setValue(null);
  }

  private _filter(value: string): AnicillaryList[] {
    const filterValue = value.toLowerCase();
    return this.anicillaryList ? this.anicillaryList.filter(service => service.name.toLocaleLowerCase().indexOf(filterValue) === 0) : [];
  }

  selectedLineItem(item: Passenger) {
    this.selectedSeat = item.id;
    this.form.setValue({
      checkedIn: item.checkedIn,
      seat: item.seat,
      name: item.name,
      passport: item.passport,
      address: item.address,
      dob: item.dob,
      isWheelChair: item.isWheelChair,
      isSpecialMeal: item.isSpecialMeal,
      isInfant: item.isInfant,
      anicillaryServices: "",
    });
    this.formAncillaryLis = [...item.addedAncillaryServices || []];
    if (this.serviceInput) this.serviceInput.nativeElement.value = '';
    this.form.get('anicillaryServices').setValue(null);
    // Remove disable property
    if (!this.isAnicillaryForm) {
      this.form.get('seat').enable();
      this.form.get('checkedIn').enable();
      this.form.get('isWheelChair').enable();
      this.form.get('isInfant').enable();
    }
    this.form.get('isSpecialMeal').enable();
  }

  public disabledSeats(seat: string): boolean {
    return this.passengerList ? this.passengerList.some((ele) => ele.seat === seat) : false;
  }

  resetForm(): void {
    this.form?.reset();
    this.selectedSeat = "";
    this.form?.get('seat').disable();
    this.form?.get('checkedIn').disable();
    this.form?.get('isWheelChair').disable();
    this.form?.get('isSpecialMeal').disable();
    this.form?.get('isInfant').disable();
    this.formAncillaryLis = [];
    if (this.serviceInput) this.serviceInput.nativeElement.value = '';
    this.form?.get('anicillaryServices').setValue(null);
  }
}
