const tagsEl = document.getElementById('tags');
const textareaEl = document.getElementById('textarea');

textareaEl.focus();  //this will automatically focus on text area on load of page

textareaEl.addEventListener('keyup', (e) => {
    createTags(e.target.value);

    //on hit of Enter key, call func that will randomly highlight a single tag
    if(e.key === 'Enter'){
        setTimeout(() => {
            e.target.value = '';
        }, 1500);

        randomSelect();
    }
});

function createTags(input){
    console.log(input);
    const tags = input.split(',')
        .filter(tag => tag.trim() !== '')
        .map(tag => tag.trim());
    console.log(tags);
    tagsEl.innerHTML = '';

    tags.forEach(tag =>  {
        const tagEl = document.createElement('span');
        tagEl.classList.add('tag');
        tagEl.innerText = tag;
        tagsEl.appendChild(tagEl);
    });
}

function randomSelect(){
    console.log('Enter btn pressed')
    const times = 30; 
    const interval = setInterval(()=>{
        const randomTag = pickRandomTag(); 

        highlightTag(randomTag);

        setTimeout(()=>{
            unHighlightTag(randomTag)
        },100);
    }, 100);  //every 100 milli secs

    //this will be called after 30 secs of randomization
    setTimeout(()=>{
        clearInterval(interval);

        setTimeout(() => {
            const randomTag = pickRandomTag();

            highlightTag(randomTag);
        }, 100);
    }, times * 100);

}

function pickRandomTag(){
    const tags = document.querySelectorAll('.tag');
    return tags[Math.floor(Math.random() * tags.length)];
}

function highlightTag(tag){
    tag.classList.add('highlight')
}

function unHighlightTag(tag){
    tag.classList.remove('highlight')
}