import AllClassrooms from './Component/AllClassrooms';
import AddClassroom from './Component/AddClassroom';
import EditClassroom from './Component/EditClassroom';
import NavBar from './Component/NavBar';
import NotFound from './Component/NotFound'; 

import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/all" component={AllClassrooms} />
        <Route exact path="/add" component={AddClassroom} />
        <Route exact path="/edit/:id" component={EditClassroom} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
