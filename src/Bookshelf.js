import React,{Component} from 'react'

class Bookshelf extends Component{
    

    render(){
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books ?
                            this.props.books.map(book=>(
                                <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            {book.imageLinks ?
                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                                : <div className="book-cover" style={{ width: 128, height: 193}} ></div>
                                            }
                                            <div className="book-shelf-changer">
                                            <select value={book.shelf} onChange={(e) => {this.props.onUpdateBook(book,e.target.value)}}>
                                                <option value="move" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                            </div>
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        <div className="book-authors">{book.authors ? book.authors.toString() : "No author found"}</div>
                                    </div>
                                </li>
                            )) :
                            <div>An error Occured</div>
                        }
                    </ol>
                </div>
            </div>       
        )
    }
}

export default Bookshelf