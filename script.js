/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
function getResult(){
    let choiceID = '';
    if(selezione.one !== selezione.two &&  selezione.two !== selezione.three  ){
        choiceID=selezione.one
    }else{
        if(selezione.one === selezione.two ){
            choiceID=selezione.one;
        }else{
            if (selezione.two === selezione.three ){
                choiceID=selezione.two;
            }
            else{
                if (selezione.one === selezione.three ){
                    choiceID=selezione.one;
                }                
            }
        }
    }
    
    const section = document.querySelector('#answer');
    const h1 = document.createElement('h1');
    h1.textContent = RESULTS_MAP[choiceID].title;
    section.appendChild(h1);
 
    const p = document.createElement('p');
    p.textContent = RESULTS_MAP[choiceID].contents;
    section.appendChild(p);

    const button = document.createElement('button');
    button.textContent = "Ricomincia il quiz";
    section.appendChild(button);
    button.addEventListener('click', refresh);

    section.classList.remove('hidden');
}

function choice(event){
    const scelta = event.currentTarget;
    
    if(scelta.className === 'overlay'){
        scelta.classList.remove('overlay');
        scelta.classList.add('selected');
        const checkbox = scelta.querySelector('.checkbox');
        checkbox.src="images/checked.png";

        for(let box of selBoxes){
            if(scelta.dataset.questionId === box.dataset.questionId){
                const checkbox = box.querySelector('.checkbox');
                checkbox.src="images/unchecked.png";
                box.classList.remove('selected');
                 
                const index = selBoxes.indexOf(box);
                selBoxes.splice(index,1);
                
                box.addEventListener('click', choice);
                freeBoxes.push(box);
            }
        }
        
    }

    const checkbox = scelta.querySelector('.checkbox');
    checkbox.src="images/checked.png";
    
    scelta.classList.add('selected');
    const index = freeBoxes.indexOf(scelta);
    freeBoxes.splice(index,1);
    selezione[scelta.dataset.questionId]=scelta.dataset.choiceId;
    //metto overlay a tutti i box non scelti di quella specifica domanda
    for(const box of freeBoxes ){
        if(scelta.dataset.questionId === box.dataset.questionId){
            
            box.classList.add('overlay');
        }
    }  
    selBoxes.push(scelta);  
    scelta.removeEventListener('click', choice); 
    if(selBoxes.length ===3 ) {
        getResult();
         
        for(const box of freeBoxes){
            box.removeEventListener('click',choice);
        }
    }
}

function refresh(event){
    const bottone = event.currentTarget;
    const risultato = bottone.parentNode;
    risultato.classList.add('hidden');
    risultato.innerHTML='';
    
    for(const box of freeBoxes){
        box.classList.remove('overlay');
        box.addEventListener('click', choice);
    }
    for(const box of selBoxes){
        box.classList.remove('selected');
        const check = box.querySelector('.checkbox');
        check.src="images/unchecked.png";
        box.addEventListener('click', choice);
        freeBoxes.push(box);        
    }
    selBoxes.splice(0, selBoxes.length);
    
}


const scelta = document.querySelectorAll('section div');

const freeBoxes = [];
const selezione = {};
const selBoxes = [];
for(const box of scelta){
    box.addEventListener('click', choice);
    freeBoxes.push(box);
}

const risultato = document.querySelector('button');
