import jwt from 'jsonwebtoken';

export const generateJWT = (IdUsuario: number): string => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error('JWT_SECRET no está definido en las variables de entorno');
    }

    const token = jwt.sign({ IdUsuario }, secret as string, {
        expiresIn: '30d'
    });

    return token;
}
