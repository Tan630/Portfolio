/**
* This script attempts to create a droplist. This is done in two parts:
*   (1) The hamburger icon changes in shape as the mouse pointer enters it. Clicking it
*     locks the change, and introduces additional cosmetic changes.
*   (2) As the hamburger icon is activated, a droplist enters the viewport. Its entrance
*     is stylised.
*/

let icoArr = Array.from(document.getElementsByClassName('tab-bar__ico'));
let buttonBarArr = Array.from(document.getElementsByClassName('s-button-bar'));




let icoState = {
    toggled: false,
    isToggled: () => this.toggled,
    toggle: function () {this.toggled = (!this.toggled)}
}

function syncIcoRotateOn () {
    icoArr.forEach(function (elem) {
        elem.classList.add('tab-bar__ico--rotated');
    });
}

function syncIcoRotateOff () {
    icoArr.forEach(function (elem) {
        elem.classList.remove('tab-bar__ico--rotated');
    });
}

function syncIcoPressOn () {
    icoArr.forEach(function (elem) {
        elem.classList.add('tab-bar__ico--pressed');
        elem.parentElement.classList.add('ico-container--pressed');
        unCollapseLists();
    });
}

function syncIcoPressOff () {
    icoArr.forEach(function (elem) {
        elem.classList.remove('tab-bar__ico--pressed');
        elem.parentElement.classList.remove('ico-container--pressed');
        collapseLists();
    });
}

/**
* The following lines of code control the droplist.
*/
icoArr.forEach((elem) =>{
    elem.addEventListener('mouseenter', (evnt) => {
        syncIcoRotateOn();
    });
    elem.addEventListener('mouseleave', (evnt) => {
        syncIcoRotateOff();
    });
    
    elem.addEventListener('click', (evnt) => { 
        let classList = evnt.target.classList;
        if (classList.contains('tab-bar__ico--pressed')) {
            syncIcoPressOff ();
        } else {
            syncIcoPressOn ();
        }
    });
});

let vListItemsArr = Array.from(document.getElementsByClassName('v-bar__item'));
let vListArr = Array.from(document.getElementsByClassName('v-bar'));

function isDisplayNone (el) {
    return !el.offsetParent;
}


function getActualHeight (elem) {
    let styles = window.getComputedStyle(elem);
    
    return parseFloat(styles.height)  
    + parseFloat(styles.paddingTop)  
    + parseFloat(styles.paddingBottom)
    + (parseFloat(styles.marginTop)+ parseFloat(styles.marginBottom))/2;
    
}
let vListItemHeightsPX = [];
let vListItemOffsetsPX = [];
document.addEventListener("DOMContentLoaded", ()=>{
    vListArr.forEach((elist) => {
        if (!isDisplayNone(elist)) {
            /* The list whose parent has display:block belongs to the active tab.
            Though it is currently invisible (due to visibility: none), we can use it to estimate
            the offsets of each individual element. */
            
            for (let i = 0; i < elist.children.length; i++) {
                vListItemHeightsPX[i] = getActualHeight(elist.children[i]);
                
                let offset = elist.children[i].offsetTop 
                + elist.children[i].parentElement.offsetTop
                + elist.children[i].parentElement.parentElement.offsetTop;
                vListItemOffsetsPX[i] = offset + vListItemHeightsPX[i];
                
            }
        }
        /* Register item orders */
        for (i = 0; i < elist.children.length; i++) {
            elist.children[i].dataset.itemOrder = i;
        }
        
        vListArr.forEach((list) => {
            for (let i = 0; i < vListItemHeightsPX.length; i++) {
                list.children[i].style.setProperty('top', ' -' + (
                    vListItemOffsetsPX[i] + 5) + 'px');
                }
                list.style.setProperty('visibility', 'visible');
            });
        });
    });
    
    function collapseList (vList) {
        for (let i = 0; i < vListItemHeightsPX.length; i++) {
            vList.children[i].style.setProperty('top'
            , ' -' + (vListItemOffsetsPX[i] + 5) + 'px');
            vList.children[i].style.setProperty('transition', 'top ' + (0.4) + 's');
        }
    }
    
    function unCollapseList (vList) {
        for (let i = 0; i < vListItemHeightsPX.length; i++) {
            vList.children[i].style.setProperty('top', '');
            vList.children[i].style.setProperty('transition', 'top ' + (Number(vList.children[i].dataset.itemOrder)*0.2 + 0.2) + 's')
        }
    }
    
    function collapseLists () {
        vListArr.forEach((list) => {collapseList(list)})
    }
    
    function unCollapseLists () {
        vListArr.forEach((list) => {unCollapseList(list)})
    }
    
    /**
    * The following code is implemented as a proof of concept. 
    *    They dynamically create classes and enter them into the
    *    document stylesheet. As such, changing the style of an
    *    element can be done by adding appropriate classes, instead
    *    of changing inline stylings.
    * This approach turns out to cause inconsistencies in browsers
    *    with stricter security settings. Google Chrome and Edge are
    *    okay, but firefox with all security features turned on does
    *    not seem to preserve those temporary classes.
    * 
    */
    
    /*  
    let style = document.createElement("style");
    document.head.appendChild(style);
    let docStyle = style.sheet;
    function cuClass(i) { // class name for the ith collapsed 
        return 'v-list__item-'+i+'-collapsed';
    }
    
    function ucClass(i) { // class name for the ith un-collapsed class 
        return 'v-list__item-'+i+'-uncollapsed';
    }
    
    docStyle.insertRule('.'+cuClass(i) + ' {' +
    'top: -' + (vListItemOffsetsPX[i] + 5) + 'px;' +
    'transition: ' + 'top 0.4s;'
    );
    
    docStyle.insertRule('.'+ucClass(i) + ' {' +
    'top: 0;' +
    'transition: ' + 'top ' + (i*0.2 + 0.2) + 's;'
    );
    
    // vList.children[i].classList.add(cuClass(i));
    // vList.children[i].classList.remove(ucClass(i));
    */