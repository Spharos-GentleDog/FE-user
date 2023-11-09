namespace NodeJS {
    interface ProcessEnv extends NodeJS.ProcessEnv {
        NAVER_CLIENT_ID: string;
        NAVER_CLIENT_SECRET: string;
        GOOGLE_CLIENT_ID: string;
        GOOGLE_CLIENT_SECRET: string;
        KAKAO_CLIENT_ID: string;
        KAKAO_CLIENT_SECRET: string;
        BASE_API_URL: string;
    }
}