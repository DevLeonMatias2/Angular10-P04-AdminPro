import {NgModule} from '@angular/core';

// modules
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {PagesModule} from "./pages/pages.module";
import {AuthModule} from "./auth/auth.module";
import { ChartsModule } from 'ng2-charts'

//components
import {AppComponent} from './app.component';
import {NopagefoundComponent} from './nopagefound/nopagefound.component';

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    ChartsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
