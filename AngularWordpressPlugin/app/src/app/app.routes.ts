import { Routes } from '@angular/router';
import { HomeComponent } from './posts/home/home.component';
import { UserComponent } from './posts/user/user.component';
import { PostComponent } from './posts/post/post.component';
import { CrudComponent } from './crud/crud.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'user', component: UserComponent },
    { path: 'post', component: PostComponent },
    { path: 'crud', component: CrudComponent }
];
