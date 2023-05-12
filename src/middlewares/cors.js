export default function() {
	return (req,res,next) => {
		res.setHeader("Access-Control-Allow-Origin", "*")//TODO see the assignment
		res.setHeader("Access-Control-Allow-Methods", "OPTIONS,HEAD,GET,POST,PUT,DELETE,PATCH")
		res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Authorization, Authorization")
		res.setHeader("Access-Control-Allow-Credentials", "true")
        
		next();
	}
} 