import { Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
    {path:'', component:UserComponent},
    {path:"chat", component:ChatComponent},
    {path:"user", component:UserComponent},
    {path:'**', component:UserComponent}
];
