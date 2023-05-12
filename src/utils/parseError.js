export default function(error) {
	//express-validator
	if(Array.isArray(error)) {
		return error.map(e => e.msg).join("\n")//string
	} else if(error.name === "ValidationError") {//mongoose Schema error
		return Object.values(error.errors).map(e => e.message).join("\n")//string
	} else if(error.name === "MongoServerError") {
        
		if( error.code === 11000 ) {
			return "The property field " + Object.values(error.keyValue) + " already exists!"//string
		}
	} else {
		return error.message//string
	}
}



