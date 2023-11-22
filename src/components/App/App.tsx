import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {Home} from '../../Pages/Home'
import {Layout} from '../Layout/Layout'
import {NotFound} from '../NotFound/NotFound'

function App() {
  return (
    <Router>
    <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
    </Layout>
</Router>
  );
}

export default App
