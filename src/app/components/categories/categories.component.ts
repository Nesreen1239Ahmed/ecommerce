import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/shared/interfaces/categories';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{

  constructor(private _EcomdataService:EcomdataService){}

  categories:Categories[]=[]

  ngOnInit(): void {
      this._EcomdataService.getGategories().subscribe({
        next:(response)=>{
          console.log(response);

          this.categories= response.data
          

        },
        error:(err)=>{
          console.log(err);
          

        }
      })
  }


}
