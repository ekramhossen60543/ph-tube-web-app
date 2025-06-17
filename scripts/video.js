function getTimeString(time) {
  // get hours and rest seconds
  const hours = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  const minutes = parseInt(remainingSecond / 60);
  const seconds = parseInt(remainingSecond % 60);
  return `${hours} hours ${minutes} minute ${seconds} seconds ago`;
}

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (const btn of buttons) {
    btn.classList.remove("active");
  }
};

// fetch, load and show categories on html
// create loadCategories()
// create DisplayCategories()

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};
const loadVideos = (searchText = "") => {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

const loadCategoryVideos = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      // remove active class
      removeActiveClass();

      // added active class
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
      displayVideos(data.category);
    })
    .catch((error) => console.log(error));
};

const loadDetails = async (videoId) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetails(data.video);
};

const displayDetails = (video) => {
  const detailsContainer = document.getElementById("modal-content");

  detailsContainer.innerHTML = `
  
  <img src="${video.thumbnail}"/>
  <p>${video.description}</p>
  
  `;

  // way-1
  // document.getElementById("showModalData").click();

  // way-2 note: showModal() method has provided daisyUI
  document.getElementById("customModal").showModal();
};

/*

   {
      "category_id": "1001",
      "video_id": "aaaa",
      "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
      "title": "Shape of You",
      "authors": [
        {
          "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
          "profile_name": "Olivia Mitchell",
          "verified": ""
        }
      ],
      "others": {
        "views": "100K",
        "posted_date": "16278"
      },
      "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."

*/

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";
  if (videos.length == 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
    
    <div class="min-h-[300px] flex flex-col justify-center items-center gap-5">
      <img src="assets/Icon.png"/>
      <h2 class="text-center text-xl font-bold">
        No Content Here in this category
      </h2>
    </div>

    `;
  } else {
    videoContainer.classList.add("grid");
  }
  videos.forEach((video) => {
    const card = document.createElement("div");
    card.classList = "card";
    card.innerHTML = `
    
  <figure class="h-[250px] relative">
    <img
      class="w-full h-full object-cover"
      src="${video.thumbnail}"
      alt="Shoes" />
      ${
        video.others.posted_date?.length == 0
          ? ""
          : `<span class="absolute text-xs right-2 bottom-2 bg-black rounded p-1 text-white">${getTimeString(
              video.others.posted_date
            )}</span>`
      }
  </figure>
  <div class="flex items-start gap-3 px-0 py-2">
    <div>
      <img class="w-10 h-10 rounded-full object-cover"  src=${
        video.authors[0].profile_picture
      }/>
    </div>
    <div>
      <h2 class="font-bold">${video.title}</h2>
      <div class="flex items-center gap-2">
        <P class="text-gray-400">${video.authors[0].profile_name}</P>
        ${
          video.authors[0].verified === true
            ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>`
            : ""
        }
      </div>
      <p class="text-gray-400">${video.others.views}</p>
      
      <p><button onclick="loadDetails('${
        video.video_id
      }')" class="btn btn-sm btn-error font-bold">Details</button></p>
    </div>
  </div>
    
    `;
    videoContainer.append(card);
  });
};

// Create DisplayCategories
const displayCategories = (categories) => {
  const categoriesBtnContainer = document.getElementById(
    "category-btn-container"
  );
  categories.forEach((item) => {
    // // create a button
    // const button = document.createElement("button");
    // button.classList = "btn";
    // button.innerText = item.category;
    // button.onclick = () => {
    //   alert("Hello");
    // };
    // // add button to category container
    // categoriesBtnContainer.append(button);

    // Another Way
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    
      <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">${item.category}</button>
    
    `;
    categoriesBtnContainer.append(buttonContainer);
  });
};

// get search input field
document.getElementById("search-input").addEventListener("keyup", (event) => {
  loadVideos(event.target.value);
});

loadCategories();
loadVideos();
