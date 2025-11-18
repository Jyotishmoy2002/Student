export const MOCK_STUDENTS = [
  { id: 1, name: "Aisha Sharma", rollNumber: "CS101", semester: "5th", gpa: 3.8, grades: [
    { subject: "Data Structures", score: 92, grade: "A" },
    { subject: "Database Systems", score: 88, grade: "A-" },
    { subject: "Web Development", score: 95, grade: "A+" },
    { subject: "Linear Algebra", score: 85, grade: "B+" }
  ]},
  { id: 2, name: "Rohan Patel", rollNumber: "CS102", semester: "5th", gpa: 3.2, grades: [
    { subject: "Data Structures", score: 78, grade: "C+" },
    { subject: "Database Systems", score: 82, grade: "B-" },
    { subject: "Web Development", score: 88, grade: "B+" },
    { subject: "Linear Algebra", score: 75, grade: "C" }
  ]},
  { id: 3, name: "Priya Singh", rollNumber: "CS103", semester: "5th", gpa: 3.9, grades: [
    { subject: "Data Structures", score: 98, grade: "A+" },
    { subject: "Database Systems", score: 94, grade: "A" },
    { subject: "Web Development", score: 91, grade: "A-" },
    { subject: "Linear Algebra", score: 96, grade: "A+" }
  ]},
  { id: 4, name: "Vikram Menon", rollNumber: "CS104", semester: "5th", gpa: 3.5, grades: [
    { subject: "Data Structures", score: 85, grade: "B" },
    { subject: "Database Systems", score: 89, grade: "B+" },
    { subject: "Web Development", score: 92, grade: "A" },
    { subject: "Linear Algebra", score: 80, grade: "B-" }
  ]},
];

export const fetchStudents = () => new Promise(resolve => setTimeout(() => resolve(MOCK_STUDENTS), 600));