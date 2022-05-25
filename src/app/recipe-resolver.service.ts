import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipes/recipe.model';
import { DataStorageService } from './data-storage.service';
import { RecipeService } from './recipes/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {

  constructor(private  Data:  DataStorageService, private RS: RecipeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.RS.getRecipes();

    if(recipes.length === 0) {
      return this.Data.deliverToDiner()
    } else {
      return recipes;
    }
   
  }
}
