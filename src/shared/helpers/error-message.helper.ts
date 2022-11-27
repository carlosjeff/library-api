export class ErrorMessageHelper {



    static get validator() {
        return {
            isNotEmpty: 'O campo $property é obrigatório!',
            isString: 'O campo $property precisa ser uma string!',
            isInt: 'O campo $property precisa ser um número Inteiro!',
            minLength: 'O campo $property precisa ter no mínimo $constraint1 caracteres!',
            maxLength: 'O campo $property precisa ter no máximo $constraint1 caracteres!',
            isEmail: 'O $property deve ser um endereço de e-mail valido!',
            min: 'O campo $property precisa ser no mínimo $constraint1!',
            isPassword: `As senhas devem ter no mínimo 8 caracteres, letras maiúsculas, letras minúsculas, números e símbolos.`
        }
    }

    static http(name: string) {
        return {
            internalServerError: (
                type: "GET" | "CREATE" | "UPDATE" | "DELETE",
                labelName: string = name) => {
                switch (type) {
                    case "GET":
                        return {
                            statusCode: 500,
                            message: `Não foi possivel buscar ${labelName}!`,
                        }
                    case "CREATE":
                        return {
                            statusCode: 500,
                            message: `Não foi possivel Criar ${labelName}!`
                        }
                    case "UPDATE":
                        return {
                            statusCode: 500,
                            message: `Não foi possivel atualizar o ${labelName}!`,
                        }
                    case "DELETE":
                        return {
                            statusCode: 500,
                            message: `Não foi possivel Deletar o ${labelName}!`
                        }
                    default:
                        return {
                            statusCode: 500,
                            message: `O servidor encontrou uma condição 
                                    inesperada que o impediu de atender à solicitação`,
                        }
                }
            },
            notFound: {
                statusCode: 404,
                message: `Não foi encontardo nenhum ${name}!`
            },
            Unauthorized: {
                statusCode: 401,
                message: `Seu email ou senha esta incorretos!`
            }
        }
    }
}