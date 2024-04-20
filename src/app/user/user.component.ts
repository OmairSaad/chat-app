import { Component } from '@angular/core';
import { ShareService } from '../share.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  constructor(private share:ShareService, private rout:Router){
    
  }
name:string='';
send(){
  this.share.sendData(this.name);
  this.rout.navigate(['/chat'])
}
hit(a:any){
if(a.key=="Enter"){
  this.send();
}
}
}
