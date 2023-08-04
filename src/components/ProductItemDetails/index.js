// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import SimilarProductItem from '../SimilarProductItem'
import Header from '../Header'
import './index.css'

class ProductItemDetails extends Component {
  state = {
    progress: 'IN_PROGRESS',
    itemDetails: {},
    similarProducts: [],
    count: 1,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const token = Cookies.get('jwt_token')
    this.setState({progress: 'LOADING'})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/products/${id}`
    const option = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, option)
    if (response.ok === true) {
      const data = await response.json()
      const filterData = data.similar_products.map(each =>
        this.returnFilteredItem(each),
      )
      const itemData = this.returnFilteredItem(data)
      this.setState({
        itemDetails: itemData,
        similarProducts: filterData,
        progress: 'DONE',
      })
    } else {
      this.setState({progress: 'FAIL'})
    }
  }

  returnFilteredItem = item => ({
    id: item.id,
    brand: item.brand,
    rating: item.rating,
    price: item.price,
    description: item.description,
    availability: item.availability,
    imageUrl: item.image_url,
    totalReviews: item.total_reviews,
  })

  renderLoader = () => (
    <>
      <Header />
      <div className="primedeals-loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    </>
  )

  renderFailureView = () => (
    <div>
      <Header />
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        width="80%"
      />
      <h1>Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="specific-button">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  renderSuccessView = () => {
    const {itemDetails, similarProducts, count} = this.state
    const {
      title,
      imageUrl,
      price,
      description,
      brand,
      totalReviews,
      rating,
      availability,
    } = itemDetails

    return (
      <>
        <Header />
        <div className="specific-back">
          <div className="specific-details">
            <img className="specific-image" src={imageUrl} alt={title} />
            <div className="specific-card">
              <h1 className="specific-head">{title}</h1>
              <h1 className="specific-amount">Rs {price}/-</h1>
              <div className="specific-rating-card">
                <div className="specific-rating">
                  {rating}
                  <img
                    className="specific-rating-image"
                    src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                    alt="stars"
                  />
                </div>
                <p>{totalReviews}</p>
              </div>
              <p>{description}</p>
              <p>
                <span className="specific-property">Available:</span>{' '}
                {availability}
              </p>
              <p>
                <span className="specific-property">Brand:</span> {brand}
              </p>
              <hr />
              <div className="specific-quantity">
                <button type="button">-</button>
                <h3>{count}</h3>
                <button type="button">+</button>
              </div>
              <button type="button" className="specific-button">
                ADD TO CART
              </button>
            </div>
          </div>
          <h1 className="specific-head">Similar Products</h1>
          <ul className="specific-list-container">
            {similarProducts.map(each => (
              <SimilarProductItem details={each} key={each.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  render() {
    const {progress} = this.state
    switch (progress) {
      case 'LOADING':
        return this.renderLoader()
      case 'DONE':
        return this.renderSuccessView()
      case 'FAIL':
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default ProductItemDetails
