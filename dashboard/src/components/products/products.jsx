import { ListProduct } from '../productsComponents/ListProduct';
import { TotalProducts } from '../productsComponents/TotalProducts';
import { UltimoProduct } from '../productsComponents/UltimoProduct';
import { TotalCategory } from '../productsComponents/TotalCategory';

export function Products(){
    return (
        <>
        <div className='card-lastP'>
            <UltimoProduct/>
            <div className='content-cards'>
                <TotalCategory/>
                <TotalProducts/>
            </div>
        </div>
            <ListProduct/>
        </>
    )
}