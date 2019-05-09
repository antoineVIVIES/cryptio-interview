class Library {
    constructor(isOpen, books) {
        this.isOpen = isOpen
        this.books = books
    }

    /**
     * Permit to return the know if the library is open or not
     * 
     * @param void
     * @return boolean
     */
    _isOpen() {
        return this.isOpen
    }

    /**
     * Permit to set the library availabity
     * 
     * @param book : Object
     * @return void
     */
    _setIsOpen(value) {
        this.open = value
    }

    /**
     * Permit to get the book in function of an object that is discribing that book
     * 
     * @param bookToGet : Object
     * @return Object | null
     */
    _getBook (bookToGet) {
        var choosenBook = null
        this.books.forEach(function (book) {
            if (bookToGet === book)
                choosenBook = book;
        })
        return (choosenBook);
    }

    rentBook (book) {
        const rentedBook = this._getBook(book);
        if (rentedBook !== null && rentedBook.available) {
            rentedBook.available = false;
            console.log('Book rented: ' + rentedBook.title)
        } else {
            console.log('This book is not available.');
        }
    }

    /**
     * Permit to search a book into the library by his characteristics 
     * 
     * @param search : string | int
     * @return object |null
     */
    searchBook (search) {
        var choosenBook = null;
        if (!this.isOpen) {
            console.log("The library is not open")
            return null;
        }
        this.books.forEach(function (book) {
            if (Object.values(book).includes(search)) {
                choosenBook = book
            }
        })
        return (choosenBook);
    }

    /**
     * Permit to return a book to the library by set its availability at True
     * 
     * @param book : Object
     * @return void
     */
    returnBook (book) {
        if (!this.isOpen) {
            console.log("The library is not open")
            return null;
        }
        const returnBook = this._getBook(book);
        if (returnBook !== null) {
            returnBook.available = true;
            console.log('Book returned: ' + returnBook.title);
        } else {
            console.log("Bad Book !")
        }
    };
    
    /**
     * Permit to add a book to the library
     * 
     * @param book : Object
     * @return void
     */
    donateBook (book) {
        if (!this.isOpen) {
            console.log("The library is not open")
        } else if (book.available === undefined ||
                   book.id === undefined ||
                   book.title === undefined ||
                   book.author === undefined) {
            console.log("Bad book ! Left parameter or book is invalid")
        } else {
            this.books.push(book);
            console.log('Thank you for your donation!');
        }
    }
    
}
/**
 * Main function permit to tell a story
 */
function tellStory() {
    var isOpen = true;
	var books = [
        {
            id: 1,
            title: 'The Hitchhicker\'s Guide to the Galaxy',
            author: 'Douglas Adams',
            available: true
        },
        {
            id: 2,
            title: 'The Little Prince',
            author: 'Antoine de Saint Exupery',
            available: true
        }
    ];
	const library = new Library(isOpen, books);
    
	// the user searches a book
	const book = library.searchBook('The Little Prince');
    
    if (book !== null) {
        // the user rents the book
        library.rentBook(book);
    
        // the user returns the book
        library.returnBook(book);
    
        // the user donates a book
        library.donateBook({
            title: 'Les miserables',
            author: 'Victor Hugo'
        });
    }
}

tellStory();