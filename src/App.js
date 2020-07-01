import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Search from './Search'
import Bookshelves from './Bookshelves'

class BooksApp extends React.Component {

  constructor(props) {
    super(props)
    // bind function to allow setState to work
    this.searchBooks = this.searchBooks.bind(this)
    this.getAllBooks = this.getAllBooks.bind(this)
    this.moveBookToShelf = this.moveBookToShelf.bind(this)
  }
  
  /* Placed the titles and values here just because, would probably be a good idea to make this part of the API in the future
  incase updating the shelves ever becomes a requested feature
  */
  state = {
    books: [],
    searchTerms: ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat',
    'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling',
    'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy',
    'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey',
    'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate',
    'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling',
    'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate',
    'Virtual Reality', 'Web Development', 'iOS'],
    shelvedBooks: []
  }

  componentDidMount(){
    BooksAPI.getAll()
    .then((books)=>{
      this.setState({books,shelvedBooks:books})
    })
  }

  getAllBooks(){
    BooksAPI.getAll()
    .then((books)=>{
      this.setState({books})
    })
  }

  searchBooks(query){
    let tempSearchTerms = [...this.state.searchTerms]
    if(query !== '' && tempSearchTerms.find(term=> term.toLowerCase().includes(query.toLowerCase()))){
      BooksAPI.search(query)
      .then((books) => {
        this.setState({books})
      })
    }else{
      this.setState({books:[]})
    }
  }

  moveBookToShelf(book,shelf) {
    BooksAPI.update(book,shelf)
    // I appear to have put myself in this position, not the best place to be in
    let index = null;
    let {shelvedBooks} = this.state
    console.log(shelvedBooks)
    shelvedBooks.forEach((b,idx)=>{
      if(b.id === book.id)
        index = idx
    })
    if(index === null){
      shelvedBooks.push(book)
      shelvedBooks[shelvedBooks.length-1].shelf = shelf
    }else
    shelvedBooks[index].shelf = shelf
    this.setState({shelvedBooks})
    
  }

  render() {
    return (
      <div className="app">
          <Route  exact path="/search" render={({history})=> (
            <Search onSearch={this.searchBooks} currentBooks={this.state.shelvedBooks} books={this.state.books} onUpdateBook={(book,shelf)=>{
              this.moveBookToShelf(book,shelf)
            }} />
          )} />
          <Route exact path="/"  render={()=> (
            <Bookshelves getBooks={this.getAllBooks} moveBookToShelf={this.moveBookToShelf} books={this.state.shelvedBooks} />
          )} /> 
      </div>
    )
  }
}

export default BooksApp
