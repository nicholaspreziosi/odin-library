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

        let book = new Book(author, title, pages, read);
        myLibrary.push(book);
        newBookDisplay();
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
        const x = document.createElement("div");
        div.appendChild(x);
        x.textContent = 'X'
        x.classList.add('remove');

        for (const property in libraryCard) {
            const para = document.createElement("p");
            para.classList.add("card-text");
            div.appendChild(para);
            para.textContent = libraryCard[property];
        }

        div.lastChild.classList.add('read-btn');
      }
    checkIfRead();
    removeBook();
    toggleRead();
}

function checkIfRead() {
    let cards = document.querySelectorAll('.card')
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].read === 'Read') {
            cards[i].classList.add('read');
        }
        else if (myLibrary[i].read === 'Not Read') {
            cards[i].classList.remove('read');
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
        });
    }
}


function toggleRead() {
    let cards = document.querySelectorAll('.card')
    for (let i = 0; i < myLibrary.length; i++) {
        let read = cards[i].lastChild;
        read.addEventListener('click', () => {
            if (read.textContent === 'Read') {
                myLibrary[i].read = 'Not Read';
                read.textContent = 'Not Read'

            }
            else if (read.textContent === 'Not Read') {
                myLibrary[i].read = 'Read';
                read.textContent = 'Read';
            }
            checkIfRead();
        })
    }
}