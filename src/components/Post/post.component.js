
import { PureComponent } from 'react';
import React from 'react';

export class Post extends PureComponent {


    render() {

       
         return (
            <div>
                <div className='hidden'>
                    <input type="text" id="addCategory" name="addCategory" size={"12"}/>
                </div>
                 <div class="col-sm-10">
                    { this.props.renderSelection }
                </div> 
            </div>
        )
    }

}

export default Post;