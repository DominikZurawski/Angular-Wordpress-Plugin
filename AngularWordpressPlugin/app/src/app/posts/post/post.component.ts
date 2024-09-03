import { Component, OnInit, Inject, Renderer2, ElementRef } from '@angular/core';
import { PostService } from '../../post.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
    isBrowser: boolean;

    constructor(
      private postService: PostService,
      @Inject(PLATFORM_ID) private platformId: Object,
      private renderer: Renderer2,
      private el: ElementRef
    ) {
      this.isBrowser = isPlatformBrowser(this.platformId);
    }

    ngOnInit(): void {
      if (this.isBrowser) {
        this.postService.getPosts().subscribe((data) => {
          console.log('Posts fetched:', data);
          if (data && Array.isArray(data)) {
            this.renderPosts(data);
          } else {
            console.error('Data is not an array or is undefined');
          }
        }, (error) => {
          console.error('Error fetching posts:', error);
        });
      }
    }

    private renderPosts(posts: any[]): void {
      const container = this.el.nativeElement.querySelector('.posts-container');
      posts.forEach(post => {
        const postElement = this.renderer.createElement('div');
        this.renderer.addClass(postElement, 'post');

        const titleElement = this.renderer.createElement('h2');
        titleElement.innerHTML = post.title.rendered;
        this.renderer.appendChild(postElement, titleElement);

        const contentElement = this.renderer.createElement('div');
        contentElement.innerHTML = post.content.rendered;
        this.renderer.appendChild(postElement, contentElement);

        this.renderer.appendChild(container, postElement);
      });
    }
  }



