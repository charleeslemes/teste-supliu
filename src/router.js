import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CriarAlbum from './pages/CriarAlbum';

const Routes = ()=>{
    return(
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/musicas' component={CriarAlbum}/>
            </Switch>
        </BrowserRouter>
    )
}


export default Routes;