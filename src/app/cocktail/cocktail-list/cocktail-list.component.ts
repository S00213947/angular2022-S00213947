import { Component, OnInit } from '@angular/core';
import { Cocktail } from 'src/app/cocktail';
import { CocktailService } from 'src/app/cocktail.service';
import { FakecocktailService } from 'src/app/fakecocktail.service';

@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.css']
})
export class CocktailListComponent implements OnInit {

  cocktailList: Cocktail[] = [];
  message: string = "";

  currentCocktail : Cocktail | undefined;
  showCocktailForm: boolean = false;

  constructor(private cocktailservice: CocktailService) { }
 // constructor(private cocktailservice: FakecocktailService) { }
  ngOnInit(): void {
    this.cocktailservice.getCocktails().subscribe({
      next: (value: Cocktail[] )=> this.cocktailList = value,
      complete: () => console.log("cocktail service finished"),
      error: (mess) => this.message = mess
    })
  }
  clicked (cocktail: Cocktail): void {
    this.currentCocktail = cocktail;
  }

  openAddCocktail(): void {
    this.currentCocktail = undefined;
    this.showCocktailForm = true;
  }

  openEditCocktail(): void {
    this.showCocktailForm = true;
  }

  dismissAlert() {
    this.message = "";
  }

  updateCocktail(id: string, cocktail: Cocktail): void {
    console.log('updating ');
    console.table (cocktail);
    this.cocktailservice.updateCocktail(id, cocktail)
      .subscribe({
        next: cocktail => {
          console.log(JSON.stringify(cocktail) + ' has been updated');
          this.message = " cocktail has been updated";
          this.ngOnInit();
          this.currentCocktail=undefined;
        },
        error: (err) => this.message = err
      }); 
  }

  cocktailFormClose(cocktail?: any): void {
    this.showCocktailForm = false;
    console.table(cocktail);
    if (cocktail == null) {
      this.message = "form closed without saving";
      this.currentCocktail = undefined
    }
    else if (this.currentCocktail == null) {
     this.addNewCocktail(cocktail);
    }
    else {
     this.updateCocktail(this.currentCocktail._id, cocktail)
    }
  }

addNewCocktail(newCocktail: Cocktail): void {
  console.log('adding new cocktail ' + JSON.stringify(newCocktail));
  this.cocktailservice.addCocktail({ ...newCocktail })
    .subscribe({
      next: cocktail => {
        console.log(JSON.stringify(cocktail) + ' has been added');
        this.message = "new cocktail has been added";
        this.ngOnInit();
      },
      error: (err) => this.message = err
    });
  }


  deleteCocktail() {
    console.log('deleting a drink ');
    if (this.currentCocktail) {
      this.cocktailservice.deleteCocktail(this.currentCocktail._id)
        .subscribe({
          next: cocktail => {
            console.log(JSON.stringify(cocktail) + ' has been deleted');
            this.message = "drink has been deleted";
            this.ngOnInit();
            this.currentCocktail=undefined;
          },
          error: (err) => this.message = err
        });
    }
  }
  
  isSelected(cocktail: Cocktail): boolean {
    if (!cocktail || !this.currentCocktail) {
      return false;
    }
    else {
      return cocktail._id === this.currentCocktail._id;
  
    }
  }
  
  
  }