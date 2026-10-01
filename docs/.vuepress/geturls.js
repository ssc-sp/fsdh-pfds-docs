import { sidebar } from "./config";

const allURLs = [];

function internalOnly(link) {
    if (link[0] == '/') allURLs.push(link);
}

function getURLs(layer) {
    layer.forEach(element => {
        if (typeof element === 'string') {
            internalOnly(element);
        } else if (Object.hasOwn(element, "link")) {
            internalOnly(element.link);
        }
        if (Object.hasOwn(element, "children")) {
            getURLs(element.children);
        }
    });
}
getURLs(sidebar["/en/"]);

export { allURLs };
