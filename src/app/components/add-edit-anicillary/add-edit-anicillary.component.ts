import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { serviceCategories } from 'src/app/config/anicillary.config';
import flightList from 'src/app/config/flight.config';

@Component({
  selector: 'app-add-edit-anicillary',
  templateUrl: './add-edit-anicillary.component.html',
  styleUrls: ['./add-edit-anicillary.component.scss']
})
export class AddEditAnicillaryComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fbBuilder: FormBuilder, private dialogRef: MatDialogRef<AddEditAnicillaryComponent>) { }

  public anicillaryForm: any;
  public serviceItemCategory = serviceCategories;
  public flightList = flightList;

  ngOnInit(): void {
    this.initiateForm();
  }

  private initiateForm(): void {
    this.anicillaryForm = this.fbBuilder.group({
      name: [this.data.name || '', Validators.required],
      // flight: [(this.data.flightId || this.data.flightL) || '', Validators.required],
      flight: [{ value: this.data.flightId || this.data.flightL, disabled: true }, Validators.required],
      itemType: [this.data.itemType || '', Validators.required],
    })
  }

  get form() {
    return this.anicillaryForm;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.dialogRef.close({ ...this.anicillaryForm.getRawValue(), id: this.data.id, type: this.data.id ? 'EDIT' : 'ADD' });
    this.form.reset();
  }

}
