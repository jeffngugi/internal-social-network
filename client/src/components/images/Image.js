import React from 'react'

const Image = ({img}) => {
    const {created_on,gif_url, title, author_id} = img;
    
    return (
        <div className='gif'>
            {title}<br />
            <img
                src={gif_url}
                alt={title}
                width="350px"
            />
           <p>
           <span>Created on {created_on}</span> </p>
        </div>
    )
}

export default Image
