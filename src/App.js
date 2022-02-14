import LoadAppContainer from  './components/LoadApp/';
import './styles/main.scss'

function App() {
  return (
    <div>
      <div className = "title col-s-12 col-12 col-b-12">
        MENU
      </div>
      <div className="lineMenu col-s-12 col-12 col-b-12"></div> 
        <LoadAppContainer />
      <div className="footer col-s-12 col-12 col-b-12"> 
          <p>Adcash Test Assignment </p> 
      </div> 
    </div> 
  
  );
}

export default App;
