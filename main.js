fetch('http://localhost:3000/courses')
    .then(a => a.json())
    .then(a => {
        document.getElementById('json-server').innerHTML =
        a.reduce((a, b) => a + `<li class="title">
            <h1>${b.title}</h1>
            <p>${b.description}</p>
        </li>`, "")
    })
    .catch(() => alert('Lỗi'))

/**
 * Fetch
 * - JSON Server: API Server (Fake) / Mock API
 * - CRUD:
 *      + Create: Tạo mới -> POST
 *      + Read: đọc dữ liệu -> GET
 *      + Update: Chỉnh sửa -> PUT/PATCH
 *      + Delete: Xóa -> DELETE
 * - Postman
 */