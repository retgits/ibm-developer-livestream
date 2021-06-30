import as from '@lightbend/akkaserverless-javascript-sdk';
import got from 'got';
const ValueEntity = as.ValueEntity;
const entity = new ValueEntity(
    ['domain.proto', 'orders.proto'],
    'ecommerce.OrderBackendService',
    'orders',
    {
        serializeFallbackToJson: true
    }
);

const Order = entity.lookupType("ecommerce.persistence.Order");

entity.setInitial(userID => Order.create({
    userID: '',
}));

entity.setCommandHandlers({
    AddOrder: createOrder,
});

async function createOrder(newOrder, orderHistory, context) {
    console.log(`Adding order for ${newOrder.orderID}`);

    const {body} = await got.post(process.env.IBMCE_PROJECT, {
        json: {
            customerstatus: newOrder.customerStatus,
            ordertotal: newOrder.orderTotal
        },
        responseType: 'json'
    });

    console.log(JSON.stringify(body))

    const persistentOrder = Order.create({
        userID: newOrder.userID,
        orderID: newOrder.orderID,
        orderTotal: newOrder.orderTotal,
        customerStatus: newOrder.customerStatus,
        rewardsPoints: body.rewardpoints.toString(),
        items: newOrder.items
    })

    context.updateState(persistentOrder);
    return newOrder;
}

export default entity;