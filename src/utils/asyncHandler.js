
const asyncHandler = (requestHandler)=>{
   return  (req, res, next) =>{
        Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err))
    }
}







// const asyncHandler =(fn)=> async (req, res, next)=>{

// try {
//     await fn(req,res,next)
// } catch (error) {
//     res.status(err.code||500).json(
//         {
//             success:false,
//             message:err.message}
//     )
// }


// }

// higher order function -> which can accept functions and can return functions 
export {asyncHandler}