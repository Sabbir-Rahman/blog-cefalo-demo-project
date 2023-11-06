import { Request } from 'express';

declare module 'express' {
  interface Request {
    // Add your custom properties and methods here
    user: {
      userId: string;
      name: string;
      role: string[]
    };
    // You can add more custom properties or methods as needed
  }
}