import { z } from "zod";

const envVars = z.object({
    DATABASE_TYPE:z.string(),
    DATABASE_HOST:z.string(),
    DATABASE_PORT:z.string(),
    DATABASE_USER:z.string(),
    DATABASE_PASS:z.string(),
    DATABASE_NAME:z.string(),
})
// console.log(process.env)

envVars.parse(process.env);


declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envVars>{}
    }
}

