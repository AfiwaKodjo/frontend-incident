import { Procedure } from "../procedures/procedure";
import { Utilisateurs } from "../utilisateurs/update-utilisateurs/utilisateurs";

export class Materiel {
    idMateriel!: number;
    nomMateriel!: string;
    quantiteMateriel!: number;
    procedure!: Procedure;
    utilisateur!: Utilisateurs;

}
