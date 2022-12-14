import { Button, Container, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import { Box } from "@mui/material";
import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Postagem from '../../../models/Postagem';
import Tema from '../../../models/Tema';
import { busca, buscaId, post, put } from '../../../service/Service';
import { TokenState } from "../../../store/tokens/tokensReducer";
import './CadastroPostagem.css';

function CadastroPostagem() {

    let navigate = useNavigate();

    const { id } = useParams<{ id: string }>();

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );
    
    const [temas, setTemas] = useState<Tema[]>([]);

    useEffect(() => {
        if (token == "") {
            alert("Você precisa estar logado");
            navigate("/login");
        }
    }, [token]);

    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: ''
    })

    const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        titulo: '',
        texto: '',
        tema: null,
        data: ''
    });

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema
        })
    }, [tema])

    useEffect(() => {
        buscaTema()
        if (id !== undefined) {
            findByIdPostagem(id)
        }
    }, [id])

    async function buscaTema() {
        await busca('/temas', setTemas, {
            headers: {
                Authorization: token
            }
        })
    }

    useEffect(() => {
        buscaTema()
    }, [temas.length])

    async function findByIdPostagem(id: string) {
        await buscaId('/postagens/${id}', setPostagem, {
            headers: {
                Authorization: token
            }
        })
    }

    function updatedPostagem(e: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {
            put(`/postagens`, postagem, setPostagem, {
                headers: {
                    Authorization: token
                }
            })
            alert('Postagem atualizada com sucesso');
        } else {
            post(`/postagens`, postagem, setPostagem, {
                headers: {
                    Authorization: token
                }
            })
            alert('Postagem cadastrada com sucesso');
            back()
        }

        function back() {
            navigate('/posts')
        }
    }

    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro postagem</Typography>
                <TextField value={postagem.titulo} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="titulo" label="titulo" variant="outlined" name="titulo" margin="normal" fullWidth />
                <TextField value={postagem.texto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="texto" label="texto" name="texto" variant="outlined" margin="normal" fullWidth />

                <FormControl >
                    <InputLabel id="demo-simple-select-helper-label">Tema </InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(e) => buscaId(`/temas/${e.target.value}`, setTema, {
                            headers: {
                                Authorization: token
                            }
                        })}>
                        {
                            temas.map(tema => (
                                <MenuItem value={tema.id}>{tema.descricao}</MenuItem>
                            ))
                        }
                    </Select>
                    <FormHelperText>Escolha um tema para a postagem</FormHelperText>
                    <Box display="flex" justifyContent="flex-end">
                        <Link to="/posts" className="text-decorator-none">
                            <Box className="btn-cancelar">
                                <Button type="submit" variant="contained" style={{ backgroundColor: "#ff0500", color: "white" }}>
                                    Cancelar
                                </Button>
                            </Box>
                        </Link>

                        <Box className="btn-concluir">
                            <Button type="submit" variant="contained" style={{ backgroundColor: "#61db5c", color: "white" }}>
                                Concluir
                            </Button>
                        </Box>
                    </Box>
                </FormControl>
            </form>
        </Container>
    )
}
export default CadastroPostagem;