import { Provider } from 'react-redux';
import store from './redux/store';

import AppComponent from './components/AppComponent';

function App() {


  return (
    <Provider store={store}>
      <AppComponent />
    </Provider>
  );
}

export default App;
