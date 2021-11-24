const inputName = document.querySelector('input[name="name"]');
const inputDescription = document.querySelector('input[name="description"]');
const submitBtn = document.querySelector('#create-btn');

var checkUpdate = 0;
var coursesApi = 'http://localhost:3000/courses';

function start() {
    getCourses(coursesApi, renderCourses);

    submitBtn.addEventListener('click', () => {
        var course = {
            title: inputName.value,
            description: inputDescription.value
        };
        if (checkUpdate === 0)
            createCourse(course, a => document.getElementById('json-server').innerHTML += conventToHTML(a))
        else {
            fetch(coursesApi + '/' + checkUpdate, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(course)
                })
                .then(res => res.json())
                .then(course =>
                    document.querySelector('.course-item-' + course.id).outerHTML = conventToHTML(course));
            submitBtn.innerHTML = 'Cập nhật khóa học';
            checkUpdate = 0;
        }
        inputName.value = '';
        inputDescription.value = '';
    })
}

start();

function getCourses(coursesApi, callback) {
    fetch(coursesApi)
        .then(res => res.json())
        .then(callback);
}

function createCourse(course, callback) {
    fetch(coursesApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(course)
        })
        .then(res => res.json())
        .then(callback);
}

function handelDeleteCourse(id) {
    fetch(coursesApi + '/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    document.querySelector('.course-item-' + id).remove();
    submitBtn.innerHTML = 'Cập nhật khóa học';
}

function updateCourse(id) {
    var updateBtn = document.querySelector('.course-item-' + id + ' button:last-child');
    if (checkUpdate) {
        checkUpdate = 0;
        submitBtn.innerHTML = 'Thêm khóa học';
        updateBtn.innerHTML = 'Chỉnh sửa khóa học';
    } else {
        checkUpdate = id;
        submitBtn.innerHTML = 'Cập nhật khóa học';
        updateBtn.innerHTML = 'Hủy';
    }
}

function conventToHTML(course) {
    return `
        <li class="course-item-${course.id}">
            <h4>${course.title}</h4>
            <p>${course.description}</p>
            <button onclick="handelDeleteCourse(${course.id})">Xóa</button>
            <button onclick="updateCourse(${course.id})">Chỉnh sửa khóa học</button>
        </li>
    `;
}

function renderCourses(courses) {
    document.getElementById('json-server').innerHTML = courses.map(conventToHTML).join('');
}