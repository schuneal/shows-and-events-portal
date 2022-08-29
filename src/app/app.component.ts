import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import * as _ from 'lodash';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  filterText: "Please select an option"
  showsData: any;
  ifShowsData = false;
  ifFilteredShow = false;
  ifShowDetails = false;
  filteredShow: any;
  showDetails: any;
  constructor(
  ) { }

  ngOnInit() {
    this.getShowsData()
  }
  async getShowsData() {
    try {
      this.ifShowDetails = false;
      this.ifFilteredShow = false;
      this.showsData = await axios.get<any>(
        'http://localhost:3000',
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      this.showsData = _.get(this.showsData, "data", []);
      this.ifShowsData = true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
      } else {
        console.log('unexpected error: ', error);
      }
    }
  }

  async onChange(value: any) {
    if (value === "Please Select") {
      this.ifShowDetails = false;
      this.ifFilteredShow = false;
      this.ifShowsData = true;
    } else {
      this.ifShowsData = false;
      this.ifShowDetails = false;
      try {
        this.filteredShow = await axios.get<any>(
          `http://localhost:3000/shows?tags=${value}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },
        );
        this.ifFilteredShow = true;
        this.filteredShow = _.get(this.filteredShow, "data", []);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('error message: ', error.message);
        } else {
          console.log('unexpected error: ', error);
        }
      }
    }
  }

  async getShowDetails(showId: any) {
    try {
      this.ifShowsData = false;
      this.ifFilteredShow = false;
      this.showDetails = await axios.get<any>(
        `http://localhost:3000/shows/${showId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      this.ifShowDetails = true;
      console.log("======>>>>",this.showDetails);
      this.showDetails = _.get(this.showDetails, "data", null)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
      } else {
        console.log('unexpected error: ', error);
      }
    }
  }

  displayDetails(){
    return JSON.stringify(this.showDetails)
  }
}