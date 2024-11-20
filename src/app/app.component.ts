import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SSSHService } from './s-ssh.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'admin';
  public whoisRes:string = "";
  constructor (private serv : SSSHService){

    serv.whoisAs.asObservable().subscribe(e=>{
      this.whoisRes = e.data;
      console.log(e);
      
    })
  }

  whois(event:Event):void{
    const domena = event.target as HTMLInputElement;
    console.log(domena.value);
    
     this.serv.whois(domena.value);
  }

}
