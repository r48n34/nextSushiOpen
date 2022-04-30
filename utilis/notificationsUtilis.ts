function askAndGetPermisstion(){
    return new Promise( (rec, rej) => {

        if (Notification.permission === "granted") {
            rec(true);
        }
    
        Notification.requestPermission( (permission) => {
            if (permission === "granted") {
                new Notification("You have successfully enable the notifications.");
                rec(true)
            }
            else{
                rec(false)
            }
        });
    });

}

async function callNotifications(content: string){

    if (Notification.permission !== "granted") {
        let result = await askAndGetPermisstion();
        if (!result){
            return;
        }
    }

    new Notification(content);

}

export { askAndGetPermisstion, callNotifications }