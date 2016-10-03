import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { RunsComponent } from "./runs/runs.component";
import { RunComponent } from "./run/run.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/jobs', pathMatch: 'full'},
  { path: 'jobs',                  component: JobsComponent },
  { path: 'jobs/:job_name/runs',   component: RunsComponent },
  { path: 'runs',                  component: RunsComponent },
  { path: 'runs/:run_id',          component: RunComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
