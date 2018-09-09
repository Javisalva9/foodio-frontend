import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  // uri = 'http://localhost:4000';
  uri = 'https://foodio-backend.herokuapp.com'
  constructor(private http: HttpClient) {
  }

  getIssues() {
    return this.http.get(`${this.uri}/issues`);
  }

  getIssueById(id) {
    return this.http.get(`${this.uri}/issues/${id}`);
  }

  addIssue(title, responsible, description, severity) {
    const issue = {
      title: title,
      responsible: responsible,
      description: description,
      severity: severity
    };
    return this.http.post(`${this.uri}/issues/add`, issue);
  }

  updateIssue(id, title, responsible, description, severity, status) {
   const issue = {
     title: title,
     responsible: responsible,
     description: description,
     severity: severity,
     status: status
   };
   return this.http.post(`${this.uri}/issues/update/${id}`, issue);
  }

   deleteIssue(id) {
     return this.http.get(`${this.uri}/issues/delete/${id}`);
   }
}
