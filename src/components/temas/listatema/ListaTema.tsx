import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Tema from '../../../models/Tema';
import { busca } from '../../../service/Service';
import { TokenState } from '../../../store/tokens/tokensReducer';
import './ListaTema.css';

function ListaTema() {

  const [temas, setTemas] = useState<Tema[]>([])

  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  let navigate = useNavigate();

  useEffect(() => {
    if (token == '') {
      alert("Você precisa estar logado")
      navigate("/login")
    }
  }, [token])

  async function buscaTema() {
    await busca('/temas', setTemas, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {
    buscaTema()
  }, [temas.length])

  return (
    <>
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