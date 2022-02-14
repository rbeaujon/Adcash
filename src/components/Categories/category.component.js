import { PureComponent } from 'react';
import  './category.style.scss';

export class Category extends PureComponent {
    // static propTypes = {
    //     visibility: PropTypes.bool.isRequired,
    //     name: PropTypes.string.isRequired
    // };
    // static defaultProps = {
    //     visibility: false,
    //     name: ''
    // };

    render() {

       
        return (
           <div>
                <div class="col-10">
                   { this.props.renderSelection }
               </div> 
           </div>
       )
   }

}
export default Category;