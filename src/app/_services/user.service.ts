import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { urlApi } from '@/config';
import { User } from '@/_models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${urlApi}/user`);
  }

  getById(id: number) {
    return this.http.get(`${urlApi}/user/${id}`);
  }

  add(user: User) {
    return this.http.post(`${urlApi}/user/`, user);
  }

  update(user: User) {
    return this.http.put(`${urlApi}/user/${user.id_user}`, user);
  }

  delete(id: number) {
    return this.http.delete(`${urlApi}/user/${id}`);
  }
}
