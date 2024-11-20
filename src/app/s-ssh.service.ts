import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SSSHService {
  whoisAs: BehaviorSubject<any> = new BehaviorSubject("");

  public whois(domena: string){
    fetch(`/whois?domena=${domena}`)
      .then(e=>e.json())
      .then(e =>{
        console.log(e);
        this.whoisAs.next(e);
      })
  }
  constructor() { }
}
