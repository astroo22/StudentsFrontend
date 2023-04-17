import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:3000/students';

  constructor(private http: HttpClient) { }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, {
      name: student.Name,
      current_year: student.CurrentYear,
      graduation_year: student.GraduationYear,
      gpa: student.AvgGPA,
      age: student.Age,
      dob: student.Dob,
      enrolled: student.Enrolled
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
    const apiUrl = `${this.apiUrl}/${student.StudentID}`;
    const updateData = new FormData();
    updateData.append('current_year', student.CurrentYear.toString());
    updateData.append('graduation_year', student.GraduationYear.toString());
    updateData.append('gpa', student.AvgGPA.toString());
    updateData.append('age', student.Age.toString());
    updateData.append('enrolled', student.Enrolled.toString());
  
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
