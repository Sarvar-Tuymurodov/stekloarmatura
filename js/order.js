let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');
let popupOpen = document.getElementById("orderBtn");

popupOpen.addEventListener("click", function (e) {
    e.preventDefault();
    popup.classList.add('popup__show');
    body.classList.add("lock");
})

popupClose.addEventListener("click", function () {
    popup.classList.remove('popup__show');
    body.classList.remove("lock");
})

document.documentElement.addEventListener("click", function (e) {
    if (e.target.classList.contains("popup")) {
        popup.classList.remove('popup__show');
        body.classList.remove("lock");
    }
})

//TODO: Order send

let orderForm = document.querySelector("#formOrder");

let description;

orderForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let fittingDiametr = $('#fittingDiameter + .nice-select li.selected');
    let gridSize = $('#gridSize + .nice-select li.selected');
    let gridDiametr = $('#gridDiameter + .nice-select li.selected');

    description = ` ${$(`#orderComment`).val()}  📏:Диаметр - ${Number(fittingDiametr.attr("data-value")) === 0 ? 0 : fittingDiametr.text()}, Количество - ${$("#fittingQuantity").val() === "" ? 0 : $("#fittingQuantity").val()} #️⃣:Размер сеток - ${Number(gridSize.attr("data-value")) === 0 ? 0 : gridSize.text()},Диаметр - ${Number(gridDiametr.attr("data-value")) === 0 ? 0 : gridDiametr.text()}, Количество - ${$("#gridQuantity").val() === "" ? 0 : $("#gridQuantity").val()} `

    debugger
    fetch(url,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                name: document.getElementById("orederName").value,
                phoneNumber: document.getElementById("orederPhone").value,
                description: description,
            })
        })
        .then(function (res) {
            document.getElementById("orederName").value = "";
            document.getElementById("orederPhone").value = "";
            sweetAlertSuccess();
        })
        .catch(function (res) {
            console.log(res)
        })
})

//TODO: Download modal
let modal = document.querySelector(".modal");
let openModalDownload = document.querySelector("#downloadPdf");
let modalClose = document.querySelector(".modal__close");

openModalDownload.addEventListener("click", function (e) {
    e.preventDefault();
    modal.classList.add('modal__show');
    body.classList.add("lock");
})

modalClose.addEventListener("click", function () {
    modal.classList.remove('modal__show');
    body.classList.remove("lock");
})

let downloadMenu = document.querySelector("#formDwnMenu");

const downloadPdfFunc = function () {
    $.ajax({
        url: "img/pdf/productsMenu.pdf",
        method: "GET",
        xhrFields: {
            responseType: "blob"
        },
        success: function (data) {
            // debugger
            var a = document.createElement('a');
            // let urls = ;
            var binaryData = [];
            binaryData.push(data);
            let $url = window.URL.createObjectURL(new Blob(binaryData))

            a.href = $url
            a.download = "Коммерческое предложение.pdf";
            document.body.append(a);
            a.click();
            window.URL.revokeObjectURL($url);
            a.remove();
        }
    })
}

downloadMenu.addEventListener("submit", function (e) {
    e.preventDefault();
    fetch(url,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                phoneNumber: document.getElementById("userPhoneForDownload").value,
                name: document.getElementById("userNameForDownload").value,
                description: `Скачал коммерческое предложение`
            })
        })
        .then((res) => {
            document.getElementById("userPhoneForDownload").value = "";
            document.getElementById("userNameForDownload").value = "";
            downloadPdfFunc();
            sweetAlertSuccess();
        })
        .catch(err => console.log(err))
})


$("li").addClass("test-class")