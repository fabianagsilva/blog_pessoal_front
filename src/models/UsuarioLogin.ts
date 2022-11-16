interface UsuarioLogin {
    id: number
    nome: string
    usuario: string
    foto: string
    senha: string
    token?: string | null
}

export default UsuarioLogin;