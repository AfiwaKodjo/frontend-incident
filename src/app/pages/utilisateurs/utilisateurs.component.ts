import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Utilisateurs } from './utilisateurs';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { UtilisateursService } from './utilisateurs.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdateUtilisateursComponent } from './update-utilisateurs/update-utilisateurs.component';

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, UpdateUtilisateursComponent],
  providers:[UtilisateursService],
  template: `
  <div class="row">
        <div class="col-12 col-lg-3 mb-3 ml-auto">
        <!--div class="card">
          <div class="card-body">
            <div class="text-center px-xl-3">
              <button class="btn btn-success btn-block" type="button" data-toggle="modal" data-target="#exampleModal" (click)="onOpenModal(null!, 'add')">Ajout utilisateur</button>
            </div>
            </div-->
            <hr class="my-1">
        
            <div class="text-center px-xl-3">
                <!--label>Filter par Nom:</label-->
                <div><input type="search" (ngModelChange)="searchUtilisateurs(key.value )" #key="ngModel" ngModel
                 class="form-control w-100" id="searchNom " placeholder="search utilisateur..." name="key"  required></div>
              </div>
             
            </div>
        </div>
  <!--/div-->
  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
<div class="container" id="main-container">
    <div class="row">
        <div *ngFor="let utilisateurs of utilisateurs" class="col-md-6 col-xl-3">
            <div class="card m-b-30">
                <div class="card-body row">
                    <div class="col-6">
                        <a href=""><img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" class="img-fluid rounded-circle w-60"></a>
                    </div>
                    <div class="col-6 card-title align-self-center mb-0">
                        <h5>{{utilisateurs?.nom}} {{utilisateurs?.prenom}}</h5>
                        <p class="m-0">{{utilisateurs?.role}}</p>
                    </div>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><i class="fa fa-envelope float-right"></i>Email : <a href="#">{{utilisateurs?.email}}</a></li>
                    <li class="list-group-item" aria-label="Disabled input example" readonly><i class="bi bi-eye-fill float-right" ></i>Mot de passe : {{utilisateurs?.mot_de_passe}}</li>
                </ul>
                <div class="card-body">
                    <div class="float-right btn-group btn-group-sm">
                        <a (click)="updateUtilisateurs(utilisateurs.id)" data-bs-toggle="modal"  class="btn btn-primary tooltips" data-toggle="tooltip" data-original-title="Edit"><i class="fa fa-pencil"></i> </a>
                        <a (click)="onOpenModal(utilisateurs,'delete')" class="btn btn-secondary tooltips" data-placement="top" data-toggle="tooltip" data-original-title="Delete"><i class="fa fa-times"></i></a>
                    </div>
                    <ul class="social-links list-inline mb-0">
                        <li class="list-inline-item"><a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="" data-original-title="Facebook"><i class="fa fa-facebook-f"></i></a></li>
                        <li class="list-inline-item"><a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="" data-original-title="Twitter"><i class="fa fa-twitter"></i></a></li>
                        <li class="list-inline-item"><a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="" data-original-title="Skype"><i class="fa fa-skype"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
        <!--div class="col-md-6 col-xl-3">
            <div class="card m-b-30">
                <div class="card-body row">
                    <div class="col-6">
                        <a href=""><img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="" class="img-fluid rounded-circle w-60"></a>
                    </div>
                    <div class="col-6 card-title align-self-center mb-0">
                        <h5>Paul L. Goyette</h5>
                        <p class="m-0">Graphics Designer</p>
                    </div>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><i class="fa fa-envelope float-right"></i>Email : <a href="#">PaulGoyette@gmail.com</a></li>
                    <li class="list-group-item"><i class="fa fa-phone float-right"></i>Phone : 000 123-456</li>
                </ul>
                <div class="card-body">
                    <div class="float-right btn-group btn-group-sm">
                        <a href="#" class="btn btn-primary tooltips" data-placement="top" data-toggle="tooltip" data-original-title="Edit"><i class="fa fa-pencil"></i> </a>
                        <a href="#" class="btn btn-secondary tooltips" data-placement="top" data-toggle="tooltip" data-original-title="Delete"><i class="fa fa-times"></i></a>
                    </div>
                    <ul class="social-links list-inline mb-0">
                        <li class="list-inline-item"><a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="" data-original-title="Facebook"><i class="fa fa-facebook-f"></i></a></li>
                        <li class="list-inline-item"><a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="" data-original-title="Twitter"><i class="fa fa-twitter"></i></a></li>
                        <li class="list-inline-item"><a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="" data-original-title="Skype"><i class="fa fa-skype"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-md-6 col-xl-3">
            <div class="card m-b-30">
                <div class="card-body row">
                    <div class="col-6">
                        <a href=""><img src="https://bootdey.com/img/Content/avatar/avatar5.png" alt="" class="img-fluid rounded-circle w-60"></a>
                    </div>
                    <div class="col-6 card-title align-self-center mb-0">
                        <h5>Jonathan Smith</h5>
                        <p class="m-0">Graphics Designer</p>
                    </div>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><i class="fa fa-envelope float-right"></i>Email : <a href="#">PaulGoyette@gmail.com</a></li>
                    <li class="list-group-item"><i class="fa fa-phone float-right"></i>Phone : 000 123-456</li>
                </ul>
                <div class="card-body">
                    <div class="float-right btn-group btn-group-sm">
                        <a href="#" class="btn btn-primary tooltips" data-placement="top" data-toggle="tooltip" data-original-title="Edit"><i class="fa fa-pencil"></i> </a>
                        <a href="#" class="btn btn-secondary tooltips" data-placement="top" data-toggle="tooltip" data-original-title="Delete"><i class="fa fa-times"></i></a>
                    </div>
                    <ul class="social-links list-inline mb-0">
                        <li class="list-inline-item"><a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="" data-original-title="Facebook"><i class="fa fa-facebook-f"></i></a></li>
                        <li class="list-inline-item"><a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="" data-original-title="Twitter"><i class="fa fa-twitter"></i></a></li>
                        <li class="list-inline-item"><a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="" data-original-title="Skype"><i class="fa fa-skype"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-md-6 col-xl-3">
            <div class="card m-b-30">
                <div class="card-body row">
                    <div class="col-6">
                        <a href=""><img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" class="img-fluid rounded-circle w-60"></a>
                    </div>
                    <div class="col-6 card-title align-self-center mb-0">
                        <h5>Lily J. Ford</h5>
                        <p class="m-0">Graphics Designer</p>
                    </div>
                </div-->
                <!--ul class="list-group list-group-flush">
                    <li class="list-group-item"><i class="fa fa-envelope float-right"></i>Email : <a href="#">PaulGoyette@gmail.com</a></li>
                    <li class="list-group-item"><i class="fa fa-phone float-right"></i>Phone : 000 123-456</li>
                </ul-->
                <!--div class="card-body">
                    <div class="float-right btn-group btn-group-sm">
                        <a href="#" class="btn btn-primary tooltips" data-placement="top" data-toggle="tooltip" data-original-title="Edit"><i class="fa fa-pencil"></i> </a>
                        <a href="#" class="btn btn-secondary tooltips" data-placement="top" data-toggle="tooltip" data-original-title="Delete"><i class="fa fa-times"></i></a>
                    </div>
                    <ul class="social-links list-inline mb-0">
                        <li class="list-inline-item"><a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="" data-original-title="Facebook"><i class="fa fa-facebook-f"></i></a></li>
                        <li class="list-inline-item"><a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="" data-original-title="Twitter"><i class="fa fa-twitter"></i></a></li>
                        <li class="list-inline-item"><a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="" data-original-title="Skype"><i class="fa fa-skype"></i></a></li>
                    </ul>
                </div-->
            </div>
        </div>


    <!-- Ajout d'utilisateur-->
    <div class="modal fade" role="dialog" tabindex="-1" id="addUtilisateursModal">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Ajout d'utilisateur</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="py-1">
              <form class="form" novalidate="">
                <div class="row">
                  <div class="col">
                    <div class="row">
                      <div class="col">
                        <div class="form-group">
                          <label>Nom</label>
                          <input class="form-control" type="text" name="nom" placeholder="Nom" value="nom">
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label>Prenom</label>
                          <input class="form-control" type="text" name="prenom" placeholder="Prenom" value="prenom">
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="form-group">
                          <label>Email</label>
                          <input class="form-control" type="text" name="email" placeholder="user@exemple.com" value="email">
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col mb-3">
                        <div class="form-group">
                          <label>Mot de passe</label>
                          <input class="form-control" type="password" placeholder="••••••" name="mot_de_passe" value="mot_de_passe">  
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12 col-sm-6 mb-3">
                    <div class="mb-2"><b>Votre Rôle</b></div>
                    <div class="row">
                      <div class="col">
                        <div class="form-group">
                          <label>Rôle</label>                      
                          <input class="form-control" type="text" name="role" placeholder="Rôle" value="role">
                        </div>
                      </div>
                    </div>
                    <!--div class="row">
                      <div class="col">
                        <div class="form-group">
                          <label>New Password</label>
                          <input class="form-control" type="password" placeholder="••••••">
                        </div>
                      </div-->
                      <!--div class="col">
                        <div class="form-group">
                          <label>Confirm <span class="d-none d-xl-inline">Password</span></label>
                          <input class="form-control" type="password" placeholder="••••••"></div>
                      </div>
                    </div-->
                  </div>
                  <!--div class="col-12 col-sm-5 offset-sm-1 mb-3">
                    <div class="mb-2"><b>Keeping in Touch</b></div>
                    <div class="row">
                      <div class="col">
                        <label>Email Notifications</label>
                        <div class="custom-controls-stacked px-2">
                          <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="notifications-blog" checked="">
                            <label class="custom-control-label" for="notifications-blog">Blog posts</label>
                          </div>
                          <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="notifications-news" checked="">
                            <label class="custom-control-label" for="notifications-news">Newsletter</label>
                          </div>
                          <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="notifications-offers" checked="">
                            <label class="custom-control-label" for="notifications-offers">Personal Offers</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div-->
                </div>
                <div class="row">
                  <div class="col d-flex justify-content-end">
                    <button class="btn btn-primary" type="submit">Save Changes</button>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  
    
    <!--Supprimer un utilisateur-->
    <div class="modal fade" id="deleteUtilisateursModal" tabindex="-1" aria-labelledby="delete" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title fs-5" id="deleteUtilisateursModal">Suppression utilisateur</h5>
        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Êtes-vous sûr de vouloir supprimer l'utilisateur {{deleteUtilisateurs?.nom}} ?</p>     
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Non</button>
        <button type="button" (click)="onDeleteUtilisateurs(deleteUtilisateurs.id)" class="btn btn-primary" data-dismiss="modal">Oui</button>
      </div>
    </div>
  </div>
</div>
</div>
  `,
  styles: [
    `
    @import 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css';
    @import 'https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css';

    body{
      margin-top:20px;
      background: #f5f5f5;
  }
  .card {
      border: none;
      -webkit-box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
      box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
      margin-bottom: 30px;
  }
  .w-60 {
      width: 60px;
  }
  h1, h2, h3, h4, h5, h6 {
      margin: 0 0 10px;
      font-weight: 600;
  }
  .social-links li a {
      -webkit-border-radius: 50%;
      background-color: rgba(89,206,181,.85);
      border-radius: 50%;
      color: #fff;
      display: inline-block;
      height: 30px;
      line-height: 30px;
      text-align: center;
      width: 30px;
      font-size: 12px;
  }
  a {
      color: #707070;
  }`
  ]
})
export class UtilisateursComponent implements OnInit {
  public utilisateurs: Utilisateurs[] = [];
  public deleteUtilisateurs!: Utilisateurs;

