import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { catchError, throwError } from 'rxjs';

// PrimeNG Components
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea'; // Changed back to module for PrimeNG 17
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ListboxModule } from 'primeng/listbox';
import { PaginatorModule } from 'primeng/paginator';

interface UserMessage {
  id: number;
  name: string;
  message: string;
  createdAt: string;
}

interface ApiResponse<T> {
  statusCode: number;
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    HttpClientModule,
    CardModule,
    InputTextModule,
    InputTextareaModule, // Changed back to module for PrimeNG 17
    ButtonModule,
    MessageModule,
    MessagesModule,
    ListboxModule,
    PaginatorModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  apiMessage = '';
  apiItems: number[] = [];
  
  messages: UserMessage[] = [];
  totalRecords = 0;
  rows = 3;
  currentPage = 0;
  
  newMessage = {
    name: '',
    message: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log('App component initialized');
    // Get the hello message
    this.getHelloMessage();
    
    // Load messages
    this.loadMessages();
  }

  getHelloMessage() {
    console.log('Fetching hello message from API...');
    this.http.get<{message: string, items: number[]}>('/api/messages/hello')
      .pipe(
        catchError(error => {
          console.error('Error fetching hello message:', error);
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (data) => {
          console.log('Hello message received:', data);
          this.apiMessage = data.message;
          this.apiItems = data.items;
        },
        error: (error) => {
          console.error('Error in hello message subscription:', error);
        }
      });
  }

  loadMessages(page = 0) {
    this.currentPage = page;
    const pageNumber = page + 1; // API uses 1-based indexing
    console.log(`Loading messages for page ${pageNumber}...`);
    
    this.http.get<ApiResponse<UserMessage[]>>(`/api/messages?page=${pageNumber}&limit=${this.rows}`)
      .pipe(
        catchError(error => {
          console.error('Error fetching messages:', error);
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (response) => {
          console.log('Messages received:', response);
          this.messages = response.data;
          if (response.meta) {
            this.totalRecords = response.meta.total;
          }
        },
        error: (error) => {
          console.error('Error in messages subscription:', error);
        }
      });
  }

  onPageChange(event: any) {
    this.loadMessages(event.page);
  }

  submitMessage() {
    if (!this.newMessage.name || !this.newMessage.message) {
      return;
    }

    this.http.post('/api/messages', this.newMessage).subscribe(
      () => {
        // Reset form
        this.newMessage = { name: '', message: '' };
        // Reload messages to see the new one
        this.loadMessages(this.currentPage);
      },
      error => {
        console.error('Error submitting message:', error);
      }
    );
  }

  createTestData() {
    this.http.post('/api/messages/test-data', {}).subscribe(
      () => {
        // Reload messages to see the test data
        this.loadMessages(0); // Reset to first page
      },
      error => {
        console.error('Error creating test data:', error);
      }
    );
  }
}
