import { Component, OnInit } from '@angular/core';
import { ChartService } from '../service/chart.service';
import { Router } from '@angular/router';
import { charttype, charttypeLabelMapping } from '../charttype.model';
import { Chart } from '../chart.model';
import { User } from 'app/USERALLL/USERALL/user/user.model';
import { AuthService } from 'app/USERALLL/USERALL/_services/auth.service';
import { UserService } from 'app/USERALLL/USERALL/_services/user.service';

@Component({
  selector: 'app-add-chart',
  templateUrl: './add-chart.component.html',
  styleUrls: ['./add-chart.component.scss']
})
export class AddChartComponent implements OnInit {
  public charttypeLabelMapping = charttypeLabelMapping;
  public Charttypes = Object.values(charttype);

  chart: Chart = {
    title: '',
    //type: undefined,
    type: charttype.Line,
    x_axis: '',
    y_axis: '',


  };
  submitted = false;
  public users: User[] = [];
  updator_id:string;
  user: User = new User();
  currentUser: User | null = null; // Déclarez la variable currentUser de type User ou null
  creator_id: string ; // Nouveau champ creator_id
  navbarTitle: string = 'List'; // Provide a default value for navbarTitle
  constructor(private chartService: ChartService, private router: Router,private authService: AuthService,private userService: UserService) { }
  ngOnInit(): void {
    this.reloadData2();
  }

  
  
  reloadData2() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.id) {
      this.creator_id = currentUser.id;
      this.userService.retrieveUser(currentUser.id)
        .subscribe(
          data => {
            console.log(data);
            this.user = data;
            this.creator_id = this.user.username; // Update creator_id with the retrieved username
          },
          error => console.log(error)
        );
    }
  }
  
  saveChart(): void {


    if (this.chart.title.length === 0 ) {
      this.showErrorMessage('title', "title cannot be empty");
      return;
    }
    

    if (this.chart.x_axis.length === 0 ) {
      this.showErrorMessage('x_axis', "x_axis cannot be empty");
      return;
    }
   
    if (this.chart.y_axis.length === 0 ) {
      this.showErrorMessage('y_axis', "y_axis cannot be empty");
      return;
    }


    const data = {
      title: this.chart.title,
      type: this.chart.type,
      x_axis: this.chart.x_axis,
      y_axis: this.chart.y_axis,


            
      creator_id: this.creator_id, // Add creator_id when saving the datasource
      updator_id:this.creator_id

    
    };

    this.chartService.createChart(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => {
          console.error(e);
          // Handle errors appropriately
        }
      });
  }
  showErrorMessage(inputId: string, message: string): void {
    const inputElement = document.getElementById(inputId);
    const errorDiv = inputElement.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('text-danger')) {
      errorDiv.textContent = message;
    } else {
      const div = document.createElement('div');
      div.textContent = message;
      div.classList.add('text-danger');
      inputElement.insertAdjacentElement('afterend', div);
    }
  }  
  newChart(): void {
    this.submitted = false;
    this.chart = {
      title: '',
      type: charttype.Line,
      x_axis: '',
      y_axis: '',
     
    };
  }

  gotoList() {
    this.router.navigate(['/getAllCharts']); // Make sure the URL is correct for the list of datasources
  }
}
