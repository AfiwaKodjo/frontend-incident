export class Register{
  "id":number;
  "nom":string;
  "prenom":string;
  "email":string;
  "mot_de_passe":string;
  "role":string;
  

  constructor(nom:string, prenom:string, email:string, mot_de_passe:string, role:string){
    this.nom=nom;
    this.prenom=prenom;
    this.email=email;
    this.mot_de_passe=mot_de_passe;
    this.role=role;
}
getEmail():string{
    return this.email;
}
getNom():string{
    return this.nom;
}
getPrenom():string{
    return this.prenom;
}
getMot_de_passe():string{
    return this.mot_de_passe;
}
getRole():string{
    return this.role;
}

}