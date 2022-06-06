let burgerBtn = document.querySelector(".navbar__burger");
let burgerMenu = document.querySelector(".burger__menu");
let body = document.querySelector("body");


burgerBtn.addEventListener("click", function () {
    this.classList.toggle("active");
    burgerMenu.classList.toggle("active");
    body.classList.toggle("lock");
});

function goToSection(sectionName) {
    document.querySelector(`section.${sectionName}`).scrollIntoView({behavior: "smooth"})
}


//TODO: MASK

var phoneMask = IMask(
    document.getElementById('phoneNumber'), {
        mask: '+{998} (00) 000-00-00',
        // lazy: false,
    });

var orderPhoneMask = IMask(
    document.getElementById('orederPhone'), {
        mask: '+{998} (00) 000-00-00',
        // lazy: false,
    });

var downloadPhoneMask = IMask(
    document.getElementById('userPhoneForDownload'), {
        mask: '+{998} (00) 000-00-00',
        // lazy: false,
    });



var $mySwiper;

//TODO : Swiper
function swiperFunc() {
    $mySwiper = new Swiper(".mySwiper", {
        slidesPerView: "auto",
        spaceBetween: 10,
        // loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
}


//TODO: Draw products
let allProducts = document.querySelectorAll(".box-product");
let seeMore = document.getElementById("seeMoreBtn");
let toggle = false;

// seeMore.classList.add("hidden")

const hideProducts = function () {
    allProducts.forEach((product, index) => {
        index > 7 ? product.classList.add("hidden") : "";
    })
    
    
    if(location.pathname.split("/").includes("ru")){
        seeMore.textContent = "Больше";
    }else{
        seeMore.textContent = "Ko'proq";
    }
}


let viewProductsCount = 7;
const showProducts = function () {
    let productsCount;
    viewProductsCount += 4;

    allProducts.forEach((product, index) => {
        index <= viewProductsCount ? product.classList.remove("hidden") : "";
        productsCount = index;
    })

    if (productsCount <= viewProductsCount) {
        toggle = !toggle;
        
        if(location.pathname.split("/").includes("ru")){
            seeMore.textContent = "Меньше";
        }else{
            seeMore.textContent = "Kamroq";
        }
        viewProductsCount = 7;
    }
}


seeMore.addEventListener("click", function () {
    if (toggle) {
        toggle = !toggle;
        hideProducts();
        document.querySelector(".products").scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});

        return
    }

    if (!toggle) {
        showProducts();
        document.querySelector(".products").scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    }
})

function productsShowType() {
    if (window.screen.width <= 768) {
        $(`.slide-container`).removeClass("container");
        $(`.component-products`).addClass("swiper mySwiper").removeClass("products__component");
        $(".all-products").addClass("swiper-wrapper").removeClass("products__all--cards");
        $(".box-product").addClass("swiper-slide").removeClass("hidden")
        $(".products__see--more").addClass("hidden");
        $(".products__title").addClass("container");

        swiperFunc();
    }

    if (window.screen.width >= 768) {
        $(`.slide-container`).addClass("container");
        $(`.component-products`).removeClass("swiper mySwiper").addClass("products__component");
        $(".all-products").removeClass("swiper-wrapper").addClass("products__all--cards");
        $(".box-product").removeClass("swiper-slide").addClass("mr-0");
        $(".products__see--more").removeClass("hidden");
        $(".products__title").removeClass("container");

        hideProducts();

        if ($(".mySwiper").hasClass("mySwiper")) $mySwiper.destroy();
    }
}

$(document).ready(function () {
    productsShowType();
})

$(window).on("resize", function (e) {
    productsShowType();
})


//TODO:Gallery
const gallery = new Viewer(document.querySelector('.gallery__left--side'));

$(document).ready(function () {
    $('select').niceSelect();
});

// $('#downloadPdf').on('click', function () {
//
// });

