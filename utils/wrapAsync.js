// handling the error using the wrapAsynce to catch the error

export default (fn)=>{
    return  (req, res, next)=>{
        fn(req, res, next).catch(next);
    }
}