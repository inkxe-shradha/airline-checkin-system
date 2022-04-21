import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import flightList, { seatList } from 'src/app/config/flight.config';
import { DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import { formatDate } from '@angular/common';
export const PICK_FORMATS = {
  parse: { dateInput: { month: 'short', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' }
  }
};

class PickDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return formatDate(date, 'dd-MMM-yyyy', this.locale);;
    } else {
      return date.toDateString();
    }
  }
}
@Component({
  selector: 'app-add-edit-passenger-form',
  templateUrl: './add-edit-passenger-form.component.html',
  styleUrls: ['./add-edit-passenger-form.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS }
  ]
})

export class AddEditPassengerFormComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fbBuilder: FormBuilder, private dialogRef: MatDialogRef<AddEditPassengerFormComponent>) { }
  passengerForm: any;
  public flightList = flightList;
  public availableSeats = seatList;
  ngOnInit(): void {
    this.initiateForm();
  }

  private initiateForm(): void {
    this.passengerForm = this.fbBuilder.group({
      name: [this.data.name || '', Validators.required],
      passport: [this.data.passport || ''],
      dob: [this.data.dob ? new Date(this.data.dob) : ''],
      address: [this.data.address || ''],
      flight: [this.data.flightId || ''],
      seat_No: [this.data.seat || '', Validators.required],
      isWheelChair: [this.data.isWheelChair || false],
      isInfant: [this.data.isInfant || false],
      isSpecialMeal: [this.data.isSpecialMeal || false]
    });
  }

  get form() {
    return this.passengerForm;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    const dob = new Date(this.passengerForm.value.dob).toLocaleDateString();
    this.dialogRef.close({ ...this.passengerForm.value, dob, id: this.data.id, type: this.data.id ? 'EDIT' : 'ADD' });
    this.form.reset();
  }

  isOptionEnabled(option: string): boolean {
    return this.data.occupiedSeats.includes(option);
  }
}
