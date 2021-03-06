import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WorklogBoardComponent } from './worklog-board/worklog-board.component';

const routes = [
    {
      path: 'signup',
      component: SignUpComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'dashboard',
      component: DashboardComponent
    },
    {
      path: 'worklog',
      component: WorklogBoardComponent
    },
    {
      path: '',
      redirectTo: "/worklog",
      pathMatch: "full"
    }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule],
  providers: [ ]
})
export class AppRoutingModule {
}