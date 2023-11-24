import { ListProduct } from '../productsComponents/ListProduct';
import { UltimoProduct } from '../productsComponents/UltimoProduct';
import { TotalCategory } from '../productsComponents/TotalCategory';
import { Navbar } from '../navbar/Navbar';

export function Products(){
    return (
        <>
        <Navbar/>
        <div className='card-lastP'>
            <UltimoProduct/>
            <div className='content-cards'>
                <TotalCategory/>
            </div>
        </div>
            <ListProduct/>
        </>
    )
}