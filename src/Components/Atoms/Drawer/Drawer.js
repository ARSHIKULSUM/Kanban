import { Box, Drawer } from "@mui/material"
import { useState } from 'react'
import { IoChevronForwardCircleOutline } from "react-icons/io5";
import Styles from './Drawer.module.css'
import zIndex from "@mui/material/styles/zIndex";

export default function DrawerNav(){

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const[list, setList]= useState("");
    const[task, setTask]= useState([])

    //to add cards

  

    

    return(
        <>
       <section className={Styles.Drawer}>
            <IoChevronForwardCircleOutline className={Styles.DrawerIcon}
            onClick={() => setIsDrawerOpen(true
                )}/>
           <Drawer anchor='left'
                   open={isDrawerOpen}
                   onClose={()=>setIsDrawerOpen(false)} >

           <div style={{width:"23vw"}}>
              <h1>Nav component</h1>
           </div>
           </Drawer>
        </section>
        </>
    )
}