class Tags {
    constructor () {
        this.listTags = [];
    }
    set add (tag) {
        let regexp = /(\d+ \w+)|(\w+ \d+)|(\w+)/g;
        let tagArr = tag.match(regexp);
        for (let x = 0; x < tagArr.length; x++) {
            if (this.listTags.every(function (item) { return item != tagArr[x]; })) {
                this.listTags.push(tagArr[x]);

                //creating a new tag block
                let tagsBlock = document.querySelector("div.tags");
                let divTag = document.createElement("div");
                divTag.classList.add("tag");
                let span = document.createElement("span");
                span.classList.add("text-tag");
                span.innerHTML = tagArr[x];
                let div = document.createElement("div");
                div.classList.add("delete-tag");
                div.addEventListener("click", this.deleteTag.bind(tags));
                divTag.append(span, div);
                tagsBlock.lastElementChild.before(divTag);

                localStorage.setItem("tagsList", this.listTags);
                console.log("Added a new tag: \"" + tagArr[x] + "\"");
            } else {
                console.log ("A tag \"" + tagArr[x] + "\" is already in the tag list");
                continue;
            }
        }
    }

    get list () {
        return this.listTags;
    }

    deleteTag (tagDelete) {
        let tagBlock = tagDelete.target.parentElement;
        let tag = tagDelete.target.previousElementSibling.textContent;
        let index = this.listTags.indexOf(tag);
        this.listTags.splice(index, 1);
        tagBlock.remove();
        localStorage.setItem("tagsList", this.listTags);
        console.log("A tag \"" + tag + "\" was successfull delete");
    }

    readOnly (e) {
        if (e.target.checked) {
            input.setAttribute("disabled", "true");
            btn.style.cursor = "default";
            btn.removeEventListener("click", btnListener);
            let blocksDelete = document.querySelectorAll("div.delete-tag");
            blocksDelete.forEach(function (item) {
                item.style.cursor = "default";
                item.style.display= "none";
            });
        } else {
            input.removeAttribute("disabled");
            btn.style.cursor = "pointer";
            btn.addEventListener("click", btnListener);
            let blocksDelete = document.querySelectorAll("div.delete-tag");
            blocksDelete.forEach(function (item) {
                item.style.cursor = "pointer";
                item.style.display= "block";
            });
        }
    }
}

let tags = new Tags ();

let input = document.querySelector("input.name-tag");
let checkbox = document.querySelector("input.check");
checkbox.addEventListener("click", tags.readOnly);

function btnListener () {
    if (input.value) {
        tags.add = input.value;
        input.value = "";
    }
}
let btn = document.querySelector("button.btn");
btn.addEventListener("click", btnListener);