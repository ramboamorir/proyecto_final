import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { studentsServices } from '../../../services/students';
import { teachersServices } from '../../../services/teachers';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './students.html',
  styleUrl: './students.css',
})
export class Students {
  students: any[] = [];
  teachers: any[] = [];
  teacherMap: any = {};
  teacherMapWorksday: any = {};
  loading: boolean = false;
  isEditing: boolean = false;

  newStudent = {
    code: 0,
    name: '',
    lastname: '',
    age: 0,
    course: '',
    note: 0,
    code_teacher: null,
  };

  constructor(
    private studentsService: studentsServices,
    private teachersService: teachersServices,
    public authService: AuthService,
  ) {
    if (this.authService.canViewAcademicModules()) {
      this.getStudents();
      this.getTeachers();
    }
  }

  // =========================
  // GET STUDENTS
  // =========================
  // getStudents() {
  //   this.studentsService.getAll().subscribe({
  //     next: (res: any) => {
  //       const data = res?.data ?? res?.students ?? res;
  //       this.students = Array.isArray(data) ? data : [data];
  //     },
  //     error: (err) => console.error(err)
  //   });
  // }

  getStudents() {
    this.studentsService.getAll().subscribe({
      next: (res: any) => {
        const data = res?.data ?? res?.students ?? res;
        const studentsArray = Array.isArray(data) ? data : [data];

        // Si tu colección ya contiene solo estudiantes, puedes dejar esta línea.
        // Si contiene otros roles, filtra así:
        this.students = studentsArray.filter(
          (student) => student.role === 'Estudiante' || !student.role,
        );
      },
      error: (err) => console.error(err),
    });
  }

  // =========================
  // GET TEACHERS
  // =========================
  getTeachers() {
    this.teachersService.getAll().subscribe({
      next: (res: any) => {
        const data = res?.data ?? res?.teachers ?? res;
        this.teachers = Array.isArray(data) ? data : [data];

        this.buildTeacherMap();
        this.buildTeacherMapWorksday();
        // console.log(this.buildTeacherMap());
      },
      error: (err) => console.error(err),
    });
  }

  // =========================
  // CREATE / UPDATE
  // =========================
  createStudent() {
    this.loading = true;

    const payload: any = {
      code: Number(this.newStudent.code),
      name: this.newStudent.name,
      lastname: this.newStudent.lastname,
      age: Number(this.newStudent.age),
      course: this.newStudent.course,
      note: Number(this.newStudent.note),
      code_teacher: Number(this.newStudent.code_teacher),
    };

    if (this.isEditing) {
      this.studentsService.update(this.newStudent.code, payload).subscribe({
        next: () => {
          this.getStudents();
          this.resetForm();
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        },
      });
    } else {
      this.studentsService.create(payload).subscribe({
        next: (res) => {
          // console.log('CREADO:', res);
          this.getStudents();
          this.resetForm();
          this.loading = false;
        },
        error: (err) => {
          console.error('ERROR:', err);
          this.loading = false;
        },
      });
    }
  }

  // =========================
  // EDIT
  // =========================
  editStudent(est: any) {
    this.isEditing = true;

    this.newStudent = {
      code: est.code,
      name: est.name,
      lastname: est.lastname,
      age: est.age,
      course: est.course,
      note: est.note,
      code_teacher: est.code_teacher,
    };
  }

  // =========================
  // DELETE
  // =========================
  deleteStudent(code: number) {
    this.studentsService.delete(code).subscribe({
      next: () => this.getStudents(),
      error: (err) => console.error(err),
    });
  }

  // =========================
  // RESET
  // =========================
  resetForm() {
    this.isEditing = false;

    this.newStudent = {
      code: 0,
      name: '',
      lastname: '',
      age: 0,
      course: '',
      note: 0,
      code_teacher: null,
    };
  }

  // =========================
  // REFRESH
  // =========================
  refresh() {
    this.getStudents();
    this.getTeachers();
  }

  buildTeacherMap() {
    this.teacherMap = {};
    this.teacherMapWorksday = {};

    this.teachers.forEach((t) => {
      const id = t.code || t._id;
      this.teacherMap[id] = t.name;
      this.teacherMapWorksday[id] = t.worksday;
    });
  }
  buildTeacherMapWorksday() {
    this.teacherMapWorksday = {};

    this.teachers.forEach((t) => {
      const id = t.code || t._id;
      this.teacherMapWorksday[id] = t.worksday;
    });
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  get isUser(): boolean {
    return this.authService.isUser();
  }
}
