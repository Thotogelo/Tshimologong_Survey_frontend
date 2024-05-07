import { Routes } from '@angular/router';
import {FillFormComponent} from "./components/fill-form/fill-form.component";
import {ViewSurveyComponent} from "./components/view-survey/view-survey.component";

export const routes: Routes = [
  { path: 'fill-form', component: FillFormComponent },
  { path: 'view-survey', component: ViewSurveyComponent },
  { path: '', redirectTo: '/fill-form', pathMatch: 'full' }];
