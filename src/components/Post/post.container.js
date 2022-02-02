import { connect } from 'react-redux';
import { PureComponent } from 'react';
import { updatePost, updateCustomerSelection } from '../../store/post/post.actions';
import Post from './post.component';
import Dropdown from "react-bootstrap/Dropdown";
import { DropdownButton } from 'react-bootstrap';

export const mapStateToProps = (state) => ({
    id: state.postReducer.id,
    info: state.postReducer.info,
    category: state.postReducer.category,
    actionSelected: state.postReducer.actionSelected,
    checkboxSelected: state.postReducer.checkboxSelected,
    howManyCheckBoxAreSelected: state.postReducer.howManyCheckBoxAreSelected
    
})

export const mapDispatchToProps = (dispatch) => ({
   updatePost: (id, info, category) => dispatch(updatePost(id, info, category)),
   updateCustomerSelection: (post) => dispatch(updateCustomerSelection(post))
});

/** @namespace  Adcash/Component/Post/Container */
export class PostContainer extends PureComponent {
    static propTypes = {
        id: String.isRequired,
        info: String.isRequired,
        category: String.isRequired,
        actionSelected: String.isReq
    }
    
    static defaultProps = {};

    state = {
        actionSelected: '',
        loadApp: ''
    }

    constructor(props) {
        super(props)
        
        this.renderSelection = this.renderSelection.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSelect(post) {
         this.setState({
            actionSelected: post
        });

    }
 
    handleSubmit(data) {
            
        if (this.props.actionSelected === 'create') {
            data.preventDefault();
            let id  =  data.target.elements.nextId.value;
            id = parseInt(id);
            let info =  data.target.elements.info.value;
            let category =  data.target.elements.category.value;
            category =  parseInt(category);

            var newPost =  {
                "id": id,
                "info": info,
                "category": category
            };
    
            fetch('http://localhost:3200/posts', {
                method: 'POST',
                body: JSON.stringify(newPost),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res => res.json())
            this.props.handleUpdate();
            document.getElementById('info').value = '';
            // this.props.updateCustomerSelection('') // return the page to original windows and show all items saved (API)
        }
        if (this.props.actionSelected === 'update') {

            const { checkboxSelected } = this.props;
    
            data.preventDefault();
            let info =  data.target.elements.info.value;
            var category =  data.target.elements.category.value;
            category =  parseInt(category);

            var updatePost =  {
                "id": checkboxSelected[0],
                "info": info,
                "category": category
            };
    
            fetch('http://localhost:3200/posts/' + checkboxSelected[0], {
                method: 'PUT',
                body: JSON.stringify(updatePost),
                headers: { 'Content-Type': 'application/json'}
            })
            .then(res => res.json())
            this.props.handleUpdate();
            document.getElementById('info').value = '';
            // this.props.updateCustomerSelection('') // return the page to original windows and show all items saved (API)
        }   
        if (this.props.actionSelected === 'delete') {
            this.props.checkboxSelected.map((id) => {
                fetch('http://localhost:3200/posts/' + id, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
                })
                .then(res => res.json())
                })
        }              
    }

    renderSelection() {

        const { actionSelected, categories, posts, checkboxSelected } = this.props; 

        if(posts.length > 0 ){
            var nextId = posts[posts.length-1].id + 1;
        }else {nextId = 0;}

        switch (actionSelected) {
            case 'create':
                return (
                    
                        <form onSubmit={this.handleSubmit}>
                            <div>
                            
                                Info 
                                <textarea className="mb-3" id="info" name="info"  style={{ height: '10vh', width:'13vw' }} />
            
                                Category
                                
                                <select className="mb-3" id="category" style={{  width:'13vw' }} >
                                    { categories.map((key) => (
                                        <option value={key.id}>{key.name}</option>
                                    ))}
                                </select>
                                  <input type="hidden" id="nextId" name="nextId" value={ nextId } />

                                <input type="submit" value="Submit" />

                            </div>
                        </form>   
                    )  

            case 'update':
                
            var update = document.getElementById('update');
            
            if(update){ 
       
                    if (checkboxSelected.length === 1 ) {
                        update.className = "show";
                    }
                    if (checkboxSelected.length > 1 || checkboxSelected.length === 0) {
                        update.className = "hidden";
                    }   
                
             } 

                return (
                        <form onSubmit={this.handleSubmit}>
                            <div style={{  width:'13vw' }} className="text-justify">
                                Select one item in the up-right conner and then make click in the button Update.
                            </div>                              
                            <div id="update" className="hidden">
                                Info 
                                <textarea className="mb-3" id="info" name="info" style={{ height: '10vh', width:'13vw' }}/>
            
                                Category
                                <select className="mb-3" id="category" style={{  width:'13vw' }} >
                                    { categories.map((key) => (
                                        <option value={key.id}>{key.name}</option>
                                    ))}
                                </select>

                                <input type="submit" value="Update"  />
                            </div>
                        </form>    
                    )    

            case 'delete':
                return (
                        <form onSubmit={this.handleSubmit}>
                            <div style={{  width:'13vw' }} className="text-justify">
                                Select the items in the up-right conner and then make click in the button Delete.
                            </div>
                            <div className='mt-sm-4'>   
                                <input type="submit" value="Delete"  />
                            </div>
                        </form>    
                    )   
        
            default:
                break;
        }
    }    
    
  
    render() {   
        return (
           
                <div>
                    <DropdownButton
                        title="Post"
                        alignRight
                        class="btn btn-default dropdown-toggle"
                        onSelect={this.props.updateCustomerSelection}
                    >
                        <Dropdown.Item eventKey="create">Create</Dropdown.Item>
                        <Dropdown.Item eventKey="update">Edit</Dropdown.Item>                            
                        <Dropdown.Item eventKey="delete">Delete</Dropdown.Item>
                     </DropdownButton>
                    
                  
                    <Post  
                         renderSelection = { this.renderSelection() }
                    /> 

                </div>    
        )           
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);