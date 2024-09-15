import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatasourceService } from '../service/datasource.service';
import { Datasource } from '../datasource.model';
import { User } from 'app/USERALLL/USERALL/user/user.model';
import { UserService } from 'app/USERALLL/USERALL/_services/user.service';
import { AuthService } from 'app/USERALLL/USERALL/_services/auth.service';

@Component({
  selector: 'app-update-datasource',
  templateUrl: './update-datasource.component.html',
  styleUrls: ['./update-datasource.component.scss']
})
export class UpdateDatasourceComponent implements OnInit {

  id: string = '';
  datasource: Datasource = new Datasource();
  public users: User[] = [];
  user: User = new User();
  currentUser: User | null = null; // Déclarez la variable currentUser de type User ou null
  updator_id: string ; // Nouveau champ creator_id
  passwordFieldType: string = 'password'; // Field type for password input
  passwordMaxLength:number = 8
  constructor(private route: ActivatedRoute, private router: Router,
    private authService: AuthService,private userService: UserService,private datasourceService: DatasourceService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.datasourceService.retrieveDatasource(this.id)
      .subscribe(data => {
        console.log(data);
        this.datasource = data;
      }, error => console.log(error));
this.reloadData2(); 
   } 

  updateDatasource() {
// Vérification de Type
    if (this.datasource.type.length === 0 ) {
      this.showErrorMessage('type', "Type cannot be empty");
      return;
    }
    
    if (this.datasource.index.length === 0 ) {
      this.showErrorMessage('index', "index cannot be empty");
      return;
    }

    

    // connection_port
    if (this.datasource.connection_port.toString().length > 4) {
      this.showErrorMessage('connection_port', "connection_port cannot exceed 4 characters");
      return;
    }
    if (this.datasource.connection_port === 0) {
      this.showErrorMessage('connection_port', "Connection port cannot be equal to 0");
      return;
    }
    
// Vérification de l'URL
if (!this.datasource.url.trim()) {
  this.showErrorMessage('url', "L'URL cannot be empty.");
  return;
}


            

// Vérification de User
if (this.datasource.user.length === 0 ) {
  this.showErrorMessage('user', "User cannot be empty");
  return;
}

    
// Vérification de Password
if (this.datasource.password.length === 0 ) {
  this.showErrorMessage('password', "password cannot be empty");
  return;
}


    const updateData = {
      ...this.datasource, // Copier toutes les autres propriétés du tableau de bord
      updator_id: this.updator_id // Ajouter l'updator_id
    };
  
    this.datasourceService.updateDatasource(this.id, updateData).subscribe(
      (data) => {
        console.log(data);
        this.gotoList();
      },
      (error) => {
        console.log(error);
        this.gotoList();
      }
    );
  }
// Méthode pour afficher un message d'erreur sous le champ correspondant
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

  onSubmit() {
    this.updateDatasource();
  }

  gotoList() {
    this.router.navigate(['/getAllDatasources']);
  }

  togglePasswordVisibility(): void {
    // Toggle password field type between 'password' and 'text'
    this.passwordFieldType = (this.passwordFieldType === 'password') ? 'text' : 'password';
  }
  reloadData2() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.id) {
      this.updator_id = currentUser.id;
      this.userService.retrieveUser(currentUser.id)
        .subscribe(
          data => {
            console.log(data);
            this.user = data;
            this.updator_id = this.user.username; // Update creator_id with the retrieved username
          },
          error => console.log(error)
        );
    }
  }

  cancelUpdate() {
    this.gotoList(); // Naviguer vers la liste des tableaux de bord
  }
}
