import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import { ShareService } from '../share.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  constructor(private share:ShareService, private route:Router){}
  message: string = "";
  parentDiv: any;
  socket:any;
  name:any;
  audio:any;
  ngOnInit(): void {
    this.share.data$.subscribe((data:any) => {
      this.name = data;
    });
    if(!this.name){
      this.route.navigate(['/user']);
      return;
    }
    
    this.parentDiv = document.querySelector(".chat-messages");
    this.socket = io.connect('https://chat-api-bi8e.onrender.com',{transports:["websocket"]});
    this.start();
    this.audio = new Audio('../assets/ting.mp3');


  }
 

  send() {
    const childDiv = document.createElement("div");
    childDiv.classList.add("right");
    childDiv.classList.add("message");
    childDiv.innerHTML = `<b>You: </b> ${this.message}`;;
    this.parentDiv?.append(childDiv);
    const topSc = document.querySelector('.chat-area');
    if (topSc) {
      topSc.scrollTop = topSc?.scrollHeight;
    }
    this.socket.emit('send', this.message);
    this.message = "";
  }

  apnd(name: string, position: string) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageElement.innerHTML = name;
    this.parentDiv.appendChild(messageElement);
    if (position == 'left') {
      this.audio.play();
    }
  }

  start(){
    this.socket.emit('new-user-joined', this.name);
   this.socket.on('joined', (data:any)=>{
    if(data==null){
      data="user";
    }
    this.apnd(`<b>${data}</b>: joined chat`, 'left');
  }
  )
  this.socket.on('receive', (data:any)=>{
    this.apnd(`<b>${data.name}</b>: ${data.message}`, 'left');
  })
  
  this.socket.on('left', (name:any)=>{
    if(name==null){
      name="user";
    }
    this.apnd(`<b>${name}</b> left the chat`, 'left');
  })
  }

  enter(a:any){
  if(a.key=='Enter'){
    this.send();
  }
  }
  ngAfterViewInit(): void {
    
  }
}
