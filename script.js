//https://lifez-1c58.restdb.io/rest/lifez
//	5d8e06621ce70f63798550a7
document.addEventListener("DOMContentLoaded", start);
function start() {
  get();
}
const heroName = document.querySelector("#heroName");
const form = document.querySelector("#form");

function get() {
  fetch("https://lifez-1c58.restdb.io/rest/lifez", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d8e06621ce70f63798550a7",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(heroes => {
      heroes.forEach(addHeroesToTheDom);
      console.log(heroes);
    });
}
function addHeroesToTheDom(hero) {
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);
  copy.querySelector("article.task").dataset.heroid = hero._id;
  copy.querySelector("h1").textContent = hero.task;
  copy.querySelector(".del").addEventListener("click", evt => {
    evt.preventDefault();
    deleteHero(hero._id);
    fetchAndPopulate(hero.id);
  });
  copy.querySelector(".edit").addEventListener("click", evt => {
    evt.preventDefault();
    fetchAndPopulate(hero._id);
    console.log(hero.task);
  });

  document.querySelector("#app").appendChild(copy);
}
function fetchAndPopulate(id) {
  fetch(`https://lifez-1c58.restdb.io/rest/lifez/${id}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d8e06621ce70f63798550a7",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(heroes => {
      console.log(heroes);
      form2.elements.task.value = heroes.task;
      form2.elements.id.value = heroes._id;
      //   heroes.forEach(addHeroesToTheDom);
      console.log(heroes.task);
    });
}
function post() {
  const data = {
    task: heroName.value
  };
  addHeroesToTheDom(data);
  console.log(data);

  const postData = JSON.stringify(data);
  fetch("https://lifez-1c58.restdb.io/rest/lifez", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d8e06621ce70f63798550a7",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(e => e.json())
    .then(e => {
      console.log(e);
      form2.elements.task.value = heroName;
      console.log("shit", heroName);
    });
}
form.addEventListener("submit", evt => {
  console.log(evt);
  evt.preventDefault();

  console.log(heroName);

  post(heroName);
});

function deleteHero(id) {
  console.log("wat");
  fetch("https://lifez-1c58.restdb.io/rest/lifez/" + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": " 5d8e06621ce70f63798550a7",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(lol => {
      document.querySelector(`.task[data-heroid="${id}"]`).remove();
    });
}

form2.addEventListener("submit", evt => {
  console.log("submit the edit");
  evt.preventDefault();
  put();
});
// form.elements.name.addEventListener("input", e => {
//   document.querySelector("h4").textContent = form.elements.name.value;
// });
form.elements.heroName.addEventListener("blur", ele => {
  if (form.elements.heroName.checkValidity()) {
    form.elements.heroName.classList.remove("notValid");
  } else {
    form.elements.heroName.classList.add("notValid");
  }
});
function put() {
  console.log(form2.elements.task.value);

  let data = {
    task: form2.elements.task.value,
    id: form2.elements.id.value
  };

  let postData = JSON.stringify(data);
  const superID = form2.elements.id.value;
  console.log(superID);
  fetch(`https://lifez-1c58.restdb.io/rest/lifez/${superID}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d8e06621ce70f63798550a7",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(res => res.json())
    .then(updatedHero => {
      const parentElement = document.querySelector(`.task[data-heroid="${updatedHero._id}"]`);
      parentElement.querySelector("h1").textContent = updatedHero.task;
    });
}
let lort = document.getElementsByClassName("input");
const done = document.querySelector("#done");
done.addEventListener("click", yes => {
  yes.preventDefault();
  if (lort.checked) {
  } else {
    console.log("no");
  }
});

// check.addEventListener("click", ja => {
//   if (check.checked.length == ".check".length) {
//     //do something
//     console.log("wuuuuuuuu");
//   }
// });

// just some shit
// const adminButton = document.querySelector("button.adminButton");
// let admin = document.querySelector(".admin");
// admin.addEventListener("click", evt => {
//   evt.preventDefault();
//   if (!(adminButton.style.display == "block")) {
//     adminButton.style.display = "block";
//   } else {
//     adminButton.style.display = "none";
//   }
// });
// document.querySelector(".make").addEventListener("click", openSidebar);
// document.querySelector(".edit").addEventListener("click", openSidebar2);
// function openSidebar() {
//   console.log("lort");
//   if (!(form.style.display == "grid")) {
//     form.style.display = "grid";
//   } else {
//     form.style.display = "none";
//   }
// }
// function openSidebar2() {
//   console.log("lort");
//   if (!(form2.style.display == "grid")) {
//     form2.style.display = "grid";
//   } else {
//     form2.style.display = "none";
//   }
// }
