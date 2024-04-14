import { Component } from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatPaginator,PageEvent } from '@angular/material/paginator';



@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrl: './forums.component.css'
})
export class ForumsComponent {
  header: string = '';
  body: string = '';
  attachment: File | null = null;
  hidden: boolean = true;
  recentPosts: any[] = [];

  postsPerPage : number = 5;
  totalPosts : number = 100;
  currentPage: number = 1;


  constructor(private datePipe: DatePipe) { }



  public postForm : FormGroup = new FormGroup({
    'headerControl' : new FormControl('',[Validators.required]),
    'bodyControl' : new FormControl('' , [Validators.required])
  });

  ngOnInit(): void {
    this.getRecentMessages();
  }
  formatDate(date: string): string {
    return this.datePipe.transform(date, 'medium')!; 
  }


  onFileSelected(event: any) {
    this.attachment = event.target.files[0];
  }
  submit() {
    const token = localStorage.getItem('token');
    if(token === null){
      return; //todo: Give error code/ JWT expiration
    }


    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    const JSONpayload = JSON.parse(decodedPayload);

    fetch('http://localhost:3000/createNewPost', { 
      headers: {
        'content-type': ' application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        header: this.header,
        text: this.body,
        user: JSONpayload.userId,
        attachment: this.attachment
      }),
    })
    .then((res) => {
      if(res.status == 201){
        console.log("Created Post");
      }
      if(res.status == 500){
        console.log("Internal Server Error");
      }
    })

    
  }
  hide(){
    this.hidden = !this.hidden;

  }

  getRecentMessages(): void {
    fetch(`http://localhost:3000/recent-posts?page=${this.currentPage}&limit=${this.postsPerPage}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch recent posts');
        }
        return response.json();
      })
      .then((data: any) => {
        this.recentPosts = data.posts;
        this.totalPosts = data.totalPosts;
      })
      .catch(error => {
        console.error('Error fetching recent posts:', error);
      });
  }

  pageChanged(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.postsPerPage = event.pageSize;
    this.getRecentMessages();
  }
  getUser() : string {
    const token = localStorage.getItem('token');

    if(token === null){
      return 'Guest';
    }

    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    const JSONpayload = JSON.parse(decodedPayload);
    
    return JSONpayload.username;
  }

  likedByUser(msg: any): boolean {
    const token = localStorage.getItem('token');
    if (token === null) {
      return false; 
    }
    
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    const JSONpayload = JSON.parse(decodedPayload);
    const userId = JSONpayload.userId;
    
    
    if (msg.likedby && msg.likedby.includes(userId)) {
      return true; // User has already liked the message
    } 
    return false;
  }





}
