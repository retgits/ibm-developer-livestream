import as from '@lightbend/akkaserverless-javascript-sdk';
import got from 'got';
const ValueEntity = as.ValueEntity;

const entity = new ValueEntity(
    ['orders.proto', 'domain.proto'],
    'ecommerce.OrderBackendService',
    'orders',
    {        
        snapshotEvery: 100,
        includeDirs: ['./'],
        serializeAllowPrimitives: true,
        serializeFallbackToJson: true
    }
);

const pkg = 'ecommerce.persistence.';
const Order = entity.lookupType(pkg + 'Order');

entity.setInitial(userID => Order.create({
    userID: '',
}));

entity.commandHandlers = {
    AddOrder: addOrder,
};

async function addOrder(newOrder, orderHistory, ctx) {
    console.log(`Adding order ${newOrder.orderID} to the history of user ${newOrder.userID}`);

    const {body} = await got.post('http://0.0.0.0:8080', {
        json: {
            customerstatus: newOrder.orderStatus,
            ordertotal: newOrder.ordertotal
        },
        responseType: 'json'
    });

    const no = Order.create({
        userID: newOrder.userID,
        orderID: newOrder.orderID,
        orderPoints: body.data.rewardpoints,
        items: newOrder.items
    });

    ctx.updateState(no)
    return newOrder
}

export default entity;