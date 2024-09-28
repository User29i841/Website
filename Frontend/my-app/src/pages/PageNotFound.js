import '../styles/Pages/PageNotFound.css'
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div className='pagenotfound-container'>
      <div className="pagenotfound-content">
        <h4>404 - Page Not Found</h4>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <Link to="/">
          <button className="home-button">Take me Home</button>
        </Link>
      </div>
    </div>
  )
}

export default PageNotFound;