import './App.css'
import { BrowserRouter as Router , Routes, Route, Link } from 'react-router-dom';
import { Dashboard } from './pages/dashboard';
import { FinancialRecordsProvider } from './contexts/financial-record-context';
import { Auth } from './pages/auth';
import { SignedIn, UserButton } from '@clerk/clerk-react';

function App() {
  return <Router>
    <div className='app-container'>
      <div className='navbar'>
        <Link to="/">
        <SignedIn>
        <UserButton  />
      </SignedIn>
        </Link>
      </div>
      <Routes>
        <Route path='/' element= {
          <FinancialRecordsProvider>
            <Dashboard/>
          </FinancialRecordsProvider>
        } />
        <Route path='/auth' element= {<Auth/>} />
      </Routes>
    </div>
  </Router>
}

export default App
