import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ListingDetailsPage from './pages/ListingDetailsPage';
import CreateListingPage from './pages/CreateListingPage';
import EditListingPage from './pages/EditListingPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MessagesPage from './pages/MessagesPage';
import FavoritesPage from './pages/FavoritesPage';
import MyListingsPage from './pages/MyListingsPage';
import SearchResultsPage from './pages/SearchResultsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/listing/:id" element={<ListingDetailsPage />} />
              <Route path="/create-listing" element={<CreateListingPage />} />
              <Route path="/edit-listing/:id" element={<EditListingPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/my-listings" element={<MyListingsPage />} />
              <Route path="/search" element={<SearchResultsPage />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="bottom-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;