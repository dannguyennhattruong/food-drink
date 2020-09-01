import React, { useContext } from 'react';
import './App.css';
import { Context as ThemeContext } from './store/app/appContext';
import { theme } from './contanst';
import { private__routes } from './routes/config.routes';
import PrivateLayoutRoute from './routes/private.routes';
import { Switch } from 'react-router-dom';

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
          private__routes.map((e, i) => {
            return <PrivateLayoutRoute key={i} path={e.path} component={e.component} exact={e.exact} theme={themes} />
          })
        }
      </Switch>
    </div>
  );
}

export default App;
