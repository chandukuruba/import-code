// Write your code here

const SimilarProductItem = props => {
  const {details} = props
  const {title, brand, price, imageUrl, rating} = details

  return (
    <li className="specific-list">
      <img className="specific-similar-image" src={imageUrl} alt={title} />
      <h1>{title}</h1>
      <p>by {brand}</p>
      <div className="specific-amount-card">
        <h3 className="specific-amount">Rs {price}/-</h3>
        <div className="specific-rating">
          {rating}
          <img
            className="specific-rating-image"
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="stars"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
