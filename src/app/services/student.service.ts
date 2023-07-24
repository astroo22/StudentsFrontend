import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = environment.apiBaseUrl +'/students';

  constructor(private http: HttpClient) { }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, {
      name: student.name,
      current_year: student.current_year,
      graduation_year: student.graduation_year,
      gpa: student.avg_gpa,
      age: student.age,
      dob: student.dob,
      enrolled: student.enrolled
    });
}

  getStudents(): Observable<Student[]> {
    return this.http.get(this.apiUrl, { responseType: 'arraybuffer' }).pipe(
      map((response: ArrayBuffer) => {
        const decodedResponse = new TextDecoder().decode(response);
        const students = JSON.parse(decodedResponse) as Student[];
        return students.slice(0, 10); // Only return the first 10 students
      })
    );
  }
  getStudent(studentId: string): Observable<Student> {
    const url = `${this.apiUrl}/${studentId}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        return response as Student;
      })
    );
  }

  updateStudent(student: Student): Observable<Student> {
    const apiUrl = `${this.apiUrl}/${student.student_id}`;
    const updateData = new FormData();
    updateData.append('current_year', student.current_year.toString());
    updateData.append('graduation_year', student.graduation_year.toString());
    updateData.append('gpa', student.avg_gpa.toString());
    updateData.append('age', student.age.toString());
    updateData.append('enrolled', student.enrolled.toString());
  
    return this.http.put(apiUrl, updateData).pipe(
      map((response: any) => {
        const updatedStudent: Student = response;
        return updatedStudent;
      })
    );
  }

  deleteStudent(studentId: string): Observable<Student> {
    const url = `${this.apiUrl}/${studentId}`;
    return this.http.delete(url).pipe(
      map((response: any) => {
        return response as Student;
      })
    );
  }
}