  constructor(private utilisateursService: UtilisateursService, private router: Router){}
  ngOnInit(){
    this.getUtilisateurs();
  }

    public getUtilisateurs(): void{
      this.utilisateursService.getUtilisateurs().subscribe(
        (response: Utilisateurs[]) =>{
          this.utilisateurs = response;
          console.log(this.utilisateurs);
        },
        /*(error: HttpErrorResponse) =>{
          alert(error.message);
        }*/
      )
    }

   /* public onUpdateUtilisateurs(utilisateursId: number): void{
      this.utilisateursService.updateUtilisateurs(utilisateursId).subscribe(
        (response: Utilisateurs) => {
          console.log(response);
          this.getUtilisateurs();
        },
        (error: HttpErrorResponse) =>{
          alert(error.message);
        }
  
        );
      
    }*/ // Le vrai mais qui ne marche pas !!
    
    updateUtilisateurs(id: number){
      this.router.navigate(['admin/update-utilisateurs/id', id]);
    }


    public onDeleteUtilisateurs(utilisateursId: number): void{
      this.utilisateursService.deleteUtilisateurs(utilisateursId).subscribe(
        (response: void) => {
          console.log(response);
          this.getUtilisateurs();
        },
        (error: HttpErrorResponse) =>{
          console.log(error.message);
        }
  
        );
      
    }

    public searchUtilisateurs(key: string): void{
      console.log(key);
        const results: Utilisateurs[] = [];
        for (const utilisateurs of this.utilisateurs){
          if(utilisateurs.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1 
          || utilisateurs.prenom.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || utilisateurs.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || utilisateurs.role.toLowerCase().indexOf(key.toLowerCase()) !== -1){
            results.push(utilisateurs);
          }
        }
        this.utilisateurs = results;
        if(results.length === 0 || !key){
          this.getUtilisateurs();
        }

    }


    
   public onOpenModal(utilisateurs: Utilisateurs, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode ==='add'){
        button.setAttribute('data-target', '#addUtilisateursModal');
    }
    /*if(mode ==='edit'){
        this.editUtilisateurs = utilisateurs;
        button.setAttribute('data-target', '#updateUtilisateursModal');
    }*/
    if(mode ==='delete'){
      this.deleteUtilisateurs = utilisateurs;
        button.setAttribute('data-target', '#deleteUtilisateursModal');
    }
    container!.appendChild(button);
    button.click();
   }
    
  }


