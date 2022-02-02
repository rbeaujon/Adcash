import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import  './loadApp.style.scss';

/** @namespace  Adcash/Component/LoadApp/Component/loadApp */
export class LoadApp extends PureComponent {
    static propTypes = {
        data: PropTypes.array.isRequired
    }
   static defaultProps = {};

    render() {
       
        let { posts, categories, showCheckbox } = this.props;
   
          return (
              posts.map((key) => (  
                    <div className="post">
                    <input type="checkbox" id={ key.id } className={ showCheckbox } onClick={ () => this.props.onclick(key.id) }  /> 
                    ID:{ key.id } <br/>
                    info:{ key.info } <br/> 
                    category:{ 
                    
                     categories.map((cat) => {
                         if (key.category === cat.id) {
                             return cat.name
                         }
                     })
                    
                     } <br/>
                  </div>
              )
          ))
      }

}
export default LoadApp;