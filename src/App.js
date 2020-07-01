import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'

class BooksApp extends React.Component {
  /* Placed the titles and values here just because, would probably be a good idea to make this part of the API in the future
  incase updating the shelves ever becomes a requested feature
  */
  state = {
    books: [],
    shelfTitles: ["Currently Reading","Want to Read","Read"],
    shelfValues: ["currentlyReading","wantToRead","read"]
  }

  componentDidMount(){
    BooksAPI.getAll()
    .then((books)=>{
      this.setState({books})
    })
  }

  moveBookToShelf(book,shelf) {
    BooksAPI.update(book,shelf)
    // I appear to have put myself in this position, not the best place to be in
    var index = null; 
    this.state.books.forEach((b,idx)=>{
      if(b.id === book.id)
        index = idx
    })
    let tempBooks = [...this.state.books]
    console.log(shelf)
    tempBooks[index].shelf = shelf
    this.setState({books:tempBooks})
    
  }

  render() {
    return (
      <div className="app">
          <Route exact path="/search" render={()=> (
            <div className="search-books">
                <div className="search-books-bar">
                  <Link to="/"><button className="close-search">Close</button></Link>
                  <div className="search-books-input-wrapper">
                    {/*
                      NOTES: The search from BooksAPI is limited to a particular set of search terms.
                      You can find these search terms here:
                      https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                      However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                      you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input type="text" placeholder="Search by title or author"/>

                  </div>
                </div>
                <div className="search-books-results">
                  <ol className="books-grid"></ol>
                </div>
              </div>
          )} />
          <Route exact path="/"  render={()=> (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {this.state.shelfTitles.map((shelf,index) => (
                    <Bookshelf key={index} onUpdateBook={(book,shelf)=>{
                      this.moveBookToShelf(book,shelf)
                    }} title={shelf}
                    books={this.state.books.filter((book)=> book.shelf === this.state.shelfValues[index])}
                    />
          ))}
                </div>
              </div>
              <div className="open-search">
                <Link to="/search"><button>Add a book</button></Link>
              </div>
            </div>
          )} /> 
      </div>
    )
  }
}

export default BooksApp
