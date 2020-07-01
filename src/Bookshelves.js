import React, {Component} from 'react'
import Bookshelf from './Bookshelf'
import {Link} from 'react-router-dom'

class Bookshelves extends Component{

    state = {
        shelfTitles: ["Currently Reading","Want to Read","Read"],
        shelfValues: ["currentlyReading","wantToRead","read"]
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
                        {this.state.shelfTitles.map((shelf,index) => (
                            <Bookshelf key={index} onUpdateBook={(book,shelf)=>{
                            this.props.moveBookToShelf(book,shelf)
                            }} title={shelf}
                            books={this.props.books.filter((book)=> book.shelf === this.state.shelfValues[index])}
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