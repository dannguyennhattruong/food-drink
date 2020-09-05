import React, { useContext } from 'react';
import './App.css';
import { Context as ThemeContext } from './store/app/appContext';
import { theme } from './contanst';
import { private__routes, public__routes } from './routes/config.routes';
import PrivateLayoutRoute from './routes/private.routes';
import { Switch, Redirect } from 'react-router-dom';
import { isLogined } from './utils';
import PublicLayoutRoute from './routes/public.routes';


function App() {
  const [themeNow, setThemeNow] = React.useState({
    background: theme[1].background,
    color: theme[1].color
  });
  const [themes, setThemes] = React.useState('light');
  const { state } = useContext(ThemeContext);

  React.useEffect(() => {
    if (state.theme) {
      const currentTheme = theme.find(t => t.id === state.theme);
      setThemeNow({
        background: currentTheme.background,
        color: currentTheme.color
      })
      setThemes(state.theme)
    }
  }, [state.theme])
  return (
    <div className="App" style={themeNow}>
      <Switch>
        {
          !isLogined() && public__routes.map((e, i) => {
            return <PublicLayoutRoute key={i} path={e.path} component={e.component} exact={e.exact} />
          })
        }
        {/* {!isLogined() && <Redirect to='/signin' />} */}

        {
          isLogined() && private__routes.map((e, i) => {
            return <PrivateLayoutRoute key={i} path={e.path} component={e.component} exact={e.exact} theme={themes} />
          })
        }
        {isLogined() ? <Redirect to='/home' /> : <Redirect to='/signin' />}
      </Switch>
    </div>
  );
}

export default App;
