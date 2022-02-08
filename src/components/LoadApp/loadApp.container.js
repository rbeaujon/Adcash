
import { connect } from 'react-redux';
import { PureComponent } from 'react';
import { updatePost, checkboxSelected } from '../../store/post/post.actions';
import LoadApp from './loadApp.component';
import Post from  '../Post/';
import Category from  '../Categories/';
import '../../styles/main.scss'
import { findByPlaceholderText } from '@testing-library/react';

/** @namespace  Adcash/Component/LoadApp/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    id: state.postReducer.id,
    info: state.postReducer.info,
    category: state.postReducer.category,
    checkboxSelected: state.postReducer.checkboxSelected,
    howManyCheckBoxAreSelected: state.postReducer.howManyCheckBoxAreSelected,
    actionSelected: state.postReducer.actionSelected
})
/** @namespace  Adcash/Component/LoadApp/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
   // updatePost: (id, info, category) => dispatch(updatePost(id, info, category)),
    checkboxSelected: (id, location) => dispatch(checkboxSelected(id, location))
});

/** @namespace  Adcash/Component/LoadApp/Container/LoadAppContaiiner */
export class LoadAppContainer extends PureComponent {
    static propTypes = {}
    
    static defaultProps = {};

    state = {
        posts: [],
        categories: [],
        aistica_posts:[],
        aistica_categories:[],
        update: 0,
        showCheckbox:''

    }

    constructor(props) {
        super(props)
        
        this.handleUpdate = this.handleUpdate.bind(this);
    }    


    async componentDidMount() {
        this.getData();
    }  

    async getData() {
        fetch('http://localhost:3200/posts')
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                posts: json,
                DataisLoaded: true
            });
        })
        fetch('http://localhost:3200/categories')
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                ...this.state,
                categories: json
            });
        })
        fetch('http://localhost/Adcash/server/api/posts/')
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                ...this.state,
                aistica_posts: json
            });
        })
        fetch('http://localhost/Adcash/server/api/categories/')
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                ...this.state,
                aistica_categories: json
            });
        })

    }

    handleUpdate() {
        this.getData();
    }  

    render() {
        const { actionSelected } = this.props;
        if(actionSelected === "update" || actionSelected === "delete"){ 
            this.setState({
                showCheckbox: 'show checkmark'
            });
        }else { 
            this.setState({
                showCheckbox: 'hidden'
            });
        }   
    
        return (
            <div>
                <div className = "containerInfo" >
                    <LoadApp
                    onclick = { this.props.checkboxSelected }
                    { ...this.state }
                    { ...this.props }
                    />
                </div>
                <div className = "containerMenuLeft" >
                    <Post 
                     { ...this.state }
                     handleUpdate = { this.handleUpdate }
                    
                    />
                    
                    <Category
                    { ...this.state }
                    handleUpdate = { this.handleUpdate }
                    />
                </div> 
            </div>
        )
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(LoadAppContainer);