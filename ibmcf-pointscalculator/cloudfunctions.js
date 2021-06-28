/**
  *
  * main() will be run when you invoke this action
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */
function main(params) {
        let customerStatus = params.customerstatus
        let orderTotal = params.ordertotal
        let points = 0;

        switch (customerStatus) {
            case "gold":
                points = orderTotal * 10;
                break;
            case "silver":
                points = orderTotal * 5;
                break;
            case "bronze":
                points = orderTotal * 3;
                break;
            default:
                points = orderTotal;
                break;
        }
        
        return {"rewardpoints": points}
}
