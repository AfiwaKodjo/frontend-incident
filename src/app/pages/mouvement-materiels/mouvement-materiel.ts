import { Incident } from "../incident/incident";
import { Materiel } from "../materiels/materiel";
import { MesMouvements } from "./mes-mouvements";

export class MouvementMateriel {
    idMouvement_Materiel!: number;
    libelleMouvement_Materiel!:MesMouvements;
    quantiteMouvement_Materiel!: number;
    materiel!: Materiel;
    incident!: Incident;



}
