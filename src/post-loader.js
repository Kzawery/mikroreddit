var names = ['Matt Maribojoc', 'Lebron James', 'Bill Gates', 'Childish Gambino'] // used to generate posts for this tutorial
var images = ['https://learnvue.co/wp-content/uploads/2020/08/20200831-10PostScreenshot-1024x465.png?ezimgfmt=rs:598x272/rscb6/ng:webp/ngcb6', '']
var videos = ['https://www.youtube.com/embed/tgbNymZ7vqY', '', '', 'https://www.youtube.com/embed/juocv4AtrHo']
var contents = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.']
var titles = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.']


const getPosts = (number) => {
	// generate a number of posts
	// in a real setting, this would be a database call or algorithm

	let ret = []

	for (var i = 0; i < number; i++) {
		ret.push({
			title: titles[i % titles.length],
			user: names[i % names.length],
			content: contents[i % contents.length],
			imagepath: images[i % images.length],
			videourl: videos[i % videos.length],
			votes: 13,
			subname: 'subname',
		},)
	}	

	return ret
}

export default getPosts;