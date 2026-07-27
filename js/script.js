/*==================================================
                ELEMENTOS
==================================================*/

const header = document.querySelector("#header");

const sections = document.querySelectorAll("section[id]");

const navLinks = document.querySelectorAll("nav a");

const menuToggle = document.querySelector(".menu-toggle");

const nav = document.querySelector("nav");

/*==================================================
            MENU MOBILE
==================================================*/

if(menuToggle){

    menuToggle.addEventListener("click", ()=>{

        nav.classList.toggle("active");

        menuToggle.classList.toggle("open");

    });

}

document.querySelectorAll("nav a").forEach(link=>{

    link.addEventListener("click", ()=>{

        nav.classList.remove("active");

        menuToggle.classList.remove("open");

    });

});

/*==================================================
                HEADER
==================================================*/

window.addEventListener("scroll", ()=>{

    if(window.scrollY > 70){

        header.classList.add("scroll");

    }else{

        header.classList.remove("scroll");

    }

});

/*==================================================
            ACTIVE LINK
==================================================*/

function activeMenu(){

    const scrollY = window.pageYOffset;

    sections.forEach(section=>{

        const sectionHeight = section.offsetHeight;

        const sectionTop = section.offsetTop - 150;

        const sectionId = section.getAttribute("id");

        const current = document.querySelector(`nav a[href*=${sectionId}]`);

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){

            current?.classList.add("active");

        }else{

            current?.classList.remove("active");

        }

    });

}

window.addEventListener("scroll",activeMenu);

/*==================================================
            BACK TO TOP
==================================================*/

const backTop = document.getElementById("backToTop");

if(backTop){

    window.addEventListener("scroll", () => {

        if(window.scrollY >= 400){

            backTop.classList.add("show");

        }else{

            backTop.classList.remove("show");

        }

    });

}

/*==================================================
            COUNTER
==================================================*/

const counters = document.querySelectorAll(".counter");

const startCounter = (counter)=>{

    const target = +counter.dataset.target;

    let current = 0;

    const increment = target / 100;

    const update = ()=>{

        current += increment;

        if(current < target){

            counter.innerText = Math.ceil(current);

            requestAnimationFrame(update);

        }else{

            counter.innerText = target + (target === 100 ? "%" : "+");

        }

    };

    update();

}

const counterObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            startCounter(entry.target);

            counterObserver.unobserve(entry.target);

        }

    });

},{threshold:.6});

counters.forEach(counter=>{

    counterObserver.observe(counter);

});

/*==================================================
            REVEAL
==================================================*/

const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{threshold:.15});

reveals.forEach(item=>{

    revealObserver.observe(item);

});

/*==================================================
            3D CARD
==================================================*/

const cards = document.querySelectorAll(".card");

cards.forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 18;

        const rotateX = ((y / rect.height) - 0.5) * -18;

        card.style.transform = `perspective(1000px)
                                rotateX(${rotateX}deg)
                                rotateY(${rotateY}deg)
                                translateY(-8px)`;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="";

    });

});

/*==================================================
            SMOOTH SCROLL
==================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",(e)=>{

        e.preventDefault();

        const target = document.querySelector(anchor.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

/*=============================
        SWIPER
==============================*/

const swiper = new Swiper(".resultadosSwiper",{

    slidesPerView:3,

    spaceBetween:30,

    loop:true,

    grabCursor:true,

    autoplay:{

        delay:3000,

        disableOnInteraction:false,

    },

    pagination:{

        el:".swiper-pagination",

        clickable:true,

    },

    breakpoints:{

        320:{

            slidesPerView:1

        },

        768:{

            slidesPerView:2

        },

        1200:{

            slidesPerView:3

        }

    }

});