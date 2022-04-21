import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";


@Injectable({
    providedIn: "root"
})
export class NotificationsService {
    constructor(
        private _snackBar: MatSnackBar
    ) { }

    public showNotification(type: string, message: string): void {
        this._snackBar.open(message, type, {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
            panelClass: ['bg-gradient', 'bg-success', 'text-white-50'],
        });
    }
}