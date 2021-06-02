import * as Provider from './provider.js';
import * as UI from './ui.js';

let selectedCourse;

UI.DOMElements.coursesRow.addEventListener('click', (event) => {
  const target = event.target;

  if (target.classList.contains('btn-course')) {
    const elements = UI.DOMElements.coursesRow.children;
    for (let i = 0; i < elements.length; ++i) {
      elements[i].classList.remove('active');
    }
    target.classList.add('active');

    const selectedCourseId = target.getAttribute('data-id');
    selectedCourse = arrayOfCourses.find(
      (course) => course.id === Number(selectedCourseId)
    );

    UI.DOMElements.courseTitleSpan.innerHTML = `${selectedCourse.name} course`;
    UI.DOMElements.courseTeacherSpan.innerHTML = selectedCourse.assignedTeacher;

    UI.renderTable(selectedCourse);

    UI.renderSelect(selectedCourse);
  }
});

UI.DOMElements.tableBody.addEventListener('click', async (event) => {
  const deleteIcon = event.target;
  const tr = event.target.parentNode.parentNode;
  const idOfStudent = deleteIcon.getAttribute('data-id');

  if (deleteIcon.classList.contains('fa-trash')) {
    selectedCourse.deleteStudent(Number(idOfStudent));
    await Provider.coursePutRequest(selectedCourse);

    UI.DOMElements.tableBody.removeChild(tr);
  }

  if (!selectedCourse.studentList.length) {
    UI.DOMElements.tableBody.innerHTML = `
    <tr>
        <td colspan="7">No data to display</td>
    </tr>
    `;
  }

  toastController(
    'success',
    `Student with id ${idOfStudent} was successfully deleted from this course`
  );
});

UI.DOMElements.select.addEventListener('change', async (event) => {
  if (!selectedCourse) {
    toastController('error', 'Choose a course first');
    return console.error('Choose a course first');
  }

  if (!selectedCourse.studentList.length) {
    UI.emptyHtmlNode(UI.DOMElements.tableBody);
  }

  const selectedStudent = arrayOfStudents.find(
    (student) => student.id == event.target.value
  );

  selectedCourse.addStudent(selectedStudent);
  await Provider.coursePutRequest(selectedCourse);

  toastController(
    'success',
    `Student with id ${selectedStudent.id} was successfully added to this course`
  );

  UI.appendStudent(selectedStudent);
});

const init = async () => {
  await Provider.getCourses().then((data) =>
    data.forEach((course) => {
      if (!uniqueIdsCourses.includes(course.id)) {
        UI.appendBtn(course);
        newCourseFunction(course);
      }
    })
  );

  await Provider.getStudents().then((data) =>
    data.forEach((student) => {
      if (!uniqueIdsStudents.includes(student.id)) {
        UI.appendStudentSelect(student);
        newStudentFunction(student);
      }
    })
  );
};

init();

/**
 * Modal
 */
UI.DOMElements.modal.modalBtn.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('btn-modal')) {
    UI.DOMElements.modal.modalWindow.style.display = 'block';
    UI.DOMElements.modal.modalTitle.innerText = `Add ${target.getAttribute(
      'data-target'
    )}`;
    if (target.getAttribute('data-target') === 'course') {
      UI.DOMElements.form.newCourse.style.display = 'block';
      UI.DOMElements.form.newStudent.style.display = 'none';
    }
    if (target.getAttribute('data-target') === 'student') {
      UI.DOMElements.form.newCourse.style.display = 'none';
      UI.DOMElements.form.newStudent.style.display = 'block';
    }
  }
});

UI.DOMElements.modal.closeModal.addEventListener('click', (event) => {
  UI.DOMElements.modal.modalWindow.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target == UI.DOMElements.modal.modalWindow) {
    UI.DOMElements.modal.modalWindow.style.display = 'none';
  }
});

/**
 * Add new student
 */
UI.DOMElements.form.newStudent.addEventListener('submit', async (event) => {
  event.preventDefault();
  const inputs = UI.DOMElements.form.newStudent.elements;
  const student = {
    firstName: inputs['fname'].value,
    lastName: inputs['lname'].value,
    gender: inputs['genderS'].value,
    address: inputs['address'].value,
    hobbies: inputs['hobbies'].value,
  };

  await Provider.studentsPostRequest(newStudentFunction(student));

  UI.renderSelect(selectedCourse);
  UI.DOMElements.form.newStudent.reset();
  UI.DOMElements.modal.modalWindow.style.display = 'none';
});

const newStudentFunction = (student) => {
  return new Student(
    Number(student.id ? student.id : arrayOfStudents.length + 1),
    student.firstName,
    student.lastName,
    student.gender,
    student.address ? student.address : '',
    student.hobbies ? student.hobbies : ''
  );
};

/**
 * Add new course
 */
UI.DOMElements.form.newCourse.addEventListener('submit', async (event) => {
  event.preventDefault();
  const inputs = UI.DOMElements.form.newCourse.elements;
  const course = {
    name: inputs['name'].value,
    assignedTeacher: inputs['teacher'].value,
  };

  await Provider.coursesPostRequest(newCourseFunction(course));

  UI.appendBtn(course);
  UI.DOMElements.form.newCourse.reset();
  UI.DOMElements.modal.modalWindow.style.display = 'none';
});

const newCourseFunction = (course) => {
  return new Course(
    Number(course.id ? course.id : arrayOfCourses.length + 1),
    course.name,
    course.assignedTeacher,
    course.studentList ? course.studentList : []
  );
};

const toastController = (type, msg) => {
  const toast = document.getElementById('toast');
  toast.style.display = 'block';
  toast.innerHTML = msg;

  toast.classList.add(type);

  setTimeout(() => {
    toast.style.display = 'none';
    toast.classList.remove(type);
  }, 2000);
};
