const uniqueIdsStudents = [];
const uniqueIdsCourses = [];
const arrayOfCourses = [];
const arrayOfStudents = [];
/*
 * Course
 */
function Course(id, name, assignedTeacher, studentList) {
  //   Validate if a property is missing
  if (!id || !name || !assignedTeacher || !studentList) {
    return console.error('Required property is missing');
  }

  //   Validate if a property type is other than the requested one
  if (
    typeof id !== 'number' ||
    typeof name !== 'string' ||
    typeof assignedTeacher !== 'string' ||
    !Array.isArray(studentList)
  ) {
    return console.error('Invalid property type');
  }

  //   Validate if id is unique
  if (uniqueIdsCourses.includes(id)) {
    return console.error(`Course with id ${id} already exists`);
  }
  uniqueIdsCourses.push(id);
  arrayOfCourses.push(this);

  this.id = id;
  this.name = name;
  this.assignedTeacher = assignedTeacher;
  this.studentList = studentList;

  console.log('Course was successfully created');
}

/*
 * Method to add a student to a course
 */
Course.prototype.addStudent = function (student) {
  if (
    this.studentList.some(
      (studentInCourse) => studentInCourse.id === student.id
    )
  ) {
    return console.error('Student exist in this course');
  }
  student[this.name + 'Grade'] = null; //a grade for that course will be assigned to that student
  this.studentList.push(student);
  console.log(
    `Student with id ${student.id} was successfully added to this course`
  );
};

/*
 * Method to delete a student from a course
 */
Course.prototype.deleteStudent = function (idOfStudent) {
  if (!this.studentList.some((student) => student.id === idOfStudent)) {
    return console.error(
      'Student id is invalid resulting in failing to delete the specified student from this course'
    );
  }

  this.studentList = this.studentList.filter(
    (student) => student.id !== idOfStudent
  );

  console.log(
    `Student with id ${idOfStudent} was successfully deleted from this course`
  );
};

/*
 * Method to print all students from a course
 */
Course.prototype.printStudentList = function () {
  console.log(this.studentList);
};

/*
 *  Student
 */
function Student(
  id,
  firstName,
  lastName,
  gender,
  address = null,
  hobbies = null
) {
  //   Validate if a property is missing
  if (!id || !firstName || !lastName || !gender) {
    toastController('error', 'Required property is missing');
    return console.error('Required property is missing');
  }

  //   Validate if a required property type is other than the requested one
  if (
    typeof id !== 'number' ||
    typeof firstName !== 'string' ||
    typeof lastName !== 'string' ||
    typeof gender !== 'string'
  ) {
    toastController('error', 'Invalid property type');
    return console.error('Invalid property type');
  }

  //   Validate an additional property
  if (address && typeof address !== 'string') {
    toastController('error', 'Invalid additional property type');
    return console.error('Invalid additional property type');
  }

  //   Validate an additional property
  if (hobbies && typeof hobbies !== 'string') {
    toastController('error', 'Invalid additional property type');
    return console.error('Invalid additional property type');
  }

  //   Validate if id is unique
  if (uniqueIdsStudents.includes(id)) {
    toastController('error', `Student with id ${id} already exists`);
    return console.error(`Student with id ${id} already exists`);
  }
  uniqueIdsStudents.push(id);
  arrayOfStudents.push(this);

  // Constructor
  this.id = id;
  this.firstName = firstName;
  this.lastName = lastName;
  this.gender = gender;
  this.address = address;
  this.hobbies = hobbies;

  console.log('Student was successfully created');
}
