import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppRoutingModule} from "./app-routing.module";
import {PagesModule} from "./pages/pages.module";
import {SharedModule} from "./shared/shared.module";
 import {AuthModule} from "./auth/auth.module";

import { AppComponent } from './app.component';
import {NopagefoundComponent} from "./nopagefound/nopagefound.component";
import {FormsModule} from "@angular/forms";





@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,




],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    SharedModule,
    AuthModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
