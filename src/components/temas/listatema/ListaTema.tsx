import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import './ListaTema.css';
import { Box } from '@mui/material';
import Tema from '../../../models/Tema';
import useLocalStorage from 'react-use-localstorage';
import { busca } from '../../../service/Service';

function ListaTema() {

  //const para armazenar temas do backend
  const [temas, setTemas] = useState<Tema[]>([])

  //const para acessar o token
  const [token, setToken] = useLocalStorage('token');

  let navigate = useNavigate();

  useEffect(()=>{
    if(token == ''){
      alert("Você precisa estar logado")
      navigate("/login")
    }
  }, [token])

  //solicita os temas do backend
  async function buscaTema() {
    await busca('/temas', setTemas, {
      headers: {
        'Authorization': token
      }
    })
  }

  //roda assim que a tela for aberta pelo user
  useEffect(() => {
    buscaTema()
  }, [temas.length])

  return (
    <>
      {/*percorre o array de temas e gera um card para cada tema adicionado*/}
      {temas.map((tema) => (<Box m={2} >
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Tema
            </Typography>
            <Typography variant="h5" component="h2">
              {tema.descricao}
            </Typography>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="center" mb={1.5} >

              <Link to={`/formularioTema/${tema.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" className="marginLeft" size='small' style={{ backgroundColor: "#005eff", color: "white" }}>
                    Atualizar
                  </Button>
                </Box>
              </Link>
              <Link to={`/deletarTema/${tema.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" size='small' style={{ backgroundColor: "#ff0500", color: "white" }}>
                    Deletar
                  </Button>
                </Box>
              </Link>
            </Box>
          </CardActions>
        </Card>
      </Box>
      ))}
    </>
  );
}


export default ListaTema;