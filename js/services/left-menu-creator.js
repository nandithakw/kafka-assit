class LeftMenuCreator {


    #createNavLinkElement(link, linkText) {
        //<a class="nav-link" href="details.html">Details</a>
        let ele = document.createElement('a');
        ele.classList.add("nav-link");
        ele.href = link;
        let node = document.createTextNode(linkText);
        ele.appendChild(node);
        return ele;
    }
    createConnectionMenuItems(connectionName) {
        let collapsibleLayoutId = connectionName + "-collapseLayouts";
        let colapsibleLayout = document.createElement("div");
        colapsibleLayout.classList.add("collapse");
        colapsibleLayout.id = collapsibleLayoutId;
        colapsibleLayout.ariaLable
        colapsibleLayout.setAttribute("aria-labelledby", "headingOne");
        colapsibleLayout.setAttribute("data-bs-parent", "#sidenavAccordion");



        // <nav class="sb-sidenav-menu-nested nav">
        let navEle = document.createElement("nav");
        navEle.classList.add("sb-sidenav-menu-nested");
        navEle.classList.add("nav");

        let naveLink = this.#createNavLinkElement("topic.html", "Publish");

        //<a class="nav-link" href="details.html">Details</a>
        navEle.appendChild(naveLink);
        navEle.appendChild(this.#createNavLinkElement("group.html", "Group"));
        colapsibleLayout.appendChild(navEle);
        return colapsibleLayout;



    }

    createConnectionMenuItemHeader(connectionName) {


        let collapsibleLayoutId = connectionName + "-collapseLayouts";


        // <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
        // <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
        // Layouts
        // <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
        // </a>



        var el = document.createElement("a");
        el.href = "#"
        el.classList.add("nav-link");
        el.classList.add("collapsed");
        el.setAttribute("data-bs-toggle", "collapse");
        el.setAttribute("data-bs-target", "#" + collapsibleLayoutId);
        el.setAttribute("aria-expanded", "false");
        el.setAttribute("aria-controls", collapsibleLayoutId);

        var divEle = document.createElement("div");
        divEle.classList.add("sb-nav-link-icon");
        var iEle = document.createElement('i');
        iEle.classList.add("fas");
        iEle.classList.add("fa-tachometer-alt");
        divEle.appendChild(iEle);
        el.appendChild(divEle);
        let node = document.createTextNode(connectionName);
        el.appendChild(node);

        var div2 = document.createElement("div");
        div2.classList.add("sb-sidenav-collapse-arrow");
        let i2 = document.createElement("i");
        i2.classList.add("fas");
        i2.classList.add("fa-angle-down");
        div2.appendChild(i2);
        el.appendChild(div2);



        return el;






    }
}


module.exports = LeftMenuCreator;





// <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
// <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
// Layouts
// <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
// </a>


// <div class="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
// <nav class="sb-sidenav-menu-nested nav">
//     <a class="nav-link" href="details.html">Details</a>
//     <a class="nav-link" href="topic.html">Topic</a>
//     <a class="nav-link" href="layout-sidenav-light.html">Light Sidenav</a>
// </nav>
// </div>
