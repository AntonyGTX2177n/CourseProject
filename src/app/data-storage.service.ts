import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './recipes/recipe.model';
import { RecipeService } from './recipes/recipe.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private RS: RecipeService) { }

  kitchenWarehouse() {
    const recipes = this.RS.getRecipes();
    this.http.put(
      'https://antony-s-kitchen-default-rtdb.firebaseio.com/recipes.json',
       recipes
       )
       .subscribe(response => {
          console.log(response);
       })
  }

  deliverToDiner(){
   return  this.http
    .get<Recipe[]>('https://antony-s-kitchen-default-rtdb.firebaseio.com/recipes.json'
    )
    .pipe(map(recipes =>{
      return recipes.map(recipe => {
        return {
          ...recipe,
           ingredients: recipe.ingredients? recipe.ingredients : []
        }
      });
    }),
      tap(recipes => {
        this.RS.prepareFood(recipes);
      })
    )
  }
}
