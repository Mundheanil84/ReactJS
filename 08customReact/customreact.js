function customRender(reactElement, mainContainer) {
    const domElement = document.createElement(reactElement.type);
    domElement.innerHTML = reactElement.Children;

    for (const key in reactElement.props) {
        domElement.setAttribute(key, reactElement.props[key]);
    }

    mainContainer.appendChild(domElement);
}

const reactElement = {
    type: 'a',
    props: {
        href: 'https://google.com',
        target: '_blank'
    },
    Children: 'Click me to visit google'
};

const mainContainer = document.querySelector('#root');
customRender(reactElement, mainContainer);
