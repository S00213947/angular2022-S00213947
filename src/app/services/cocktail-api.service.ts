import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Observable, observable, of, pipe, Subject, throwError } from 'rxjs';
import {catchError,tap, map} from 'rxjs/operators';
import { DrinkReponse } from '../cocktail/cocktailresponse';




@Injectable({
  providedIn: 'root'
})
export class CocktailApiService {

  readonly endpoint: string = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
  readonly random: string = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

  constructor(private http: HttpClient) { }


  getrandomData(){
    const emptyResults: DrinkReponse[] = [];
    return this.http.get(this.random).pipe(
        tap(data => console.log('Searchdata/error' + JSON.stringify(data))
        ),
        catchError(this.handleError)
      );
  }



getSearchData(searchTerm: string){
  const emptyResults: DrinkReponse[] = [];
  return this.http.get(this.endpoint  + searchTerm).pipe(
      tap(data => console.log('Searchdata/error' + JSON.stringify(data))
      ),
      catchError(this.handleError)
    );
}

private handleError(err:HttpErrorResponse){
  console.log('ApiService: ' + err.message);
  return throwError("error: " + err.message);
}


}

