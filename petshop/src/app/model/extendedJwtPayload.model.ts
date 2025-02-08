import { JwtPayload } from 'jwt-decode';

interface ExtendedJwtPayload extends JwtPayload {
    roles: string[];
  }