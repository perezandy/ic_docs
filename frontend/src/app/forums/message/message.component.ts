import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  
  booleanMap: Map<any, boolean> = new Map(); //For storing a boolean for each message

  isLoading: boolean = true;
  messageId!: string;
  replyText!: string;
  attachment: File | null = null;


  post: any;

  constructor(private route: ActivatedRoute, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.messageId = params['id'];

      console.log("attempting to request" + this.messageId);
      fetch(`http://localhost:3000/posts/${this.messageId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        return response.json();
      })
      .then(data => {
        this.post = data;
      

        console.log('Post details:', this.post);

        //The backend hasn't just returned a single message, but a nested tree of replies. We need to save each one into our array if we 
        //want each message to have its own boolean variable which we use to show and reveal the reply box. However, we have to be careful since
        //we will quickly eat up memory if we redundantly store parts of the tree.
        this.booleanMap.set(this.post._id, false);
        this.initializeBooleanMap();
        this.isLoading = false;



      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
    });
  }
  initializeBooleanMap(): void {
    const traverse = (post: any): void => {
      
      this.booleanMap.set(post._id, false);
  
      if (post.children && post.children.length > 0) {
        post.children.forEach((child: any) => {
          traverse(child);
        });
      }
    };
    


    traverse(this.post); 
  }

  toggleBox(post: any): void {
    
    //console.log("toggle called. Turning " + message + ", " + reply + " from " + this.booleanTree[message][reply] + " to " + !this.booleanTree[message][reply])
    
    this.booleanMap.set(post._id, !this.booleanMap.get(post._id));
  }

  
  reply(post: any, text: string): void {
    const token = localStorage.getItem('token');
    if (token === null) {
      return; // TODO: Give error code/ JWT expiration
    }
  
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    const JSONpayload = JSON.parse(decodedPayload);
  
    const postId = post._id;
    const userId = JSONpayload.userId;
  
    fetch(`http://localhost:3000/replyToPost/${postId}`, { 
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        text: this.replyText,
        user: userId,
        header: "",
      }),
    })
    .then(response => {
      if (response.status === 201) {
        console.log('Reply created successfully');
        // Fetch the updated parent post after creating the reply
        fetch(`http://localhost:3000/posts/${postId}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to fetch updated post');
            }
            return response.json();
          })
          .then(updatedPost => {
            // Update the original post with the data from the updated post
            Object.assign(post, updatedPost);
            console.log('Parent post updated successfully:', updatedPost);
          })
          .catch(error => {
            console.error('Error fetching updated post:', error);
          });
      } else if (response.status === 500) {
        console.log('Internal Server Error');
      } else {
        console.log('Unexpected response:', response);
      }
    })
    .catch(error => {
      console.error('Error creating reply:', error);
    });
  }

  likePost(post: any): void {
    const token = localStorage.getItem('token');
    if (token === null) {
        return; // TODO: Give error code/ JWT expiration
    }
  
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    const JSONpayload = JSON.parse(decodedPayload);
  
    const userId = JSONpayload.userId;
    const postId = post._id;
  
    fetch(`http://localhost:3000/liked-post/${postId}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            userId: userId,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to like/unlike post');
        }
        return response.json();
    })
    .then(updatedPostData => {
        // Update the post with the data from the backend
        post.likedby = updatedPostData.post.likedby;
    })
    .catch(error => {
        console.error('Error toggling like:', error);
    });
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

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'medium')!; 
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

}
