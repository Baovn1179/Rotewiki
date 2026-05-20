const submit = document.querySelector("#login-btn");
const username = document.querySelector("#username");
const password = document.querySelector("#password");

submit.onclick = async event => {
    if (username.value.trim() === "") {
        alert("Vui lòng nhập tên đăng nhập.");
        username.focus();
        return;
    }
    if (password.value.trim() === "") {
        alert("Vui lòng nhập mật khẩu.");
        password.focus();
        return;
    }

    fetch("/service/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: username.value, 
            password: password.value
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if (data.data == "success") {
            alert("Đăng nhập thành công!");
            //window.location.href = "/"; // Chuyển hướng về trang chủ
        } else {
            alert("Đăng nhập thất bại: " + data.message);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Đã xảy ra lỗi khi đăng nhập.");
    }); 
};