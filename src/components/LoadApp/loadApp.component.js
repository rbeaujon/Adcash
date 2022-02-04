import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import  './loadApp.style.scss';

/** @namespace  Adcash/Component/LoadApp/Component/loadApp */
export class LoadApp extends PureComponent {
    static propTypes = {
        data: PropTypes.array.isRequired
    }
   static defaultProps = {};

    renderNode() {
       
        let { posts, categories, showCheckbox } = this.props;
   
          return (
              posts.map((key) => (  
                    <div className="post">
                    <div className='specifications'>
                        API: Node
                    <input type="checkbox" id={ key.id } className={ showCheckbox } onClick={ () => this.props.onclick(key.id, 'node') }  />
                    </div>   
                    <div className='items'>   

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
                  </div>
              )
          ))
      }
    
    renderPHP() {
       
        let { aistica_categories, aistica_posts, showCheckbox } = this.props;
   
          return (
                    aistica_posts.map((key) => (  
                    <div className="post">
                    <div className='specifications'> 
                        API Aistica
                    <input type="checkbox" id={ key.id } className={ showCheckbox } onClick={ () => this.props.onclick(key.id, 'aistica') }  />
                    </div>                        
                    <div className='items'>   
                    ID:{ key.id } <br/>
                    info:{ key.info } <br/> 
                    category:{ 
                   
                    aistica_categories.map((cat) => {
                         if (key.category === cat.id) {
                             return cat.name
                         }
                     })
                    
                     } 
                     </div> 
                  </div>
              )
          ))
      }
      
    render() {
        return (
            <div className='post_container'>
                { this.renderPHP() }
                { this.renderNode() }
            </div>
        
        )
      }      

}
export default LoadApp;