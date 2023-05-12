export default function(length) {
	let text = "";
	let possible = "123456789";
    
	for( let i = 0; i < length; i++) {
		let sup = Math.floor(Math.random() * 9);
		text +=  i > 0 && sup === i ? "0" : possible.charAt(sup)
	}
    
	return Number(text);
}