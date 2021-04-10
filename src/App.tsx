import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AddBook from './pages/AddBook';
import BookDetails from './pages/BookDetails';
import BookList from "./pages/BookList";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <nav className="bg-red-400 py-3">
          <div className="w-3/5 h-full my-0 mx-auto">
            <h1 className="text-center text-3xl text-gray-700">
              Bookshelf
            </h1>
          </div>
        </nav>
        <div className="w-3/5 h-full my-0 mx-auto">
          <Switch>
            <Route path="/book/new">
              <AddBook />
            </Route>
            <Route path="/book/:bookId">
              <BookDetails />
            </Route>
            <Route path="/">
              <BookList />
            </Route>
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
