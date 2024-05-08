const API_URL = "https://dummyjson.com/recipes";

let recipeListDb = [];

(() => {
    let initElement = document.createElement("div");
    if(!sessionStorage.getItem("initLogo")) {
        sessionStorage.setItem("initLogo", true);
        initElement.classList.add("fixed", "h-screen", "w-screen", "bg-siteBlack", "z-[90]", "top-0", "left-0", "grid", "place-items-center");
        let initChild = `<img class="h-[115px] sm:h-[150px] object-cover" src="./assets/images/logo.png" alt="placeholder" />`;
        initElement.innerHTML = initChild;
        document.querySelector(".appEntryPoint").classList.add("overflow-hidden");
        document.querySelector(".appEntryPoint").appendChild(initElement);

        setTimeout(() => {
            document.querySelector(".appEntryPoint").removeChild(initElement);
            document.querySelectorAll(".x-cloak").forEach (item => {
                item.classList.remove("x-cloak");
            })
            document.querySelector(".appEntryPoint").classList.remove("overflow-hidden");
        }, 3000)
    }

    document.querySelectorAll(".x-cloak").forEach (item => {
        item.classList.remove("x-cloak");
    })
})();

(async () => {
    const year = new Date().getFullYear();
    document.querySelector(".copyrights-year").innerHTML = year;
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        recipeListDb = [...data.recipes]
        isSuccess();
    } catch (error) {
        console.log("Error Occurred:", error);
    }

})();


function isSuccess() {
    document.querySelectorAll(".api-placeholder").forEach(item => item.classList.add("hidden"));
    document.querySelectorAll(".api-success-show").forEach(item => item.classList.remove("invisible"));
    sessionStorage.setItem("ReciepesCopy", JSON.stringify(recipeListDb));
    renderCarousel(initSwaiperCarousel);
    renderPopTags();
    renderDishes();

    document.querySelector(".scroll-dishes").addEventListener("click", function (e) {
        window.scrollTo({ top: document.querySelector(".dish-list").offsetTop - 85 })
    })

    document.querySelector(".search-form").addEventListener("submit", function (e) {
        e.preventDefault();
        let searchTerm = '';
        searchTerm = this.querySelector("#search_food").value;
        if (this.querySelector("#search_food").value.length < 3) {
            alert("Please enter more than 3 character")
        } else {
            renderSearchedDishes(searchTerm)
        }
    })
    
    document.querySelector("#search_food").addEventListener("input", function (e) {
        e.preventDefault();
        if (document.querySelector("#search_food").value.length <= 0) {
            renderDishes();
        }
    })

}

function initSwaiperCarousel() {
    const swiperEl = document.querySelector('swiper-container');

    const swiperParams = {
        spaceBetween: 15,
        loop: true,
        autoplay: {
            delay: 2500,
            pauseOnMouseEnter: true,
        },
        slidesPerView: 2,
        breakpoints: {
            640: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 4,
            },
            1199: {
                slidesPerView: 5,
            }
        },

        injectStyles: [
            `
            .swiper-button-next, .swiper-button-prev {
                color: #E1410D;
                height: 25px;
                width: 25px;
                background: #ffffff80;
                padding: 7px;
            }
            .swiper-scrollbar-drag {
                display: none;
            }
            `,
        ],
    };

    Object.assign(swiperEl, swiperParams);
    swiperEl.initialize();
}

function renderCarousel(initCarousel) {
    let carouselList = ``;

    recipeListDb.forEach(item => {
        if (item.id <= 6) {
            carouselList += `
            <swiper-slide class="p-2 rounded-lg border border-slate-500">
                <div>
                    <img class="w-full h-[115px] sm:h-[150px] object-cover rounded-md" src="${item?.image}" alt="Poster Image" />
                </div>
                <div class="mt-2 space-y-2">
                    <h4 class="line-clamp-1 cursor-pointer select-none" onclick="showRecipe(${item.id}, '${item.name}')" title="${item?.name}">${item?.name}</h4>
                    <div class="flex items-center text-gray-400 text-[12px] sm:text-[14px] leading-none">
                        <div class="flex gap-1 items-center">
                            <div>
                                <svg class="size-4 fill-gray-400" viewBox="-2 -2 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" class="jam jam-clock">
                                    <path d='M11 9h4a1 1 0 0 1 0 2h-5a1 1 0 0 1-1-1V4a1 1 0 1 1 2 0v5zm-1 11C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z'/>
                                </svg>
                            </div>
                            <p>${item?.cookTimeMinutes + item?.prepTimeMinutes} ${item?.cookTimeMinutes >= 1 ? "Mins" : "Min"}</p>
                        </div>
                        <div>
                            <svg width="20" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="2" class="fill-gray-400" />
                            </svg>
                        </div>
                        <div>
                            ${item?.caloriesPerServing} Kal
                        </div>
                    </div>
                </div>
            </swiper-slide>
        `
        }
    })

    document.querySelector('.carousel-container').innerHTML = carouselList;
    initCarousel();
}

