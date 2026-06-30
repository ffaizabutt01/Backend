class ApiError extends Error {
    constructor(
        message = "Something went wrong",
         statusCode,
          error=[],
        stack="") {
        super(message);
        this.statusCode = statusCode;
        this.data =null
        this.errors =errors
        this.message = message
        this.sucesss =false;

        if(stack){

            this.stack = this.stack
        }
        else{
            Error.captureStackTrace(this, this.constructor);
        }

        export default ApiError;
    }
}