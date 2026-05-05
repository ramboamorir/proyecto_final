import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { teachersServices } from '../../../services/teachers';
import { studentsServices } from '../../../services/students';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teachers.html',
  styleUrl: './teachers.css',
})
export class Teachers {

  teachers: any[] = [];
  students: any[] = [];
  loading: boolean = false;
  isEditing: boolean = false;

  newTeacher = {
    code: 0,
    name: '',
    lastname: '',
    email: '',
    password: '',
    worksday: ''
  };

  constructor(
  private teachersService: teachersServices,
  private studentsService: studentsServices
) {
  this.getTeachers();
  this.getStudents(); // 👈 importante
}

  // =========================
  // GET
  // =========================
  getTeachers() {
    this.teachersService.getAll().subscribe({
      next: (res: any) => {
        const data = res?.data ?? res?.teachers ?? res;
        this.teachers = Array.isArray(data) ? data : [data];
        console.log('RESPUESTA BACKEND:', data);
      },
      error: (err) => console.error(err)
    });
  }

  getStudents() {
    this.studentsService.getAll().subscribe({
      next: (res: any) => {
        const data = res?.data ?? res?.students ?? res;
        this.students = Array.isArray(data) ? data : [data];

        this.buildCount(); // 👈 clave
      },
      error: (err) => console.error(err)
    });
  }
  teacherCountMap: any = {};

  buildCount() {
    this.teacherCountMap = {};

    this.students.forEach(s => {

      let teacherId = null;

      if (s.code_teacher) {
        teacherId = typeof s.code_teacher === 'object'
          ? s.code_teacher._id
          : s.code_teacher;
      }

      if (!teacherId) return;

      if (!this.teacherCountMap[teacherId]) {
        this.teacherCountMap[teacherId] = 0;
      }

      this.teacherCountMap[teacherId]++;
    });
  }

  // =========================
  // CREATE / UPDATE
  // =========================
  createTeacher() {

    this.loading = true;

    const payload: any = { ...this.newTeacher };

    if (!payload.password) {
      delete payload.password;
    }

    if (this.isEditing) {

      this.teachersService.update(this.newTeacher.code, payload)
        .subscribe({
          next: () => {
            this.getTeachers();
            this.resetForm();
            this.loading = false;
          },
          error: (err) => {
            console.error(err);
            this.loading = false;
          }
        });

    } else {

      this.teachersService.create(payload)
        .subscribe({
          next: () => {
            this.getTeachers();
            this.resetForm();
            this.loading = false;
          },
          error: (err) => {
            console.error(err);
            this.loading = false;
          }
        });

    }
  }

  // =========================
  // EDIT
  // =========================
  editTeacher(doc: any) {

    this.isEditing = true;

    this.newTeacher = {
      code: doc.code,
      name: doc.name,
      lastname: doc.lastname,
      email: doc.email,
      password: '',
      worksday: doc.worksday
    };
  }

  // =========================
  // DELETE
  // =========================
  deleteTeacher(code: number) {
    this.teachersService.delete(code).subscribe({
      next: () => this.getTeachers(),
      error: (err) => console.error(err)
    });
  }

  // =========================
  // RESET
  // =========================
  resetForm() {

    this.isEditing = false;

    this.newTeacher = {
      code: 0,
      name: '',
      lastname: '',
      email: '',
      password: '',
      worksday: ''
    };
  }

  // =========================
  // REFRESH
  // =========================
  refresh() {
    this.getTeachers();
  }

  getStudentCountByTeacher(teacherId: any): number {
    return this.students.filter(
      s => s.code_teacher?._id === teacherId || s.code_teacher === teacherId
    ).length;
  }

}
