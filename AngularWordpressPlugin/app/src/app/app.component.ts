import { Component, Input, OnInit } from '@angular/core';
import { CrudComponent } from "./crud/crud.component";
import { CommonModule } from '@angular/common';
import { PostsComponent } from "./posts/posts.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CrudComponent, CommonModule, PostsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
    @Input() component: string | undefined = 'posts';
    showPosts: boolean = false;
    showCrud: boolean = false;

    ngOnInit(): void {
      console.log('Component:', this.component);
      this.updateComponentVisibility();
    }

    updateComponentVisibility(): void {
      this.showPosts = this.component === 'posts';
      this.showCrud = this.component === 'crud';
    }
}
