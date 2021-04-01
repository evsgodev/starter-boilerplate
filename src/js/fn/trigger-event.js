const triggerEvent = (typeEvent, elem) => {
    let event;

    if (typeEvent === 'click') {
        event = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });
    }

    const canceled = !elem.dispatchEvent(event);
};
