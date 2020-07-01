import React from 'react'
import {Link} from 'react-router-dom'

class Search extends React.Component{

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState(()=> ({
            query: query
        }))
        this.props.onSearch(query)
    }

    componentDidMount(){
        this.updateQuery(this.state.query)
    }


    render(){
        return (
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
                        <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.props.books.length > 0 ?
                            this.props.books.map((book,index)=>{
                                var tempBook = this.props.currentBooks.find(x => x.id === book.id)
                                var tempShelf = undefined
                                tempBook ? tempShelf = tempBook.shelf : tempShelf = null
                                return <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            {book.imageLinks ?
                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                                : <div className="book-cover" style={{ width: 128, height: 193}} ></div>
                                            }
                                            <div className="book-shelf-changer">
                                            <select value={tempShelf ? tempShelf : (book.shelf? book.shelf : "none")} onChange={(e) => {this.props.onUpdateBook(book,e.target.value)}}>
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
                            }) : 
                            <div>
                            <div>Please enter a valid search term</div>
                            <p>The following search terms are valid</p>
                            <p>Android, Art, Artificial Intelligence, Astronomy, Austen, Baseball, Basketball, Bhagat, Biography, Brief, Business, Camus, Cervantes, Christie, Classics, Comics, Cook, Cricket, Cycling, Desai, Design, Development, Digital Marketing, Drama, Drawing, Dumas, Education, Everything, Fantasy, Film, Finance, First, Fitness, Football, Future, Games, Gandhi, Homer, Horror, Hugo, Ibsen, Journey, Kafka, King, Lahiri, Larsson, Learn, Literary Fiction, Make, Manage, Marquez, Money, Mystery, Negotiate, Painting, Philosophy, Photography, Poetry, Production, Programming, React, Redux, River, Robotics, Rowling, Satire, Science Fiction, Shakespeare, Singh, Swimming, Tale, Thrun, Time, Tolstoy, Travel, Ultimate, Virtual Reality, Web Development, iOS
</p>
                            </div>
                        }
                    </ol>
                </div>
            </div>
        )
    }

}

export default Search