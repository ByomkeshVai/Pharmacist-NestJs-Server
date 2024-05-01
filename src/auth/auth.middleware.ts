import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: () => void) {
    const authHeader = req.headers['authorization'];
    if (
      authHeader &&
      typeof authHeader === 'string' &&
      authHeader.startsWith('Bearer ')
    ) {
      const token = authHeader.substring(7); // Remove 'Bearer ' from token
      try {
        const decoded = this.jwtService.verify(token);
        (req as any).user = decoded; // Set decoded user information to request object
        next();
      } catch (err) {
        throw new HttpException(
          'Invalid or expired token',
          HttpStatus.FORBIDDEN,
        );
      }
    } else {
      res;
      throw new HttpException(
        'Missing or invalid authorization header',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
