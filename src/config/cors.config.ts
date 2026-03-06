import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

// export const corsOptions: CorsOptions = {
//   origin: process.env.FRONTEND_URL
//     ? process.env.FRONTEND_URL.split(',').map((s) => s.trim())
//     : [
//         'http://localhost:3001',
//         'http://localhost:3002',
//         'http://75.119.155.57',
//       ],
//   credentials: true,
// };

export const corsOptions: CorsOptions = {
  origin: '*',
  credentials: true,
};
