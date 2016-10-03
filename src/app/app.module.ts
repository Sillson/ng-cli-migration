import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, 
         appRoutingProviders } from './app-routing.module'

import { AppComponent } from './app.component';
import { JobsComponent } from './jobs/jobs.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { RunComponent } from './run/run.component';
import { RunsComponent } from './runs/runs.component';
import { LogTailDirective } from './log-tail.directive';
import { KeysPipe } from './keys.pipe';
import { OrderByPipe } from './order-by.pipe';
import { SearchPipe } from './search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    JobsComponent,
    ProgressBarComponent,
    RunComponent,
    RunsComponent,
    LogTailDirective,
    KeysPipe,
    OrderByPipe,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
