import { PrismaClient } from "@prisma/client"

const prismaClientSingleton = ()=> {
return new PrismaClient()
}

declare global{
var prismaGlobal : undefined | ReturnType<typeof prismaClientSingleton >

}

const prisma : ReturnType<typeof prismaClientSingleton> = globalThis.prismaGlobal ?? prismaClientSingleton()


if(process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma

prisma.$connect()
   .then(() => {
      console.log('✅ Database connected successfully.')
})
    .catch((err:any )=> {
console.error('❌ Failed to connect to the database:', err)
})

export default prisma
