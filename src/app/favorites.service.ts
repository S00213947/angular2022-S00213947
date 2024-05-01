import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/enviroments/enviroment';  // Adjust the path as necessary
import { Cocktail } from './cocktail';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private apiUrl = environment.apiUri; // Ensure this is defined in your environment files
  private favorites: string[] = [];

  constructor(private http: HttpClient) {
    this.loadFavorites();
  }

  private loadFavorites(): void {
    const storedFavorites = localStorage.getItem('favorites');
    this.favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
  }

  private saveFavorites(): void {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  addToFavorites(cocktail: Cocktail): Observable<any> {
    return this.http.post(`${this.apiUrl}/favorites`, cocktail);
}

removeFromFavorites(cocktailId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/favorites/${cocktailId}`);
}

  isFavorite(cocktailId: string): boolean {
    return this.favorites.includes(cocktailId);
  }

  getFavorites(): Observable<Cocktail[]> {
    return this.http.get<Cocktail[]>(`${this.apiUrl}/favorites`);

  }
}