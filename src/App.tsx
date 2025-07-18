import { memo } from "react";
import Grid from './components/Grid.tsx';
const App = memo(function App() {
  return <div className='app'>
      <h1>Pixelsketch</h1>
      <Grid></Grid>
    </div>;
});
export default App;