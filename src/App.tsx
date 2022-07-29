import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { routes } from './routes';
import { ThemeProvider } from './themeProvider';
// import { fetchCurrentUser } from './store/app/actions';

const getUserConfirmation = (dialogKey: string, callback: any) => {
  // use "message" as Symbol-based key
  // @ts-expect-error check type
  const dialogTrigger = window[Symbol.for(dialogKey)];

  if (dialogTrigger) {
    // pass the callback to delegate
    // to the invoked dialog
    return dialogTrigger(callback);
  }

  // Fallback to allowing navigation
  callback(true);
};

const App = () => {
  // const [currentUser, setCurrentUser] = useState(null);
  // useEffect(() => {
  //   const result = fetchCurrentUser();
  //   setCurrentUser(result.payload);
  // }, []);
  return (
    <ThemeProvider>
      <Router getUserConfirmation={getUserConfirmation}>
        <Switch>
          {routes.map((route) => (
            <Route path={route.path} key={route.path} component={route.component} />
          ))}
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
