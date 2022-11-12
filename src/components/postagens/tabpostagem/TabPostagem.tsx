import { AppBar, Tab, Tabs, Typography } from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import ListaPostagem from '../listapostagem/ListaPostagem';
import './TabPostagem.css';

function TabPostagem() {
  const [value, setValue] = useState('1')
  function handleChange(event: React.ChangeEvent<{}>, newValue: string) {
    setValue(newValue);
  }

  return (
    <TabContext value={value}>
      <AppBar position="static">
        <Tabs centered indicatorColor="secondary" onChange={handleChange} style={{ background: '#4b4d47' }}>
          <Tab label="Todas as postagens" value="1" className='tab' />
          <Tab label="Sobre mim" value="2" className='tab' />
        </Tabs>
      </AppBar>
      <TabPanel value="1" >
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          <ListaPostagem />
        </Box>
      </TabPanel>
      <TabPanel value="2">
        <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" className="titulo">
          Sobre mim</Typography>
        <Typography variant="body1" gutterBottom color="textPrimary" align="justify">
        Ainda que seja bastante distinto dos demais alfas, o arquétipo lobo trás confiança, liderança, sociabilidade, harmonia e lealdade.

A maior qualidade do arquétipo do lobo é saber trabalhar em equipe, uma vez que os lobos são animais super sociáveis, e sabem liderar um grupo com grande habilidade. É indicado para áreas profissionais, onde você esteja ocupando uma posição de liderança.

Quem faz uso desse arquétipo também têm aprimoradas suas qualidades maternais, sua intuição, sua estratégia e liberdade, bem como, sua coragem, força e inteligência.</Typography>
      </TabPanel>
    </TabContext>
  );
}
export default TabPostagem;