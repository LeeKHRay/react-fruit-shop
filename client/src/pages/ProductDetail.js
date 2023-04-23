import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'
import { Title, QuantityBtn } from '../components';
import { useProductList } from '../contexts';

export function ProductDetail() {
    const params = useParams();
    const [product, setProduct] = useState(null);
    const {productList, setProductList} = useProductList()    
    
    useEffect(() => {         
        if (productList.length <= 0) {
            fetch("http://localhost:3001/api/products")
            .then(res => res.json())
            .then(data => setProductList(data))
        }
    }, []);

    useEffect(() => {         
        if (productList.length > 0) {
            setProduct(productList.find(product => product.id === parseInt(params.id)));
        }
    }, [productList]);

    return (
        <>
            {
                product &&
                <div className="productDetail">
                    <Title title={"Product Details for " + product.name} />

                    <table width="100%">
                        <tbody>
                            <tr>
                                <td align="right">
                                    <img src={process.env.PUBLIC_URL + "/images/" + product.image} width="400px" alt={product.name}/>
                                </td>
                                <td width="45%" padding="10">
                                    <p>Name: {product.name}</p>
                                    <p>Price: ${product.price}</p>
                                    <p>Description: {product.description}</p><br />
                                    <QuantityBtn productInfo={product}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
        
            <Link to="/">
                <div className="backToProductListBtn">↩️ Back to product list</div>
            </Link>
        </>
    )
}
