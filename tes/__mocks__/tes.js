

const connect = () => {
 
console.log("Mock Connect")
}
    
const postWriter = async (newWriter) => {
    console.log("Saving mock Movie");
    return Promise.resolve({
        title: "WAR II",
        actor: "Juan",
    })
};

const findWriter = async (object) => {
    console.log("Find Mock Writer");
return Promise.resolve([{
    title: "WAR II",
    actor: "Juan",
}])
};

const disconnect = () => {
    console.log("Mock Disconnecting");
};
module.exports = {
    connect, findWriter, postWriter, disconnect
};