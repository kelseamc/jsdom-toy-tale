let addToy = false;
const collection = document.querySelector("#toy-collection");

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const toyForm = document.querySelector(".add-toy-form");
  toyForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const addToy = {
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0
    };

    fetch(`http://localhost:3000/toys`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(addToy),
    })
      .then((response) => response.json())
      .then((serverToy) => {
        newToy(serverToy);
    });
    
    event.target.reset();
  });

  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(toysArray => {
      toysArray.forEach(toy => {
        newToy(toy);
      });
    });
});

function newToy(toy) {
  let div = document.createElement("div")
  div.className = "card"
  collection.appendChild(div);

  let h2 = document.createElement("h2");
  h2.innerText = toy.name;
  let img = document.createElement("img");
  img.src = toy.image;
  img.className = "toy-avatar";
  let p = document.createElement("p");
  p.innerText = toy.likes;
  let button = document.createElement("button")
  button.className = "like-btn"

  button.addEventListener("click", (event) => {
    let likes = toy.likes++;
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": likes
      })
      
    })
    .then((response) => response.json())
    .then((newLikes) => {
      p.textContent = newLikes.likes
    })
  });

  div.append(h2, img, p, button)
  
}

