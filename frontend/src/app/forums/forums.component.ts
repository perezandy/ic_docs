import { Component } from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';




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

  public postForm : FormGroup = new FormGroup({
    'headerControl' : new FormControl('',[Validators.required]),
    'bodyControl' : new FormControl('' , [Validators.required])
  });

  ngOnInit(): void {
    this.getRecentMessages();
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
    fetch('http://localhost:3000/recent-posts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch recent posts');
        }
        
        return response.json();
      })
      .then((posts: any[]) => {
        this.recentPosts = posts;
      })
      .catch(error => {
        console.error('Error fetching recent posts:', error);
      });
  }



}
