const DOMElements = {
  modal: {
    modalWindow: document.getElementById('myModal'),
    modalBtn: document.getElementById('modal-buttons'),
    modalTitle: document.getElementById('modal-title'),
    closeModal: document.getElementById('close-modal'),
  },
  tableBody: document.getElementById('table-body-students'),
  form: {
    newStudent: document.getElementById('new-student-form'),
    newCourse: document.getElementById('new-course-form'),
  },
  select: document.getElementById('select-student-option'),
  coursesRow: document.getElementById('courses-row'),
  courseTitleSpan: document.getElementById('selected-course'),
  courseTeacherSpan: document.getElementById('selected-course-teacher'),
};

const emptyHtmlNode = (node) => {
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
};

const appendStudent = (student) => {
  const studentTableBodyRow = document.createElement('tr');

  let id = document.createElement('td');
  id.innerText = student.id;

  let firstName = document.createElement('td');
  firstName.innerText = student.firstName;

  let lastName = document.createElement('td');
  lastName.innerText = student.lastName;

  let gender = document.createElement('td');
  gender.innerText = student.gender;

  let address = document.createElement('td');
  address.innerText = student.address;

  let hobbies = document.createElement('td');
  hobbies.innerText = student.hobbies;

  let action = document.createElement('td');
  action.innerHTML = `<i class="fas fa-trash" data-id="${student.id}"></i>`;

  studentTableBodyRow.append(
    id,
    firstName,
    lastName,
    gender,
    address,
    hobbies,
    action
  );

  DOMElements.tableBody.append(studentTableBodyRow);
};

const renderTable = (selectedCourse) => {
  emptyHtmlNode(DOMElements.tableBody);
  if (!selectedCourse.studentList.length) {
    DOMElements.tableBody.innerHTML = `
                                        <tr>
                                            <td colspan="7">No data to display</td>
                                        </tr>
                                        `;
    return;
  }
  selectedCourse.studentList.forEach((student) => {
    appendStudent(student);
  });
};

const appendStudentSelect = (student) => {
  const studentSelectOption = document.createElement('option');
  studentSelectOption.value = student.id;
  studentSelectOption.text = student.firstName + ' ' + student.lastName;
  DOMElements.select.appendChild(studentSelectOption);
};

const renderSelect = (selectedCourse) => {
  emptyHtmlNode(DOMElements.select);
  if (!selectedCourse) {
    arrayOfStudents.forEach((student) => {
      appendStudentSelect(student);
    });
    return;
  }
  arrayOfStudents
    .filter(
      (student) =>
        !selectedCourse.studentList.some(
          (studentFromList) => studentFromList.id === student.id
        )
    )
    .forEach((student) => {
      appendStudentSelect(student);
    });
};

const appendBtn = (course) => {
  const btn = document.createElement('button');
  btn.className = 'btn btn-course';
  btn.innerText = course.name;
  btn.setAttribute('data-id', course.id ? course.id : arrayOfCourses.length);

  DOMElements.coursesRow.appendChild(btn);

  return btn;
};

export { DOMElements, renderTable, appendStudent, appendBtn, renderSelect, appendStudentSelect, emptyHtmlNode };
