import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CocktailComponent } from './cocktail/cocktail.component';
import { CocktailListComponent } from './cocktail/cocktail-list/cocktail-list.component';
import { CocktailRowComponent } from './cocktail/cocktail-row/cocktail-row.component';
import { CocktailDetailsComponent } from './cocktail/cocktail-details/cocktail-details.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CocktailFormComponent } from './cocktail/cocktail-form/cocktail-form.component';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from 'src/enviroments/enviroment';

@NgModule({
  declarations: [
    AppComponent,
    CocktailComponent,
    CocktailListComponent,
    CocktailRowComponent,
    CocktailDetailsComponent,
    CocktailFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthModule.forRoot({...environment.auth0,})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
