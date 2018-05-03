import { Routes, RouterModule } from '@angular/router';
import { ProblemListComponent } from "./components/problem-list/problem-list.component";
import { ProblemDetailComponent} from "./components/problem-detail/problem-detail.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'problems',
    pathMatch: 'full' //exactly match
  },
  {
    path: 'problems',
    component: ProblemListComponent
  },
  {
    path: 'problems/:id',
    component: ProblemDetailComponent
  },
  {
    path: '**', //any other routes redirect to 'problem'
    redirectTo: 'problems'
  }
]

export const routing = RouterModule.forRoot(routes);
