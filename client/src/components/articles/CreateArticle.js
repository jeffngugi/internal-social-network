import React,{useState} from 'react';
import {connect} from 'react-redux';
import {createArticle} from '../../actions/articleAction';
import isEmpty from '../../validation/is-empty';

const CreateArticle = ({createArticle}) => {
    //constants
    const [formData, setformData] = useState({
        title:'',
        article:''
    });

    const {title, article} = formData;


    //methods/functions
    const onChange = e => {
        setformData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = e =>{
        e.preventDefault();
        if(isEmpty(title) || isEmpty(article)){
            //perform some error handling
            console.log('all fields are required');
        }else{
        createArticle(formData);
        }
    }

    return (
        <div>
            <div className='row'>
            <div className='col-sm-2'></div>
            <div className='col-sm-8'>
                <form className='form' onSubmit={e => onSubmit(e)} noValidate>
                <fieldset>
                <legend>Create Article</legend>
                <div className="form-group">
                    <label htmlFor="inputArticle">Article title</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        aria-describedby="emailHelp" 
                        placeholder="Enter email"
                        name='title'
                        value={title}
                        onChange={e => onChange(e)}
                    
                    />
                </div>
            
                <div className="form-group">
                    <label htmlFor="exampleTextarea">Article content</label>
                    <textarea 
                        className="form-control" 
                        rows="3" 
                        name='article'
                        value={article}
                        onChange={e => onChange(e)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                </fieldset>
                </form>
            </div>
             <div className='col-sm-2'></div>
            </div>
          
        </div>
    )
}



export default connect(null, {createArticle})(CreateArticle);
