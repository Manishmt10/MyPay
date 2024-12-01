const z = require("zod");

const signupSchema = z.object({
    username : z.string().email(),
    password : z.string().min(6),
    firstName : z.string().max(30),
    lastName : z.string().optional()
})

const signinSchema = z.object({
    username : z.string().email(),
    password : z.string().min(6)
})

const updateSchema = z.object({
    firstName : z.string().max(30).optional(),
    lastName : z.string().max(30).optional(),
    password : z.string().min(6).optional()
})

module.exports ={
    signinSchema,
    signupSchema,
    updateSchema
}
