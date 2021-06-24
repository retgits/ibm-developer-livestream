import as from '@lightbend/akkaserverless-javascript-sdk';
const View = as.View;

const view = new View(
    ['orders.proto', 'domain.proto'],
    'ecommerce.OrderFrontendService',
    {
        viewId: "orders-frontend-view"
    }
);

view.setUpdateHandlers({ 
    ProcessOrderAdded: orderAdded
});

function orderAdded(event, state, context) {
    console.log(`Updating the order history for ${event.userID}`)

    if(state !== undefined && state.orders !== undefined) {
        state.orders.push(event)
    } else {
        state = {
            userID: event.userID,
            orders: new Array(event)
        }
    }

    console.log(JSON.stringify(state))

    return state
}

export default view;