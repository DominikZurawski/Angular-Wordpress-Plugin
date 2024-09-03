import { Component } from '@angular/core';
import { PostComponent } from "./post/post.component";
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [PostComponent, RouterOutlet, RouterLink],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {

}
