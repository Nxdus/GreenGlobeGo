const Carbon = {
    Car: { value: 150 },
    Van: { value: 200 },
    Motor: { value: 45 },
    Plane: { value: 85 },
    Train: { value: 30 },
    Bike: { value: 0 },
}

export const Calculate = (distance, vehicles) => {
    let amountCarbon = parseInt(distance) * Carbon[vehicles].value;
    let amountTree = (amountCarbon / 9000).toFixed();

    if (amountCarbon > 1000) {
        amountCarbon = (amountCarbon / 1000).toString() + " กิโลกรัม"
    } else {
        amountCarbon = (amountCarbon).toString() + " กรัม"
    }

    let Result = {amountCarbon, amountTree}

    return Result;
}