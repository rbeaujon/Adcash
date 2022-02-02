import LoadAppContainer from  './components/LoadApp/';
import './styles/main.scss'

function App() {
  return (
    <div className = "mainBox">
      <div className = "title">
        MENU
      </div>
      <div className="lineMenu"></div> 
      
        <LoadAppContainer />
     
      <div className="lineFooter"></div> 
      <div className="footer"> 
          <br /> Adcash Test Assignment 
      </div> 
    </div> 
  
  );
}

export default App;
