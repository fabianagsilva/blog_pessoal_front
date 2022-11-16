import { Button } from "@material-ui/core";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import UsuarioLogin from "../../models/UsuarioLogin";
import { login } from "../../service/Service";
import { addToken } from "../../store/tokens/actions";
import "./Login.css";

function Login() {

    let history = useNavigate();

    const dispatch = useDispatch();

    const [token, setToken] = useState('token');

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {
            id: 0,
            nome: '',
            usuario: '',
            foto: '',
            senha: '',
            token: ''
        }
    )

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (token !== '') {
            dispatch(addToken(token));
            history('/home');
        }
    }, [token]);

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await login(`/usuarios/logar`, usuarioLogin, setToken)
        } catch (error) {
            alert('Usuário não encontrado. Tente novamente!');
        }
    }

    return (
        <>
            <Grid container alignItems='center'>
                <Grid item xs={6} className='fundoLogin'></Grid>
                <Grid item xs={6}>
                    <Box padding={20}>
                        <form onSubmit={onSubmit}>
                            <Typography variant="h3" gutterBottom color='textPrimary' component='h3' align='center' className="textos">Login</Typography>
                            <TextField value={usuarioLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="usuario" variant="outlined" label='Usuário (e-mail)' name='usuario' fullWidth margin="normal" />
                            <TextField value={usuarioLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="senha" variant="outlined" label='Senha' name='senha' type='password' fullWidth margin="normal" />
                            <Box marginBottom={2} textAlign='center'>
                                <Button type="submit" variant="contained" className="logar">Logar</Button>
                            </Box>
                        </form>
                        <Box display='flex' justifyContent='center' marginTop={2}>
                            <Box marginRight={1}>
                                <Typography variant="subtitle1" gutterBottom align="center">Ainda não tem uma conta?</Typography>
                            </Box>
                            <Link to='/cadastrousuario' className="cad-link">
                                <Typography variant="subtitle1" gutterBottom align="center" className="textos">Cadastre-se</Typography>
                            </Link>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default Login;