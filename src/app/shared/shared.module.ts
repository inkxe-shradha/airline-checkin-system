import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './components/layouts/header/header.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SideNavComponent } from './components/layouts/side-nav/side-nav.component';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CheckinFormComponent } from './components/checkin-form/checkin-form.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [HeaderComponent, SideNavComponent, LayoutsComponent, ProgressSpinnerComponent, CheckinFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatListModule,
    FlexLayoutModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatChipsModule,
    MatAutocompleteModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    LayoutsComponent,
    HeaderComponent,
    SideNavComponent,
    HttpClientModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatCardModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    ProgressSpinnerComponent,
    MatMenuModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDatepickerModule,
    CheckinFormComponent,
    MatCheckboxModule,
    MatChipsModule,
    MatAutocompleteModule
  ],
})
export class SharedModule { }
