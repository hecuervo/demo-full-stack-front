import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlApi } from '@/config';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${urlApi}/data-base`);
  }

  getById(id: number) {
    return this.http.get(`${urlApi}/data-base/${id}`);
  }

  add(country: any) {
    return this.http.post(`${urlApi}/data-base/`, country);
  }

  update(country: any, id: number) {
    return this.http.put(`${urlApi}/data-base/${id}`, country);
  }

  delete(id: number) {
    return this.http.delete(`${urlApi}/data-base/${id}`);
  }
}
