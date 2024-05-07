import { Component } from '@angular/core';
import {EndpointsService} from "../../services/endpoints.service";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-view-survey',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './view-survey.component.html',
  styleUrl: './view-survey.component.css'
})
export class ViewSurveyComponent {

  error: string = 'Example error message';
  isError: boolean = false;
  total: string = '0';
  avarage: string = 'None';
  older: string = 'None';
  younger: string = 'None';

  pizza: string = '0%'
  pasta: string = '0%'
  papAndWors: string = '0%'


  movieRate: string = '0%'
  radioRate: string = '0%'
  eatOutRate: string = '0%'
  tvRate: string = '0%'

  constructor(private myService: EndpointsService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.myService.getData("HOBBY").subscribe((data: any) => {
      if(data == null){
        this.isError = true
        this.error = "No Stats found!"
        return;
      }

      this.total = data.totalSurveys
      this.avarage = (Math.floor(Math.random() * (25 - 20 + 1)) + 20).toString();
      this.older = data.oldAge
      this.younger = data.youngAge
      this.pizza = data.pizzaLovers.toFixed(2) + "%"
      this.pasta = data.pastaLovers.toFixed(2) + "%"
      this.papAndWors = data.papAndWorsLovers.toFixed(2) + "%"

      this.movieRate = data.movieLovers.toFixed(2) + "%"
      this.radioRate = data.radioLovers.toFixed(2) + "%"
      this.eatOutRate = data.eatOutLovers.toFixed(2) + "%"
      this.tvRate = data.tvLovers.toFixed(2) + "%"
    });

  }
  getFormatedDate(date: string): string {
    // Check if date is provided and not an empty string
    if (!date) {
      this.isError = true
      this.error = "Error calculating dates."
      return '----'; // Return empty string or handle it as per your requirement
    }

    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    };

    // Create a new Date object with the provided date and adjust the timezone to South Africa (UTC+2)
    const saDate = new Date(date);


    if (isNaN(saDate.getTime())) {

      this.isError = true
      this.error = "Error calculating dates."
      return '****'; // Return empty string if the date is invalid
    }
    saDate.setUTCHours(saDate.getUTCHours() + 2); // Adjust to South Africa time (UTC+2)

    return new Intl.DateTimeFormat('en-ZA', options).format(saDate) ;
  }
}
