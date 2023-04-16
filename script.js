window.onload = function() {
    addBookToLibrary();
}

let myLibrary = [];

function Book(author, title, pages, read) {
    this.author = author
    this.title = title
    this.pages = pages
    this.read = read
}

function addBookToLibrary() {
    let addBookForm = document.querySelector('#add-book-form');
    addBookForm.addEventListener('submit', event => {
        event.preventDefault();
        let author = document.querySelector('#author').value;
        let title = document.querySelector('#title').value;
        let pages = document.querySelector('#pages').value + ' Pages';
        let read = document.querySelector('.read:checked').value;

        if (read === 'yes') {
            read = 'Read'
        }
        else {
            read = 'Not Read'
        }

        let book = new Book(author, title, pages, read);
        myLibrary.push(book);
        newBookDisplay();
        checkIfRead();
    });
}

function newBookDisplay() {
    const container = document.querySelector("#card-container");
    container.innerHTML = '';
    for (let i = 0; i < myLibrary.length; i++) {
        let libraryCard = myLibrary[i];
        const div = document.createElement("div");
        container.appendChild(div);
        div.classList.add("card");
        const btn = document.createElement("button");
        div.appendChild(btn);
        btn.textContent = 'X'
        btn.classList.add('remove');

        for (const property in libraryCard) {
            const para = document.createElement("p");
            para.classList.add("card-text");
            div.appendChild(para);
            para.textContent = libraryCard[property];
          }
      }
    removeBook();
}

function checkIfRead() {
    let cards = document.querySelectorAll('.card')
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].lastChild.textContent === 'Read') {
            cards[i].classList.add('read')
        }
    }
}

function removeBook() {
    let remove = document.querySelectorAll('.remove')
    for (let i = 0; i < remove.length; i++) {
        remove[i].addEventListener('click', () => {
            myLibrary.splice(i, 1);
            remove[i].parentNode.parentNode.removeChild(remove[i].parentNode);
            newBookDisplay();
            checkIfRead();
        });
    }
}

