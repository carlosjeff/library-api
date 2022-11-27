export class SwaggerHelper {

    static swaggerDescription(name: string = 'solicitação') {
        return {
            create: 'registro foi criado com sucesso.',
            okGet: `${name} foi buscado com sucesso!`,
            okUpdate: `${name} foi Atualizado com sucesso!`,
            okDelete: `${name} foi Deletado com sucesso!`,
            Unauthorized: 'A solicitação requer autenticação do usuário!',
            Forbidden: 'Nivel de acesso não autorizado!'

        };
    }
}