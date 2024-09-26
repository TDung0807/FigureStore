import React from 'react'
import './CardItem.css'
const CardItem = (props) => {
    let newClassName = `color_bg ${props.alt}`
    let bg_img = `url(${props.img})`
    let { title, image, price, alt } = props
    return (
        <div class="card">
            <img src={image} alt={alt} class="card-img"/>
                <h3 class="card-title">{title}</h3>
                <p class="card-price">{price}</p>
                <div class="card-buttons">
                    <button class="btn-buy">Buy</button>
                    <button class="btn-addtocart">Add to Cart</button>
                </div>
        </div>
    )
}

export default CardItem