export const serverENV = {
    PORT: process.env.PORT || 4000,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS?.split(",") || [],
    NODE_ENV: process.env.NODE_ENV || 'development',
}

export const jwtENV = {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
}

export const dbENV = {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
}