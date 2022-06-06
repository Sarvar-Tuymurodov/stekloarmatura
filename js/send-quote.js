let url = 'https://alerts.uzanimals.uz/api/StekloarmaturaUz/SendTgGroup';
let form = document.getElementById("formQuote");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    fetch(url,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                name: document.getElementById("nameUser").value,
                description: document.getElementById("description").value,
                phoneNumber: document.getElementById("phoneNumber").value
            })
        })
        .then(function (res) {
            document.getElementById("nameUser").value = "";
            document.getElementById("description").value = "";
            document.getElementById("phoneNumber").value = "";
            sweetAlertSuccess()
        })
        .catch(function (res) {
            console.log(res)
        })
})

function sweetAlertSuccess() {
    Swal.fire(
        'Отправка',
        'Ваше сообщение отправлено',
        'success',
    )

}

