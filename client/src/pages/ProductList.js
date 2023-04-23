import { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Title, QuantityBtn } from '../components';
import { useProductList } from '../contexts';
import styles from './ProductList.module.css';

export function ProductList() {
    const {productList, setProductList} = useProductList();
    
    useEffect(() => {
        (async () => {
            if (productList.length <= 0) {
                let response = await fetch("http://localhost:3001/api/products")
                let data = await response.json();
                setProductList(data);
            }
        })()
    }, []);

    return (
        <>
            <Title title="React Fruit Shop" />
            
            <div className="container">
            {
                productList.map(product => (  
                    <Fragment key={product.id}>
                        <div className={styles.containerItem}>
                            <Link to={'/product/' + product.id}>
                                <img src={process.env.PUBLIC_URL + '/images/' + product.image} alt={product.name}/>
                            </Link>
                            <br />

                            <div className="productName">
                                {product.name}  -  ${product.price}
                            </div>

                            <QuantityBtn productInfo={product} />
                        </div>
                    </Fragment>
                ))
            }
            </div>
        </>
    );
}
