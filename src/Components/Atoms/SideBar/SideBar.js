// // import * as React from 'react';
// // import Box from '@mui/material/Box';
// // import Drawer from '@mui/material/Drawer';
// // import Toolbar from '@mui/material/Toolbar';
// // import List from '@mui/material/List';
// // import ListItem from '@mui/material/ListItem';
// // import ListItemButton from '@mui/material/ListItemButton';
// // import ListItemIcon from '@mui/material/ListItemIcon';
// // import ListItemText from '@mui/material/ListItemText';
// // import ClearIcon from '@mui/icons-material/Clear';
// // import GroupIcon from '@mui/icons-material/Group';
// // import AddIcon from '@mui/icons-material/Add';
// // import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

// // const drawerWidth = 240;

// // export default function SideBar(){
// //     <Box sx={{ display: 'flex' }}>
// //       <Drawer
// //         variant="permanent"
// //         sx={{
// //           width: drawerWidth,
// //           flexShrink: 0,
// //           [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
// //         }}
// //       >
// //         <Toolbar />
// //         <Box sx={{ overflow: 'auto' }}>
// //           <List>
// //             <ListItem disablePadding>
// //               <ListItemButton>
// //                 <ListItemIcon>
// //                   <ClearIcon />
// //                 </ListItemIcon>
// //                 <ListItemText primary="Clear list" />
// //               </ListItemButton>
// //             </ListItem>
// //             <ListItem disablePadding>
// //               <ListItemButton>
// //                 <ListItemIcon>
// //                   <GroupIcon />
// //                 </ListItemIcon>
// //                 <ListItemText primary="Members" />
// //                 <ListItemIcon>
// //                   <AddIcon/>
// //                 </ListItemIcon>
// //               </ListItemButton>
// //             </ListItem>
// //             <ListItem disablePadding>
// //               <ListItemButton>
// //                 <ListItemIcon>
// //                   <ChangeCircleIcon />
// //                 </ListItemIcon>
// //                 <ListItemText primary="Change theme" />
// //               </ListItemButton>
// //             </ListItem>
// //           </List>
// //         </Box>
// //       </Drawer>
// //       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
// //       </Box>
// //     </Box>
// // }

// import React from 'react';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import ClearIcon from '@mui/icons-material/Clear';
// import GroupIcon from '@mui/icons-material/Group';
// import AddIcon from '@mui/icons-material/Add';
// import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
// import zIndex from '@mui/material/styles/zIndex';
// // import styles from './SideBar.module.css';

// const drawerWidth = 240;

// export default function SideBar() {
//   return (
//     // <div className={styles.sidebar}>
//     <Box sx={{ display: 'flex', border:"2px solid red" }}>
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
//           border:"2px solid green"
//         }}
//       >
//         <Toolbar />
//         <Box sx={{ overflow: 'auto', border:"2px solid red", zIndex:"1000" }}>
//           <List>
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   <ClearIcon />
//                 </ListItemIcon>
//                 <ListItemText primary="Clear list" />
//               </ListItemButton>
//             </ListItem>
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   <GroupIcon />
//                 </ListItemIcon>
//                 <ListItemText primary="Members" />
//               </ListItemButton>
//               <ListItemIcon>
//                 <AddIcon />
//               </ListItemIcon>
//             </ListItem>
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   <ChangeCircleIcon />
//                 </ListItemIcon>
//                 <ListItemText primary="Change theme" />
//               </ListItemButton>
//             </ListItem>
//           </List>
//         </Box>
//      </Drawer>
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//       </Box>
//     </Box>
//     // </div>
//   );
// }

import React, {useState} from "react";

function SideBar() {
  const [theme, setTheme] = useState('default');
  const [showThemes, setShowThemes] = useState(false); 

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    setShowThemes(false); 
  };

  const themeImages = {
    theme1: 'https://hygger.io/guides/wp-content/uploads/2021/04/physical-kanban-board.jpg',
    theme2: 'https://talentvis.com/files/images/blog/2022/05/what-you-need-to-know-about-kanban-board.jpg',
    theme3: 'https://static.kanbantool.com/articles/kanban-board-examples-presentation.jpg',
    theme4: 'https://img.freepik.com/free-vector/flat-scrum-task-board-with-color-stick-paper-notes_88138-931.jpg',
    theme5: 'https://media.istockphoto.com/id/1252881184/photo/african-american-woman-writing-kanban-plan.jpg?s=612x612&w=0&k=20&c=Y2FG4W0DQLfiSMljRbXeJkvi269Au-DAJP67MQeuABo=',
  };

  return (
    <div style={{ marginTop: '5rem' }}>
      <SideBar>
        <ul>
          <li>Clear Board</li>
          <li onClick={() => setShowThemes(!showThemes)}>Change Theme</li>
          {showThemes && (
            <ul>
              <li onClick={() => changeTheme('theme1')}>
                <img src={themeImages.theme1} alt="Theme 1" width="40" height="40" />
                <span>Theme 1</span>
              </li>
              <li onClick={() => changeTheme('theme2')}>
                <img src={themeImages.theme2} alt="Theme 2" width="40" height="40" />
                <span>Theme 2</span>
              </li>
              <li onClick={() => changeTheme('theme3')}>
                <img src={themeImages.theme3} alt="Theme 3" width="40" height="40" />
                <span>Theme 3</span>
              </li>
              <li onClick={() => changeTheme('theme4')}>
                <img src={themeImages.theme4} alt="Theme 4" width="40" height="40" />
                <span>Theme 4</span>
              </li>
              <li onClick={() => changeTheme('theme5')}>
                <img src={themeImages.theme5} alt="Theme 5" width="40" height="40" />
                <span>Theme 5</span>
              </li>
            </ul>
          )}
          <li>Members</li>
        </ul>
      </SideBar>
      <h1>This is Manage Tasks.</h1>
      <div>
        {theme === 'theme1' && <img src={themeImages.theme1} alt="Theme 1" />}
        {theme === 'theme2' && <img src={themeImages.theme2} alt="Theme 2" />}
        {theme === 'theme3' && <img src={themeImages.theme3} alt="Theme 3" />}
        {theme === 'theme4' && <img src={themeImages.theme4} alt="Theme 4" />}
        {theme === 'theme5' && <img src={themeImages.theme5} alt="Theme 5" />}
      </div>
    </div>
  );
}

export default SideBar;
