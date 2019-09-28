import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { urlApi } from '@/config';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  upload(data: any, type: string, action: string, id: string) {
    const uploadURL = `${urlApi}/${type}/${action}/${id}`;

    return this.http.post<any>(uploadURL, data);
  }
}
