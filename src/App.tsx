import './App.css'
import NormalWay from './NormalWay';
import ReduxWay from './ReduxWay';

function App() {

  return (
    <>
      <div style={{display:'flex',flexDirection:'column'}}>
        <div>  
            {/* <NormalWay /> */}
        </div>
        <div> 
             <ReduxWay />
        </div>
      </div>
    </>
  )
}

export default App;
