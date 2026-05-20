const submitBtn = document.querySelector("#register-submit");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const repassword = document.querySelector("#repassword");
const reviewbox = document.querySelector("#reviewbox");


submitBtn.onclick = event => {
    if(username.value.length == 0 || email.value.length == 0 || password.value.length < 8 || repassword.value.length < 8 || reviewbox.value.length < 30)
    {
        alert("Không để trống ô nào; mật khẩu phải tối thiểu 8 ký tự; câu trả lời kiểm duyệt phải trên 30 ký tự.");
        return;
    }

    if (password.value != repassword.value)
    {
        alert("Mật khẩu không trùng khớp");
        return;
    }

    fetch ("/service/register", {
        method: "POST",
        headers: {
            "Content-type": "Application/json"
        },
        body: JSON.stringify({
            username: username.value,
            email: email.value,
            password: password.value,
            questionrecord: reviewbox.value
        })
    })
    .then(async response => {
            let data = await response.json();
            if (data.data == "success") alert("Hồ sơ của đồng chí đang trong quá trình chờ thẩm tra và xét duyệt, xin hãy chờ đợi, chúng tôi sẽ gửi email đến cho bạn sau.");
            else alert("Hồ sơ của đồng chí gửi không thành công.");
        });

}