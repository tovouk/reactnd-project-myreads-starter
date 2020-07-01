import React, {Component} from 'react'
import Bookshelf from './Bookshelf'
import {Link} from 'react-router-dom'

class Bookshelves extends Component{

    shelves = {
        titles: ["Currently Reading","Want to Read","Read"],
        values: ["currentlyReading","wantToRead","read"]
    }

    componentDidMount(){
        this.props.getBooks()
    }

    render(){
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {this.shelves.titles.map((shelf,index) => (
                            <Bookshelf key={index} onUpdateBook={(book,shelf)=>{
                            this.props.moveBookToShelf(book,shelf)
                            }} title={shelf}
                            books={this.props.books.filter((book)=> book.shelf === this.shelves.values[index])}
                            />
                        ))}
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search"><button>Add a book</button></Link>
                </div>
            </div>
        )
    }
}

export default Bookshelves