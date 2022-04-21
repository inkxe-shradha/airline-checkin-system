import { removeAnicillaryList } from './../../store/actions/anicillary.action';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnicillaryList } from 'src/app/core/models/anicillary.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnicillaryService {
  saveAnicillary(action: { anicillaryList: AnicillaryList; } & import("@ngrx/store/src/models").TypedAction<"[Save] Save Anicillary List">) {
    throw new Error("Method not implemented.");
  }

  constructor(
    private http: HttpClient
  ) { }

  private baseUrl = environment.BASE_URL;

  getAnicillaryList() {
    return this.http.get<AnicillaryList[]>(this.baseUrl.concat('ancillaryList'));
  }

  saveAnicillaryList(anicillaryList: AnicillaryList): Observable<AnicillaryList> {
    if (anicillaryList?.id) {
      return this.http.put<AnicillaryList>(this.baseUrl.concat('ancillaryList/' + anicillaryList.id), anicillaryList);
    }
    return this.http.post<AnicillaryList>(this.baseUrl.concat('ancillaryList'), anicillaryList);
  }

  removeAnicillaryList(id: string | number) {
    return this.http.delete(this.baseUrl.concat('ancillaryList/' + id));
  }
}