function renderDishes() {
    let reciepeList = ``;
    recipeListDb.forEach(item => {
        if (item.id > 6) {
            reciepeList += `
            <div class="p-2 rounded-lg border border-slate-500">
                <div>
                    <img class="w-full h-[115px] sm:h-[150px] object-cover rounded-md" src="${item?.image}" alt="Poster Image" />
                </div>
                <div class="mt-2 space-y-2">
                    <h4 class="line-clamp-1 cursor-pointer select-none" onclick="showRecipe(${item.id}, '${item.name}')" title="${item?.name}">${item?.name}</h4>
                    <div class="flex items-center text-gray-400 text-[12px] sm:text-[14px] leading-none">
                        <div class="flex gap-1 items-center">
                            <div>
                                <svg class="size-4 fill-gray-400" viewBox="-2 -2 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" class="jam jam-clock">
                                    <path d='M11 9h4a1 1 0 0 1 0 2h-5a1 1 0 0 1-1-1V4a1 1 0 1 1 2 0v5zm-1 11C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z'/>
                                </svg>
                            </div>
                            <p>${item?.cookTimeMinutes + item?.prepTimeMinutes} ${item?.cookTimeMinutes >= 1 ? "Mins" : "Min"}</p>
                        </div>
                        <div>
                            <svg width="20" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="2" class="fill-gray-400" />
                            </svg>
                        </div>
                        <div>
                            ${item?.caloriesPerServing} Kal
                        </div>
                    </div>
                </div>
            </div>
            `
        }
    })

    document.querySelector(".load-dishes").innerHTML = reciepeList;
}

function renderPopTags() {
    const tagsSet = new Set();
    recipeListDb.forEach(item => {
        tagsSet.add(item.tags[0])
    })

    const filteredTags = [...tagsSet]

    let tagsSet1 = ``;
    let tagsSet2 = ``;
    let tagsSet3 = ``;

    filteredTags.forEach((item, index) => {
        if (index <= 7) {
            tagsSet1 += `
                <div class="py-1 px-4 border border-slate-500 rounded-full whitespace-nowrap">${item}</div>
            `
        } else if (index > 7 && index <= 14) {
            tagsSet2 += `
                <div class="py-1 px-4 border border-slate-500 rounded-full whitespace-nowrap">${item}</div>
            `
        } else {
            tagsSet3 += `
                <div class="py-1 px-4 border border-slate-500 rounded-full whitespace-nowrap">${item}</div>
            `
        }
    })


    document.querySelectorAll(".tags-child-first").forEach((item) => {
        item.innerHTML = tagsSet1;
    });

    document.querySelectorAll(".tags-child-second").forEach((item) => {
        item.innerHTML = tagsSet2;
    });

    document.querySelectorAll(".tags-child-third").forEach((item) => {
        item.innerHTML = tagsSet3;
    });

}

function renderSearchedDishes(searchTerm) {
    if (searchTerm) {
        let reciepeList = ``;
        let dataLocal = recipeListDb.filter(item => {
            return item.name.toLowerCase().includes(searchTerm.toLowerCase())
        })

        if (dataLocal.length) {
            dataLocal.forEach(item => {
                reciepeList += `
                <div class="p-2 rounded-lg border border-slate-500">
                    <div>
                        <img class="w-full h-[115px] sm:h-[150px] object-cover rounded-md" src="${item?.image}" alt="Poster Image" />
                    </div>
                    <div class="mt-2 space-y-2">
                        <h4 class="line-clamp-1 cursor-pointer select-none" onclick="showRecipe(${item.id}, '${item.name}')" title="${item?.name}">${item?.name}</h4>
                        <div class="flex items-center text-gray-400 text-[12px] sm:text-[14px] leading-none">
                            <div class="flex gap-1 items-center">
                                <div>
                                    <svg class="size-4 fill-gray-400" viewBox="-2 -2 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" class="jam jam-clock">
                                        <path d='M11 9h4a1 1 0 0 1 0 2h-5a1 1 0 0 1-1-1V4a1 1 0 1 1 2 0v5zm-1 11C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z'/>
                                    </svg>
                                </div>
                                <p>${item?.cookTimeMinutes + item?.prepTimeMinutes} ${item?.cookTimeMinutes >= 1 ? "Mins" : "Min"}</p>
                            </div>
                            <div>
                                <svg width="20" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="2" class="fill-gray-400" />
                                </svg>
                            </div>
                            <div>
                                ${item?.caloriesPerServing} Kal
                            </div>
                        </div>
                    </div>
                </div>
                `
            })
            document.querySelector(".load-dishes").innerHTML = reciepeList;
        } else {
            reciepeList += `
                <div class="flex flex-col items-center col-span-2 sm:col-span-3 lg:col-span-4 min-[1199px]:col-span-5">
                    <img class="h-[115px] sm:h-[150px] object-cover" src="./assets/images/logo.png" alt="placeholder" />
                    <div class="mt-3 text-center">
                        Sorry, We couldn't prepare your dish <span class="text-primary break-words font-poppinsbold">${searchTerm}</span>
                    </div>
                </div>
             `
             document.querySelector(".load-dishes").innerHTML = reciepeList;
        }
    }
}

function showRecipe(id, name) {
    let reciepeDetail = recipeListDb.find(item => {
        return item.id === id && item.name === name;
    })
    sessionStorage.setItem("reciepeDetail", JSON.stringify(reciepeDetail));
    window.location.href ="/product.html";
}