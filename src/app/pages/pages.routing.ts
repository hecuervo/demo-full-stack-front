import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { DataBaseComponent } from './data-base/data-base.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: '/dashboard/dashboard1', pathMatch: 'full' },
      {
        path: 'data-base',
        component: DataBaseComponent,
        data: {
          title: 'Base de datos',
          urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Base de datos' }]
        }
      },
      {
        path: 'user',
        component: UserComponent,
        data: {
          title: 'Usuarios',
          urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Usuarios' }]
        }
      },
    ]
  }
];
