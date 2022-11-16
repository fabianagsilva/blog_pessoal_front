import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Usuario from "../../models/Usuario";
import { cadastroUsuario } from "../../service/Service";
import "./CadastroUsuario.css";

function CadastroUsuario() {

  let history = useNavigate();

  const [confirmarSenha, setConfirmarSenha] = useState<String>("");

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
  });

  const [usuarioResult, setUsuarioResult] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
  });

  useEffect(() => {
    if (usuarioResult.id != 0) {
      history("/login");
    }
  }, [usuarioResult]);

  function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  function updateModel(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }
  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(usuario)
    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      try {
        await cadastroUsuario('/usuarios/cadastrar', usuario, setUsuarioResult);
        alert('Usuário cadastrado com sucesso');
      } catch (error) {
        alert('Falha no servidor');
      }
    } else {
      alert('As senhas não conferem. Verificar novamente');

      setUsuario({ ...usuario, senha: '' });
      setConfirmarSenha('')
    }
  }

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={6} className="imagem2"></Grid>
      <Grid item xs={6} alignItems="center">
        <Box paddingX={10}>
          <form onSubmit={onSubmit}>
            <Typography
              variant="h4"
              gutterBottom
              color="textPrimary"
              component="h3"
              align="center"
              className="textos2"
            >
              Cadastrar
            </Typography>
            <TextField
              value={usuario.nome}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateModel(event)
              }
              id="nome"
              variant="outlined"
              label="Nome"
              name="nome"
              fullWidth
              margin="normal"
            />
            <TextField
              value={usuario.usuario}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateModel(event)
              }
              id="usuario"
              variant="outlined"
              label="Usuário (e-mail)"
              name="usuario"
              fullWidth
              margin="normal"
            />
            <TextField
              value={usuario.senha}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateModel(event)
              }
              id="senha"
              variant="outlined"
              label="Senha"
              name="senha"
              type="password"
              fullWidth
              margin="normal"
            />
            <TextField
              value={confirmarSenha}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                confirmarSenhaHandle(event)
              }
              id="confirmarSenha"
              variant="outlined"
              label="Confirmar Senha"
              name="confirmarSenha"
              type="password"
              fullWidth
              margin="normal"
            />
            <Box marginBottom={2} textAlign="center">
              <Link to="/login" className="text-decorator-none">
                <Button
                  variant="contained"
                  color="secondary"
                  className="btnCancelar"
                >
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" variant="contained" color="primary"
                className="btnCadastrar">
                Cadastrar
              </Button>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}

export default CadastroUsuario;
