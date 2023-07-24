import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ReportCard } from '../models/report-card.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ReportCardService {
  private apiUrl = environment.apiBaseUrl +'/reportcard';

  constructor(private http: HttpClient) { }

  createReportCard(student_id: string): Observable<ReportCard> {
    const formData = new FormData();
    formData.append('student_id', student_id);
    return this.http.post<ReportCard>(this.apiUrl, formData);
  }

  getReportCard(student_id: string): Observable<ReportCard> {
    return this.http.get(`${this.apiUrl}/${student_id}`).pipe(
      map((response: any) => response as ReportCard)
    );
  }

  updateReportCard(reportcard: ReportCard): Observable<any> {
    const formData = new FormData();
    formData.append('math', reportcard.math.toString());
    formData.append('science', reportcard.science.toString());
    formData.append('english', reportcard.english.toString());
    formData.append('physicaled', reportcard.physical_ed.toString());
    formData.append('lunch', reportcard.lunch.toString());
    //TODO: forgot to create adding and removing classes implementation on backend will need to fix
    //formData.append('add_class_list', reportcard.addClassList.join());
    //formData.append('remove_class_list', reportcard.removeClassList.join());
    return this.http.put(`${this.apiUrl}/${reportcard.student_id}`, formData);
  }

  deleteReportCard(student_id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${student_id}`);
  }
}