import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommandModule} from "@angular/cli/src/command-builder/command-module";
import {CommonModule, DatePipe} from "@angular/common";
import {SurveyDTO} from "../../interface/surver-dto";
import {UserDetails} from "../../interface/user-dto";
import {EndpointsService} from "../../services/endpoints.service";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-fill-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './fill-form.component.html',
  styleUrl: './fill-form.component.css'
})
export class FillFormComponent {

  error: string = 'Example error message';
  isError: boolean = true;
  fullNames: string = '';
  email: string = '';
  dateOfBirth: string = '';
  contact: string = '';
  selectedFood: string = ''

  movieRate: string = ''
  radioRate: string = ''
  eatOutRate: string = ''
  tvRate: string = ''

  maxDate: string | null = '';
  isLoading: boolean = false

  constructor(private myService: EndpointsService, private datePipe: DatePipe) {
    this.maxDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }
  ngOnInit(): void {
  }

  saveData(): void {
    this.myService.saveData(this.getUser(), this.getSurvey(), "HOBBY").subscribe(response => {
      this.isLoading = false
      if(response == null){
        this.isError = true;
        this.error = "An error have occurred, Please verify your data and try again.";
        return;
      }


      this.isError = true;
      this.error = "Submitted.";


    });
  }

  onSubmit(){

    if(this.validateValues()){

      this.isLoading = true
      this.saveData()
    }else {
      console.log("all valies are required.")
    }


  }

  getSurvey(): SurveyDTO {
    return {
      type: 'HOBBY',
      dateOfBirth: this.dateOfBirth,
      favouriteFood: this.selectedFood,
      likeMovies: this.movieRate,
      listenToRadio: this.radioRate,
      eatOut: this.eatOutRate,
      watchTV: this.tvRate,
    };
  }

  getUser(): UserDetails{
    return {
      fullNames: this.fullNames,
      email: this.email,
      dateOfBirth: this.dateOfBirth,
      mobileNumber: this.contact
    }
  }

  validateValues(): boolean {
    var status = true

    if(this.fullNames == ''){
      status = false
    }

    if(this.email == ''){
      status = false
    }

    if(this.dateOfBirth == ''){
      status = false
    }

    if(this.contact == ''){
      status = false
    }

    if(this.fullNames == ''){
      status = false
    }

    if(this.selectedFood == ''){
      status = false
    }

    if(this.movieRate == ''){
      status = false
    }

    if(this.radioRate == ''){
      status = false
    }

    if(this.eatOutRate == ''){
      status = false
    }

    if(this.tvRate == ''){
      status = false
    }

    this.isError = status

    return status
  }

}
