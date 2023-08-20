const menu_elements = document.getElementsByClassName("members-navbar-item");
const menu_contexts = document.getElementsByClassName("members-area");

for (let i = 0; i < menu_elements.length; i++) {
    menu_elements[i].addEventListener("click",function(){
        removeAttr();
        menu_elements[i].classList.add("active");
        menu_contexts[i].classList.add("visible");
    })
}

function removeAttr(){
    for(i = 0; i<menu_elements.length; i++){
        menu_elements[i].classList.remove("active");
        menu_contexts[i].classList.remove("visible");
    }    
}