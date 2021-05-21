var names = ['Matt Maribojoc', 'Lebron James', 'Bill Gates', 'Childish Gambino'] // used to generate posts for this tutorial
var contents = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.']
var ids = ['1', '2', '3', '4', '5']
var parentids = ['1', '1', '', '', '5']
const getComments = (number) =>{
	let ret = []

	for (var i = 0; i < number; i++) {
		ret.push({
			id: ids[i% ids.length],
			user: names[i % names.length],
			content: contents[i % contents.length],
			parent_comment_id: parentids[i % parentids],
            replies: {}
		},)
	}	

	return ret
}

export default getComments;