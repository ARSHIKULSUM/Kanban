import Styles from './WorkSpace.module.css'

import DrawerNav from '../../Atoms/Drawer/Drawer';
import Card from '../../Atoms/Card/Card';

export default function WorkSpace(){
    
    return(
        <div className={Styles.outer}>
        <header className={Styles.nav}>
         
        </header>

        <section className={Styles.Main}>
         
          <Card /> 
        
        </section>


        </div>
    )
}