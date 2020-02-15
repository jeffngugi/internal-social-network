import React,{useEffect} from 'react'
import Image from './Image'
import {getImages} from '../../actions/imageAction';
import {connect} from 'react-redux';

const Images = ({getImages, images}) => {
    useEffect(()=>{
        getImages();
    },[getImages])
    console.log(images.loading)
    return (
        <div className='row imagePage '>
        <div className='col-sm-2 col-lg-2'></div>
        <div className='col-sm-8 col-lg-8'>
            <h3 className='border-bottom border-gray pb-2 mb-0'>See memes posted by users</h3>
            <Image />
        </div>
        <div className='col-sm-2 col-lg-2'></div>
            
        </div>
    )
}

const mapStateToProps = (state) =>({
    images:state.images
});

export default connect(mapStateToProps, {getImages})(Images)
