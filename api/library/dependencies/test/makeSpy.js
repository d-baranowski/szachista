const makespy = (myImplementation = () => {
}) => {
    let callCount = 0;
    let callArgs = [];

    const spy = function () {
        callCount++;
        callArgs.push({...arguments});
        return myImplementation.apply(null, arguments);
    };

    spy.wasCalled = () => callCount > 0;
    spy.callCount = () => callCount;
    spy.callArgs = () => callArgs;

    return spy;
};

module.exports = makespy;
