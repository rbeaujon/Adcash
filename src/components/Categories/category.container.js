import { connect } from 'react-redux';
import { PureComponent } from 'react';
import { updateCustomerSelection } from '../../store/post/post.actions';
import Dropdown from "react-bootstrap/Dropdown";
import { DropdownButton } from 'react-bootstrap';
import Category from './category.component';

export const mapStateToProps = (state) => ({
    id: state.postReducer.id,
    info: state.postReducer.info,
    category: state.postReducer.category,
    actionSelected: state.postReducer.actionSelected,
    checkboxSelected: state.postReducer.checkboxSelected,
    howManyCheckBoxAreSelected: state.postReducer.howManyCheckBoxAreSelected
    
})

export const mapDispatchToProps = (dispatch) => ({
    updateCustomerSelection: (post) => dispatch(updateCustomerSelection(post))
});

/** @namespace  Adcash/Component/Category/Container */
export class CategoryContainer extends PureComponent {
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
            
        if (this.props.actionSelected === 'createCategory') {
            data.preventDefault();
            let id  =  data.target.elements.nextCategoryId.value;
            id = parseInt(id);
            let name =  data.target.elements.name.value;
        
        this.props.category.map((key) => {
                if (key.name === name){
                    return (
                        alert ('The category name already exists'),
                        id=''
                    )
                }
            })

            var newCategory =  {
                "id": id,
                "name": name
            };
    
            fetch('http://localhost:3200/categories', {
                method: 'POST',
                body: JSON.stringify(newCategory),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res => res.json())
            this.props.handleUpdate();
            document.getElementById('name').value = '';
            // this.props.updateCustomerSelection('') // return the page to original windows and show all items saved (API)
        }
        if (this.props.actionSelected === 'updateCategory') {

    
            data.preventDefault();
            let categoryId =  data.target.elements.category.value;
            categoryId =  parseInt(categoryId);
            var categoryName =  data.target.elements.categoryName.value;
           

            var updatePost =  {
                "id": categoryId,
                "name": categoryName
            };
    
            fetch('http://localhost:3200/categories/' + categoryId, {
                method: 'PUT',
                body: JSON.stringify(updatePost),
                headers: { 'Content-Type': 'application/json'}
            })
            .then(res => res.json())
            this.props.handleUpdate();
            document.getElementById('categoryName').value = '';
            // this.props.updateCustomerSelection('') // return the page to original windows and show all items saved (API)
        }   
        if (this.props.actionSelected === 'deleteCategory') {
            
            const deleteCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');
            deleteCheckbox.forEach(element =>  {
                fetch('http://localhost:3200/categories/' + element.value, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
                })
                .then(res => res.json())
                })
        }              
    }

    categorySelected(){

        document.getElementById("categoryName").className = "show";
    }

    renderSelection() {

        const { actionSelected, categories } = this.props; 

        if(categories.length > 0 ){
            var nextCategoryId = categories[categories.length-1].id + 1;
        }else {nextCategoryId = 0;}

        switch (actionSelected) {
            case 'createCategory':
                return (
                    
                        <form onSubmit={this.handleSubmit}>
                            <div className='category'>
                                <div style={{  width:'13vw' }} className="text-justify">
                                Enter the category name
                                </div>
                                <input type ="text" className="mb-3" id="name" name="name"  style={{ height: '3vh', width:'13vw' }} />
                                <input type="hidden" id="nextCategoryId" name="nextCategoryId" value={ nextCategoryId } />
                                <br/>
                                <input type="submit" value="Submit" /><br/><br/>
                                
                                Categories availables<br/>

                                <ul>
                                    { categories.map((key) => (
                                           <li> { key.name } </li> 
                                    ))}
                                </ul>



                            </div>
                        </form>   
                    )  

            case 'updateCategory': 
       
                return (
                    <form onSubmit={this.handleSubmit}>
                        <div className='category'>
                            <div style={{  width:'13vw' }} className="text-justify">
                            Categories availables<br/>
                            Edit them by changing their fields<br/><br/>
                            </div>
                            <select id="category"  onChange={ () => this.categorySelected()}>
                            <option value="">Select one category</option> 
                                { categories.map((key) => (

                                        <option id={key.id} value={key.id}>{key.name}</option>
                                   
                                ))} 
                            </select>
                            <br/>
                            <input type="text" className="hidden" id="categoryName" name="categoryName"></input>
                           <br/> <br/>
                           <input type="submit" value="Update"  />
                        </div>
                    </form>    
            )
            case 'deleteCategory':
                return (
                    <form onSubmit={this.handleSubmit}>
                    <div className='category'>  
                    <div style={{  width:'13vw' }} className="text-justify">
                        Select the items and then press the delete button. <br/><br/>
                    </div>
                    { categories.map((item) => (
                        <div key={item.id}>
                            <input value={item.id} type="checkbox" />{item.name}
                        </div>
                    ))} 
                    <div className='mt-sm-4'>   
                        <input type="submit" value="Delete"  />
                    </div>
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
                        title="Category"
                        alignRight
                        class="btn btn-default dropdown-toggle"
                        onSelect={this.props.updateCustomerSelection}
                    >
                        <Dropdown.Item eventKey="createCategory">Create</Dropdown.Item>
                        <Dropdown.Item eventKey="updateCategory">Edit</Dropdown.Item>                            
                        <Dropdown.Item eventKey="deleteCategory">Delete</Dropdown.Item>
                     </DropdownButton>
                    
                  
                    <Category  
                         renderSelection = { this.renderSelection() }
                    /> 

                </div>    
        )           
    }

}



export default connect(mapStateToProps, mapDispatchToProps)(CategoryContainer);