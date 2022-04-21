import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Passenger } from 'src/app/core/models/passenger.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  constructor(
    private http: HttpClient
  ) { }
  private baseUrl: string = environment.BASE_URL;
  getPassengerList() {
    return this.http.get<Passenger[]>(this.baseUrl.concat('passengers'));
  }

  savePassenger(passenger: Passenger) {
    return this.http.post<Passenger>(this.baseUrl.concat('passengers'), passenger);
  }

  updatePassenger(passenger: Passenger) {
    return this.http.put<Passenger>(this.baseUrl.concat('passengers/' + passenger.id), passenger);
  }

  deletePassenger(id: number | string) {
    return this.http.delete(this.baseUrl.concat('passengers/' + id));
  }
}
