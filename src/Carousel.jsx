/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Component } from "react";

class Carousel extends Component {
    state = {
        active: 0
    }

    static defaultProps = {
        images : ["http://pets-images.dev-apis.com/pets/none.jpg"],
    };

    handleIndexClick = (e) => {
        // this refers to component in arrow function
        // because it doesn't create new this
        this.setState({
            active: +e.target.dataset.index
        })
    }

    render() {
        const {active} = this.state;
        const {images} = this.props;

        return (
            <div className="carousel">
                <img src={images[active]} alt="animal hero" />
                <div className="carousel-smaller">
                    {
                        images.map((photo, index) => (
                            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                            <img 
                                key={photo} 
                                onClick={this.handleIndexClick} 
                                data-index={index} 
                                src={photo} 
                                className={index === active ? "active" : ""} 
                                alt="animal thumbnail" />
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default Carousel;