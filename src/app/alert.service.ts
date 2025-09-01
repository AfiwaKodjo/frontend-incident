import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);

  constructor() { }

  // Méthode pour émettre une alerte
  showAlert(message: string) {
    this.alertSubject.next(message);
  }

  // Méthode pour obtenir un observable des alertes
  getAlertObservable(): Observable<string | undefined> {
    return this.alertSubject.asObservable();
  }
}
