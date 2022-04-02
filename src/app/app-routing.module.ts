import {Routes, RouterModule} from '@angular/router';

import {FullComponent} from './layouts/full/full.component';
import {BlankComponent} from './layouts/blank/blank.component';
import {AuthGuard} from './_guards/auth.guard';
import {QuestionSetsComponent} from './question-sets/question-sets.component';
import {QuestionsComponent} from './questions/questions.component';

export const Approutes: Routes = [
  {
    path: '',
    component: BlankComponent,
    children: [
      {path: '', redirectTo: '/authentication/login', pathMatch: 'full'},
      {
        path: 'authentication',
        loadChildren:
          () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
      }
    ]
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'manage-question-sets',
        component: QuestionSetsComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'manage-questions',
        component: QuestionsComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/authentication/404'
  }
];
