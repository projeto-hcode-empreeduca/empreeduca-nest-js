import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { DataBaseService } from "src/database/database.service";
import { AuthType } from "./auth.type";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private jwtService: JwtService,
        private database: DataBaseService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        // 1 - Selecionar as informações do cabeçalho da requisição
        const request = context.switchToHttp().getRequest();

        // 2 - Selecionar o token de autenticação que está no cabeçalho
        const Authorization = request.headers['authorization'];
        
        if (!Authorization) {
            throw new UnauthorizedException('Autorização não informada.');
        }

        try {

            const token = Authorization.split(' ')[1];

            // 3 - Verificar se esse token está ativo
            this.jwtService.verify(token);

            const data = this.jwtService.decode(token) as AuthType;

            request.auth = data;

            const user = await this.database.user.findUnique({
                where: {
                    id: Number(data.id),
                },
                include: {
                    person: true,
                },
            });

            delete user.password;

            request.user = user;

            if (!user) {
                throw new UnauthorizedException('Usuário não encontrado.');
            }
            
            return true;

        } catch (e) {
            throw new UnauthorizedException(e.message);
        }

    }

}